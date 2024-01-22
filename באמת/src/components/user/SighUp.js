import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../store/Actions";
import TextField from "@mui/material/TextField"
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
const SighUp = () => {

   const schema = yup.object({
      Username: yup.string().required(" שדה חובה"),
      Password: yup.string().matches(/^[0-9]{4}$/, 'סיסמא חייבת להכיל  4 ספרות').required(" שדה חובה"),
      Name: yup.string().required(" שדה חובה"),
      Phone: yup.string().matches(/^[0-9]{7,10}$/, 'טלפון חייב להכיל בין 7 ל-10 ספרות').required(" שדה חובה"),
      Email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'יש להכניס כתובת מייל תקינה').required(" שדה חובה"),
      Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד').required(" שדה חובה"),
   }).required()
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

   const onSubmit = (data) => {
      console.log(data);

      axios.post("http://localhost:8080/api/user/sighin", {
         Username: data.Username,
         Password: data.Password,
         Name: data.Name,
         Phone: data.Phone,
         Email: data.Email,
         Tz: data.Tz
      })
         .then(x => {
            dispatch({ type: actionType.SET_USER, user: x.data })
            navigate("/homepage")
         })
         .catch(err => {
            Swal.fire({
               title: "אופס...",
               text: err.response.data,
               icon: "error"
            });
         })
   }
   return (
      <div >

         <h1>ברוך הבא!!</h1>
         <h2>טופס הרשמה</h2>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField variant="outlined" label="שם משתמש" {...register("Username")} />
            <p>{errors.Username?.message}</p>

            <TextField variant="outlined" label="סיסמא" type="password"{...register("Password")} />
            <p>{errors.Password?.message}</p>

            <TextField variant="outlined" label="שם"  {...register("Name")} />
            <p>{errors.Name?.message}</p>

            <TextField variant="outlined" label="פלאפון"  {...register("Phone")} />
            <p>{errors.Phone?.message}</p>

            <TextField variant="outlined" label="אימייל" {...register("Email")} />
            <p>{errors.Email?.message}</p>

            <TextField variant="outlined" label="מספר זהות" {...register("Tz")} />
            <p>{errors.Tz?.message}</p>

            <Button variant="contained" type="submit">
               שלח
            </Button>
            <Button variant="contained" type="submit" onClick={() => { navigate("/login") }}>
               התחברות
            </Button>
            
         </Form>

      </div >

   );

}
export default SighUp;