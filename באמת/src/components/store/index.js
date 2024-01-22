import { createStore, combineReducers, applyMiddleware } from 'redux';
import UserReducer from './UserReducer';
import RecipeReducer from './RecipeReducer';
import CategoryReducer from './CategoryReducer';
import ShoppingListReducer from './ShoppingListReducer';

const reducers = combineReducers({
    user: UserReducer,
    recipes: RecipeReducer,
    categories:CategoryReducer,
    shoppingList:ShoppingListReducer
})
const store = createStore(reducers);

export default store;