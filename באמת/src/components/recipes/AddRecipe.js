import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from 'semantic-ui-react'
import axios from 'axios';
import * as actionType from "../store/Actions"
import Header from "../Header";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";


const schema = yup
    .object({
        Name: yup.string().required("יש להקיש שם מתכון"),
        CategoryId: yup.number().required("יש לבחור קטגוריה"),
        Img: yup.string().required("יש להוסיף קישור לתמונה"),
        Duration: yup.number().positive().integer().required("יש להקיש משך זמן בדקות"),
        Difficulty: yup.number().positive().required("יש לבחור רמת קושי"),
        Description: yup.string().required("יש לכתוב תיאור"),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("חסר סוג המוצר"),
                Count: yup.number().positive("חסר כמות"),
                Type: yup.string().required("חסר סוג מוצר"),
            })
        ),
        Instructions: yup.array().of(yup.string().required("יש להכניס הוראות הכנה")),
    })
    .required()


const AddRecipes = () => {
    const recipe = useSelector(state => state.recipes.recipe)
    const user = useSelector(state => state.user.user)
    const categories = useSelector(state => state.categories.categories)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }, control
    } = useForm({
        resolver: yupResolver(schema),
        values: recipe,
    })

    const addNewRecipes = (data) => {
        axios.post("http://localhost:8080/api/recipe", data)
            .then(x => {
                dispatch({ type: actionType.ADD_RECIPE, recipe: x.data })
                Swal.fire({
                    title: "!!!מזל טוב",
                    text: "המתכון התווסף בהצלחה!!!",
                    icon: "success"
                });
                navigate("/homepage")
            })
            .catch(err => Swal.fire({
                title: "אופס...",
                text: err.response.data,
                icon: "error"
            }))
    }
    const editRecipe = (data) => {
        axios.post("http://localhost:8080/api/recipe/edit", data)
            .then(x => {
                dispatch({ type: actionType.EDIT_RECIPE, recipes: x.data });
                Swal.fire({
                    title: "!!!מזל טוב",
                    text: "המתכון עודכן בהצלחה!!!",
                    icon: "success"
                });
                navigate("/recipes")
            })
            .catch(err =>
                Swal.fire({
                    title: "אופס...",
                    text: err.response.data,
                    icon: "error"
                }))
    }
    const onSubmit = (data) => {
        data.UserId = user.Id;
        if (recipe != null && recipe != '') {
            editRecipe(data)
            dispatch({ type: actionType.SET_RECIPE, recipe: '' })
        }
        else {
            addNewRecipes(data)
        }
    }
    const { fields: fieldsIngrident, append: appendIngrident, remove: removeIngrident, } = useFieldArray({
        control,
        name: "Ingrident",
    });
    const { fields: fieldsInstructions, append: appendInstructions, remove: removevInstructions, } = useFieldArray({
        control,
        name: "Instructions",
    });
    return <>
        <Header />
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>יש למלא את הנתונים בהתאמה:</h1>
            <TextField {...register("Name")} placeholder="שם" label="שם" />
            <p>{errors.Name?.message}</p>


            <Box sx={{ minWidth: 150 }}>
                <FormControl fullWidth>
                    <InputLabel id="category">בחר קטגוריה</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        label="category"
                        {...register("CategoryId")}
                    >
                        {categories?.map((c) => (
                            <MenuItem value={c.Id}>{c.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TextField {...register("Img")} label="קישור לתמונה" placeholder="קישור לתמונה" />
            <p>{errors.Img?.message}</p>

            <TextField {...register("Duration")} placeholder="זמן הכנה" label="זמן הכנה" />
            <p>{errors.Duration?.message}</p>


            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="level">בחר רמת קושי</InputLabel>
                    <Select
                        labelId="level"
                        id="level"
                        label="level"
                        {...register("Difficulty")}
                    >
                        <MenuItem value={1}>קל</MenuItem>
                        <MenuItem value={2}>בינוני</MenuItem>
                        <MenuItem value={3}>קשה</MenuItem>

                    </Select>
                </FormControl>
            </Box>

            <br />

            <TextField {...register("Description")} placeholder="תיאור" label="תיאור" />
            <p>{errors.Description?.message}</p>

            {fieldsIngrident.map((field, index) => (
                <>
                    <TextField {...register(`Ingrident.${index}.Name`)} placeholder="שם מוצר" label="שם מוצר" />
                    <TextField {...register(`Ingrident.${index}.Count`)} placeholder="כמות" label="כמות" />
                    <TextField {...register(`Ingrident.${index}.Type`)} placeholder="סוג מוצר" label="סוג מוצר" />
                    <p>{errors.Ingrident?.[index]?.a?.message}</p>
                    <p>{errors.Ingrident?.[index]?.b?.message}</p>
                    <p>{errors.Ingrident?.[index]?.c?.message}</p>

                    <Button size="small" color="primary" onClick={() => removeIngrident(index)}>מחק רכיב</Button>
                    <hr />

                </>
            ))}
            <br />
            <Button size="small" color="primary" onClick={(e) => { e.preventDefault(); appendIngrident({}) }}> הוסף רכיבים</Button>
            <br />
            <br />
            {fieldsInstructions.map((field, index) => (
                <>

                    <TextField {...register(`Instructions.${index}`)} placeholder="הוראת הכנה" label="הוראת הכנה" />
                    <p>{errors.Instructions?.[index]?.a?.message}</p>
                    <Button size="small" color="primary" onClick={() => removevInstructions(index)}> מחק הוראת הכנה</Button>
                    <hr />

                </>
            ))}
            <br />

            <Button size="small" color="primary" onClick={(e) => { e.preventDefault(); appendInstructions(' ') }}> הוסף הוראות הכנה</Button>

            <Button size="small" color="primary" type="submit">
                שלח
            </Button>
        </Form>
    </>
}

export default AddRecipes;