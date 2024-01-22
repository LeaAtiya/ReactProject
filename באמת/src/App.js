import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Route, Routes } from "react-router-dom"
import Login from './components/user/Login';
import Entry from './components/Entry';
import SighUp from './components/user/SighUp';
import HomePage from './components/HomePage';
import Recipes from './components/recipes/Recipes';
import MyRecipes from './components/recipes/MyRecipes';
import AddRecipe from './components/recipes/AddRecipe';
import AddCategory from './components/categories/AddCategory';
import ShoppingList from './components/ShoppingList/ShoppingList';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DisplayRecipe from './components/recipes/displayRecipe';

function App() {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user)
      navigate("/");
  }, [user])

  return <div className="App">
    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SighUp />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/myrecipes' element={<MyRecipes />} />
      <Route path='/addRecipe' element={<AddRecipe />} />
      <Route path='/editRecipe' element={<AddRecipe />} />
      <Route path='/addCategory' element={<AddCategory />} />
      <Route path='/shoppingList' element={<ShoppingList />} />
      <Route path='/displayRecipe' element={<DisplayRecipe />} />
      <Route path='/recipes' element={<Recipes />} />
    </Routes>
  </div>
}

export default App;
