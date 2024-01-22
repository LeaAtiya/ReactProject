import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Recipe from "./Recipe"
import axios from 'axios'


export default function Recipes() {
    // let categories=[];
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();
    const [currentRecipe, setCurrentRecipe] = useState(0);
    const [time, setTime] = useState();
    const [level, setLevel] = useState();

    useEffect(() => {

        axios.get("http://localhost:8080/api/category")
            .then(res => setCategories(res.data))
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {

        axios.get("http://localhost:8080/api/recipe")
            .then(res => setRecipes(res.data))
            .catch(err => {
                console.log(err)
            })
    }, [])


    return <>

        <h1>המתכונים</h1>
        {/* <button onClick={()=>{
           <Recipe/ (...recipes.filter(x=>x.UserId==user))>
        }}>המתכונים שלי</button> */}
        <div class="flex">
            <label for="category">בחר קטגוריה</label>
            <label for="level">בחר רמת קושי</label>
            <label for="time">בחר זמן הכנה</label>
        </div>

        <div class="flex">
            <select id="category" name="category" onChange={(e) => setCurrentCategory(e.target.value)} >
                <option></option>
                {categories?.map((c) => (
                    <option key={c.Id} value={c.Id}>
                        {c.Name}
                    </option>
                ))}
            </select>
            
            <select id="level" name="level" onChange={(e) => setLevel(e.target.value)}>
                <option ></option>
                <option value={1}>קל</option>
                <option value={2}>בינוני</option>
                <option value={3}>קשה</option>
            </select>

            <select id="time" name="time" onChange={(e) => setTime(e.target.value)}>
                <option></option>
                <option value={10}>10 דקות</option>
                <option value={30}>30 דקות</option>
                <option value={50}>50 דקות</option>
                <option value={60}>60 דקות</option>
                <option value={90}>90 דקות</option>
                <option value={120}>120 דקות</option>
                <option value={180}>180 דקות</option>

            </select>
        </div>

        {/* CategoryName={categories[x.CategoryId]} */}

        {recipes.map(x => ((!currentCategory || currentCategory == x.CategoryId)
            && (!time || time >= x.Duration) && (!level || level == x.Difficulty) ?
            <div >
                <Recipe Name={x.Name} Img={x.Img} Description={x.Description} Ingrident={x.Ingrident} Instructions={x.Instructions}
                    CategoryId={x.CategoryId} Duration={x.Duration} Difficulty={x.Difficulty} />
                {console.log(x)}
            </div> : null))}





    </>
}
