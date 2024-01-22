import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../store/Actions";
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const AddCategory = () => {
    const {
        register,
        handleSubmit,
    } = useForm({
    })
    const dispatch = useDispatch();
    const navigate = new useNavigate();

    const onSubmit = (data) => {
        axios.post("http://localhost:8080/api/category", {
            Name: data.category
        })
            .then(x => {
                dispatch({ type: actionType.ADD_CATEGORY, category: x.data });
                Swal.fire({
                    title: "!!!מזל טוב",
                    text: "הקטגוריה התווספה בהצלחה",
                    icon: "success"
                });

            }
            )
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "אופס...",
                    text: err.response.data,
                    icon: "error"
                });


            })

    }
    return <>
        <Header />
        <Form onSubmit={handleSubmit(onSubmit)} className='spaceTop'>
            <TextField variant="outlined" label="הקש שם קטגוריה" {...register("category")} />
            <br />
            <br />
            <Button size="small" color="primary" type="submit">
                שלח
            </Button>
            <br />
            <br />
            <Button size="small" color="primary" type="submit" onClick={() => navigate("/recipes")}>
                חזור
            </Button>
        </Form>
    </>
}
export default AddCategory;