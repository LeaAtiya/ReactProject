import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useEffect } from "react"
import * as actionType from "../store/Actions";
import { Button } from "@mui/material";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import MaximizeIcon from '@mui/icons-material/Maximize';
import Header from "../Header";
import Swal from "sweetalert2";
const ShoppingList = () => {

    const shoppingList = useSelector(state => state.shoppingList.shoppingList);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const deleteItem = (x) => {
        axios.post(`http://localhost:8080/api/bay/delete/${x.Id}`, x.Id).then((res) => {
            console.log(res)
            dispatch({ type: actionType.DELETE_SHOPPINGLIST, id: x.Id })
        })
            .catch(err => {
                console.log(err)
            })
    }
    const editShopping = (x, number) => {
        if (x.Count + number <= 0)
            deleteItem(x)
        else
            axios.post("http://localhost:8080/api/bay", { Name: x.Name, UserId: user.Id, Count: number })
                .then(x => {
                    dispatch({ type: actionType.EDIT_RECIPE, item: x.data })
                })
                .catch(err => console.log(err))
    }

    const orgnaize = (shoppingList) => {

        const consolidatedList = [];
        shoppingList.forEach((item) => {
            const existingItem = consolidatedList.find((i) => i.name === item.name);

            if (existingItem) {
                existingItem.counter += 1;
            } else {
                consolidatedList.push({ Name: item.name, Count: 1 });
            }
        });

        return consolidatedList;
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bay/${user.Id}`).then(x => {
            dispatch({ type: actionType.SET_SHOPPINGLIST, data: x.data })
        }).catch(err => {
            Swal.fire({
                title: "אופס...",
                text: err.response.data,
                icon: "error"
            });
        })

        orgnaize(shoppingList);
    }, [shoppingList]);


    return <>
        <Header />
        <ul>
            <hr />
            {shoppingList.map(x =>
                <li className="flex" >
                    <p>{x.Count}</p>
                    <p>{x.Name}</p>
                    <Button size="small" color="primary" onClick={() => editShopping(x, 1)} ><AddIcon /></Button>
                    <Button size="small" color="primary" onClick={() => editShopping(x, -1)} ><MaximizeIcon /></Button>
                    <Button size="small" color="primary" onClick={() => deleteItem(x)}><RemoveShoppingCartIcon /></Button>
                </li>
            )}
            <hr />
        </ul>

    </>

}
export default ShoppingList;
