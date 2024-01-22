import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Recipe from "./Recipe";
import Header from "../Header";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Recipes = () => {

    const [currentCategory, setCurrentCategory] = useState();

    const [time, setTime] = useState();
    const [level, setLevel] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const categories = useSelector(state => state.categories.categories);
    const rec = useSelector(state => state.recipes.recipes);
    return <>
        <Header />
        <h1>המתכונים</h1>
        <div class="flex">
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="category">בחר קטגוריה</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        label="category"
                        onChange={(e) => setCurrentCategory(e.target.value)}
                    >
                        <MenuItem>כל הקטגוריות</MenuItem>
                        {categories?.map((c) => (
                            <MenuItem value={c.Id}>{c.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <br />
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="level">בחר רמת קושי</InputLabel>
                    <Select
                        labelId="level"
                        id="level"
                        label="level"
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <MenuItem>כל הרמות</MenuItem>
                        <MenuItem value={1}>קל</MenuItem>
                        <MenuItem value={2}>בינוני</MenuItem>
                        <MenuItem value={3}>קשה</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="time">בחר זמן הכנה </InputLabel>
                    <Select
                        labelId="time"
                        id="time"
                        label="time"
                        onChange={(e) => setTime(e.target.value)}
                    >
                        <MenuItem>כל האפשרויות</MenuItem>
                        <MenuItem value={10}>10 דקות</MenuItem>
                        <MenuItem value={30}>30 דקות</MenuItem>
                        <MenuItem value={50}>50 דקות</MenuItem>
                        <MenuItem value={60}>שעה</MenuItem>
                        <MenuItem value={90}>שעה וחצי</MenuItem>
                        <MenuItem value={120}>שעתיים</MenuItem>
                        <MenuItem value={180}>3 שעות</MenuItem>

                    </Select>
                </FormControl>
            </Box>



        </div>
        <div class="grid">
            {rec.map(x => ((!currentCategory || currentCategory == x.CategoryId)
                && (!time || time >= x.Duration) && (!level || level == x.Difficulty) ?

                <div class="ui grid">
                    <Recipe Id={x.Id} UserId={x.UserId} Name={x.Name} Img={x.Img} Description={x.Description} Ingrident={x.Ingrident} Instructions={x.Instructions}
                        CategoryId={x.CategoryId} Duration={x.Duration} Difficulty={x.Difficulty} />
                    {console.log(x)}

                </div>

                : null))}
        </div>




    </>
}
export default Recipes;