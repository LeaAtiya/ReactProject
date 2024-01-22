import * as actionType from './Actions'

const initialState = {
    categories: []
}

export default  function CategoryReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_CATEGORY:
            return { ...state, categories: action.data }

        case actionType.ADD_CATEGORY: {
            const categories = [...state.categories];
            categories.push(action.category);
            return { ...state, categories }
        }
        
        default: {
            return { ...state }
        }
    }
}
