import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
//import { useForm } from "react-hook-form";


// import { useDispatch, useSelector } from 'react-redux';
// import { Link, us/eNavigate } from 'react-router-dom';

export default function Login() {

   const schema = yup.object({
      Username: yup.string().required(" שדה חובה"),
      Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל 4 ספרות').required(" שדה חובה"),
   }).required()
   // const dispatch = useDispatch();
   const navigate = useNavigate()
   //   // const user = useSelector(state => state?.user);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

   // const { register, handleSubmit, formState: { errors } } = useForm({
   //    resolver: yupResolver(schema)
   //   });

   const onSubmit = (data) => {
      console.log(data);

      axios.post("http://localhost:8080/api/user/login", {
         Username: data.Username,
         Password: data.Password
      })
         .then(x => {
            // dispatch({ type: "SET_USER", payload: x.data })
            console.log(x.data);
            navigate(`/homepage`)
         })
         .catch(err => {
            console.log(err);
           alert( err.response.data);
         })
   }
   return <div style={{ wTzth: '60%', position: "absolute", left: "35%" }}>
      <h1>ברוך הבא!!</h1>
      <h2>לגישה לאתר עליך להתחבר לחשבון שלך</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
         <input {...register("Username")} placeholder="שם משתמש" />
         <p>{errors.Username?.message}</p>

         <input {...register("Password")} placeholder="סיסמא" />
         <p>{errors.Password?.message}</p>
        
         <br />
         <br />
         <label>עדיין אין לך חשבון?</label>
         <Link to={'/signup'}> צור עכשיו</Link>
         <br />
         <br />
         <Input  type="submit" />
         <div id="error"></div>
      </Form>
   </div>;
}


