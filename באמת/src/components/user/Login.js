import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import * as actionType from "../store/Actions"
import TextField from "@mui/material/TextField"
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';



const Login=()=> {

   const schema = yup.object({
      Username: yup.string().required(" שדה חובה"),
      Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל 4 ספרות').required(" שדה חובה"),
   }).required()
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector(state => state.user.user);
   const shoppingList = useSelector(state => state.shoppingList.shoppingList);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

   const getShoppingList = () => {
      axios.get(`http://localhost:8080/api/bay/${user.Id}`).then((res) => {
         console.log(res)
         dispatch({ type: actionType.SET_SHOPPINGLIST, data: res.data })
      })
         .catch(err => {
            Swal.fire({
               title: "אופס...",
               text: err.response.data,
               icon: "error"
             })
         })

   }
   const getRecipes = () => {
      axios.get("http://localhost:8080/api/recipe")
         .then((res) => {
            dispatch({ type: actionType.SET_RECIPES, data: res.data })
         })
         .catch(err => {
            console.log(err)
         })

   }
   const getCategories=()=>{
        axios.get("http://localhost:8080/api/category")
            .then((res) => {
                dispatch({ type: actionType.SET_CATEGORY, data: res.data })
            })
            .catch(err => {
                console.log(err)
            })

   }
   const onSubmit = (data) => {
      console.log(data);
      axios.post("http://localhost:8080/api/user/login", {
         Username: data.Username,
         Password: data.Password
      })
         .then(x => {

            dispatch({ type: actionType.SET_USER, user: x.data })
            getShoppingList();
            getRecipes();
            getCategories();
            navigate(`/homepage`)
         })
         .catch(err => {
            console.log(err);
         })
   }
   return <div className='opactityBackground'>
      <h1>ברוך הבא!!</h1>
      <h2>לגישה לאתר עליך להתחבר לחשבון שלך</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

         <TextField variant="outlined" label="שם משתמש" {...register("Username")} />
         <p>{errors.Username?.message}</p>

         <TextField variant="outlined" label="סיסמא" type="password" {...register("Password")} />
         <p>{errors.Password?.message}</p>

         <br />
         <br />
         <label>עדיין אין לך חשבון?</label>
         <Link to={'/signup'}> צור עכשיו</Link>
         <br />
         <br />
         <Button variant="contained" type="submit">
            שלח
         </Button>
         <div id="error"></div>
      </Form>
   </div>;
}
export default Login;


