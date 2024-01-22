import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "../store/Actions";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ModeIcon from '@mui/icons-material/Mode';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Header from "../Header";
import Swal from "sweetalert2";

const DisplayRecipe = () => {
    const recipe = useSelector(state => state.recipes.recipe)
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editRecipe = (recipe) => {
        dispatch({ type: actionType.SET_RECIPE, data: recipe });
        navigate("/editRecipe");
    }

    const addToShoppingList = (x) => {
        const item = {
            Name: x.Name,
            UserId: user.Id,
            Count: 1,
        }
        axios.post("http://localhost:8080/api/bay", item).then(res => {
            dispatch({ type: actionType.ADD_SHOPPINGLIST, item: item });
        }).catch(err => {
            Swal.fire({
                title: "אופס...",
                text: err.response.data,
                icon: "error"
              })
        })
    }
    return <>
        <Header />
        <Card sx={{ maxWidth: 500 }} className="center">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
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

                    <Typography gutterBottom variant="h5" component="div">
                        אופן ההכנה:
                    </Typography>
                    {recipe.Instructions.map(x => <Typography variant="body1" color="text.secondary"> {x}</Typography>
                    )}
                    <Typography gutterBottom variant="h5" component="div">
                        רכיבים:
                    </Typography>
                    {recipe.Ingrident.map(x =>
                        <Typography gutterBottom variant="h5" component="div" className="flex">
                            <Typography variant="body2" color="text.secondary"> {x.Count}</Typography>
                            <Typography variant="body2" color="text.secondary">{x.Type} </Typography>
                            <Typography variant="body2" color="text.secondary"> {x.Name}</Typography>

                            <Button size="small" color="primary" onClick={() => addToShoppingList(x)}>
                            <AddShoppingCartIcon/>
                            </Button>
                        </Typography>
                    )}
                    <Button size="small" color="primary" onClick={x => window.print(x)}><PrintIcon/></Button>

                    {(recipe.UserId == user.Id) ?
                        <>
                            <Button onClick={() => editRecipe(recipe)}><ModeIcon/></Button>
                        </>

                        : null}
                </CardContent>
            </CardActionArea>
        </Card>

    </>
}
export default DisplayRecipe;