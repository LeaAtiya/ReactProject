import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import axios from "axios";
import { useState, useEffect } from "react";
import Header from './Header';

const Recipe = (recipe) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({})
   const onSubmit = (recipe) => {
      console.log("הגעתי לפונ' שליחה")
      console.log(recipe)
      // return <Form>
      //    <h3>{recipe.Description}</h3>
      //    <h4>-------------זמן הכנה: {recipe.Duration} דקות ------------------------ רמת קושי  :{recipe.Difficulty}-------------</h4>
      //    {recipe.Instructions.map(x => <p>{x} ,</p>)}
      //    {recipe.Ingrident.map(x =>
      //       <div class="flex" >
      //          <div > {x.Count} </div>
      //          <div > {x.Type} </div>
      //          <div > {x.Name} </div>
      //          <input type="checkbox" name="buy" />
      //          <br />
      //       </div>
      //    )}
      // </Form>
   }

   return <div class="recipeDesign" {...register("recipe",recipe)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
         <h2 >{recipe.Name}</h2>
         <img src={recipe.Img}></img>
         <br />
         <Button type='submit'>לפרטים לחצו כאן</Button>
      </Form>
   </div>
}
export default Recipe;