import * as types from './actionTypes';
const initialState = {
    userData: {},
    userToken: '',
    userRole: '',
    userProfile: {},
    productData: [],
}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case types.USER_TOKEN:
            return {
                ...state,
                userToken: action.payload
            }
        case types.USER_ROLE:
            return {
                ...state,
                userRole: action.payload
            }
        case types.USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }
        case types.PRODUCT_DATA:
            return {
                ...state,
                productData: [...state.productData, ...action.payload]
            }
        default:
            return state;
    }
}