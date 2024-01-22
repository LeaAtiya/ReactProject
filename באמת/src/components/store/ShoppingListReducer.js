import * as actionType from './Actions'

const initialState = {
    shoppingList: [],
}

export default  function ShoppingListReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_SHOPPINGLIST:
            return { ...state, shoppingList: action.data }

        case actionType.ADD_SHOPPINGLIST: {
            const shoppingList = [...state.shoppingList];
            shoppingList.push(action.item);
            return { ...state, shoppingList }
        }

        case actionType.EDIT_SHOPPINGLIST: {
            const shoppingList = [...state.shoppingList];
            const findIndex = shoppingList.findIndex(x => x.Id == action.item.Id);
            shoppingList[findIndex] = action.item;
            return { ...state, shoppingList }
        }

        case actionType.DELETE_SHOPPINGLIST: {
            const shoppingList = state.shoppingList.filter(r => r.Id != action.id);
            return { ...state, shoppingList }

        }
        
        default: {
            return { ...state }
        }
    }
}
