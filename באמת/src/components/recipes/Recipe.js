import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../store/Actions";
import * as React from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Recipe = (recipe) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(state => state.user.user);
   const deleteRecipe = (data) => {
      Swal.fire({
         title: "מתכון כל כך מוצלח!!! בטוח שתרצו למחוק?",
         showDenyButton: true,
         confirmButtonText: "מחק",
         denyButtonText: "אל תמחק"
      }).then((result) => {
         if (result.isConfirmed) {
            axios.post(`http://localhost:8080/api/recipe/delete/${data.Id}`).then((res) => {
               dispatch({ type: actionType.DELETE_RECIPE, recipes: data })
            })
               .catch(err => {
                  Swal.fire({
                     title: "אופס...",
                     text: err.response.data,
                     icon: "error"
                  })
               })
            Swal.fire("נמחק!", "", "success");
         }
         else  Swal.fire("לא נמחק!", "", "success");
      });
   }
   const display = () => {
      dispatch({ type: actionType.SET_RECIPE, data: recipe })
      navigate("/displayRecipe");
   }
   return <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
         <CardMedia
            component="img"
            height="180"
            image={recipe.Img}
            alt={recipe.Name}
         />
         <CardContent>
            <Typography gutterBottom variant="body2" component="text.secondary">
               זמן הכנה: {recipe.Duration}דקות|
            </Typography>
            <Typography gutterBottom variant="body2" component="text.secondary">
               רמת קושי:{recipe.Difficulty}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
               {recipe.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {recipe.Description}
            </Typography>
         </CardContent>
         <Button size="small" color="primary" onClick={() => { display() }}><RemoveRedEyeIcon /> </Button>
         {(recipe.UserId == user.Id) ?
            <>
               <Button size="small" color="primary" onClick={() => deleteRecipe(recipe)}><DeleteIcon /></Button>
            </>

            : null}
      </CardActionArea>
   </Card>
}
export default Recipe;