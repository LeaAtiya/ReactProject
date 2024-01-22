import * as actionType from './Actions'

const initialState = {
    recipes: [],
    recipe: null
}

export default function RecipeReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_RECIPE:
            return {...state, recipe: action.data}

        case actionType.SET_RECIPES:
            return { ...state, recipes: action.data }

        case actionType.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.recipe);
            return { ...state, recipes }
        }

        case actionType.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id == action.recipes.Id);
            recipes[findIndex] = action.recipes;
            return { ...state, recipes }
        }

        case actionType.DELETE_RECIPE: {
            const recipes = state.recipes.filter(r => r.Id != action.recipes.Id);
            return { ...state, recipes }

        }
        
        default: {
            return { ...state }
        }
    }
}
