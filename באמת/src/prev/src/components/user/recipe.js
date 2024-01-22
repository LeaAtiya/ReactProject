import { useEffect, useState } from "react";
import axios from "axios";
import SingleRecipe from "./singleRecipe";
function Recipe() {

    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState([]);
    const [level, setLevel] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);
    // const [category, setCategory] = useState([]); 

    const [currentRecipes, setCurrentRecipes] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/api/recipe")
            .then(x => {
                setRecipes(x.data)
                
            })

    }, [])
    useEffect(() => {

        axios.get("http://localhost:8080/api/category")
            .then(x => setCategory(x.data))
    }, [])


   
    function selectKategory(event) {
        setCurrentCategory(event.target.value);
    }
   
    function selectLevel(event) {
        setLevel(event.target.value);
    }
   
    return (
        <div>
            <div class="select">
                <div class="s">
                    <select name="category" id="category" onChange={selectKategory}>

                        {category.map(x => <option value={x.Id}>
                            {x.Name}</option>
                        )}
                        <option value="0">הכל</option>
                    </select>
                    <label >בחר קטגוריה</label>
                </div>



                <div class="s">
                    <select name="difficulty" id="difficulty" onChange={selectLevel}>
                        <option value="0">הכל</option>
                        <option value="1">קל</option>
                        <option value="2"> בינוני</option>
                        <option value="3"> קשה</option>
                    </select>
                    <label >:בחר רמה</label>
                </div>

            </div>
            <div class="flexColumn">
                {recipes.map(x => 
                (currentCategory==0||currentCategory==x.CategoryId)
                &&
                (level==0||level==x.Difficulty)?
                <div ><SingleRecipe Name={x.Name} Img={x.Img} Description={x.Description} Ingrident={x.Ingrident} Instructions={x.Instructions}
                    CategoryId={x.CategoryId} /></div>:null)}</div>
        </div>);
}
export default Recipe;