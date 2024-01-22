import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useEffect, useState } from "react";
import * as actionType from "../store/Actions";
import Header from "../Header";
import Recipe from "./Recipe";
import Swal from "sweetalert2";


const MyRecipes = () => {
    const user = useSelector(state => state.user.user);
    const recipes = useSelector(state => state.recipes.recipes)
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:8080/api/recipe")
            .then((res) => {
                dispatch({ type: actionType.SET_RECIPES, data: res.data })
            })
            .catch(err => {
                Swal.fire({
                    title: "אופס...",
                    text: err.response.data,
                    icon: "error"
                  })
            })
    }, [])

    return <>
        <Header />
        <h1>המתכונים שלי</h1>
        <div class="grid">
            {recipes.map(x => ((x.UserId == user.Id) ?

                <div >
                    <Recipe Id={x.Id} UserId={x.UserId} Name={x.Name} Img={x.Img} Description={x.Description} Ingrident={x.Ingrident} Instructions={x.Instructions}
                        CategoryId={x.CategoryId} Duration={x.Duration} Difficulty={x.Difficulty} />
                    {console.log(x)}
                </div>

                : null))}
        </div>
    </>
}
export default MyRecipes;