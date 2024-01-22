import * as actionType from './Actions'

const initialState = {
    user: null
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return { ...state, user: action.user }
            
        default: {
            return { ...state }
        }
    }
}
export default UserReducer;