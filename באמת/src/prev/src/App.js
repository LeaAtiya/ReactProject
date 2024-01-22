import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom"
import Login from './components/user/Login';
import Entry from './components/Entry';
import SighUp from './components/user/SighUp';
import HomePage from './components/HomePage';
import Recipes from './components/Recipes';

function App() {
  return <div className="App">

    <Routes>
      <Route path="/" element={<Entry />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SighUp />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/recipes' element={<Recipes />}>
        {/* <Route path='/myrecipes' element={<Recipes />} /> */}
      </Route>

    </Routes>
    {/* 
        <Route path='/userrecipes' element={<Recipes />} />
        <Route path='/allRecipes' element={<Recipes />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/addRecipe' element={<AddRecipe />} />
        <Route path='/addCategory' element={<Home />} /> */}


  </div>



}

export default App;
