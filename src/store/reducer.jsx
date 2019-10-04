import {ADD_AREAS, ADD_CUISINES, ADD_RESTAURANTS, ADD_SEARCHED_RESTAURANTS, STORE_RESTAURANTS_SEARCH_KEYWORD, UPDATE_RESTAURANTS, SELECT_CUISINE, SEARCH_IN_MENU, ADD_MENU_GROUPS, 
            CLEAR_MENU_GROUP, ADD_PRODUCT_TO_LIST, OPEN_MODAL, CLOSE_MODAL, OPEN_SEARCH_CITY_MODAL, CLOSE_SEARCH_CITY_MODAL,SAVE_RESTAURANT, SAVE_MENU, ADD_TO_CART, TOGGLE_ACTIVE,
            UPDATE_QUANTITY, TOGGLE_RADIO_BUTTON,EMPTY_CART, ADD_INGREDIENTS, EMPTY_INGREDIENT, ADD_INGREDIENTS_CHECKBOX,REMOVE_INGREDIENTS_CHECKBOX,CLEAR_INGREDIENTS_ARRAY,
            ADD_INGREDIENT_ID_EXCEED_LIMIT, REMOVE_INGREDIENT_ID_EXCEED_LIMIT, STORE_ORDER_HISTORY,OPEN_CHECKOUT_MODAL,CLOSE_CHECKOUT_MODAL, ADD_IMAGE, LIST_CUSTOMER_ADDRESS, 
            CHOOSE_USER_ADDRESS,OPEN_ADDRESS_MODAL,CLOSE_ADDRESS_MODAL, TOGGLE_SWITCH, STORE_TEXT_AREA_REQUEST,STORE_USER_LOCATION, DELETE_ADDRESS, ADD_ADDRESS,PLACE_ORDER_STATUS, 
            CLOSE_CUSTOMIZATION_MODAL,STORE_ORDER_ID, STORE_ORDER_STATUS, EMPTY_RESTAURANT_ARRAY, SAVE_RADIO_BTN_GROUP_NAME, ACTIVATE_RED_TICK_MARK, DEACTIVATE_RED_TICK_MARK,
            CLEAR_TICK_MARKS,ACTIVATE_GREEN_TICK_MARK, OPEN_MIN_ORDER_MODAL, CLOSE_MIN_ORDER_MODAL, STORE_APPLIED_PROMOCODE_RESPONSE, CHANGE_PAYMENT_METHOD, UPDATE_USER_PROFILE_SUCCESS,
            UPDATE_USER_PROFILE_FAILED, CLEAR_USER_PROFILE_RESPONSE , STORE_INVALID_PROMOCODE_RESPONSE, RESET_PROMOCODE_INVALID_RESPONSE, OPEN_SIGN_UP_MODAL, CLOSE_SIGN_UP_MODAL, 
            UPDATE_FILTER_STATUS,CLOSE_RESET_PASSWORD_MODAL, OPEN_RESET_PASSWORD_MODAL, OPEN_CONFIRM_Registration_Modal, CLOSE_CONFIRM_Registration_Modal, OPEN_ERROR_MODAL,
            CLOSE_ERROR_MODAL, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_FAIL, CLEAR_SIGNIN_FAIL_ERRORS,LOGOUT_SUCCESS, REGISTER_FAIL,SEARCH_IN_THE_AREA,
            CLEAR_ERRORS, USER_EXIST,PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE, CLEAR_RESET_ERROR_MSGS, CLOSE_CONFIRM_RESET_MODAL, OPEN_CONFIRM_RESET_MODAL} from './actions';


const initState = {
    areas:[],
    cuisines:[],
    restaurantList:[],
    menuGroups:[],
    productsItems:[],
    orderHistory:[],
    searchRestaurant:'',
    searchRestaurantsKeyword:'',
    menuSearchedKeyword:'',
    areaSearchedkeyword:'',
    selectedArea:{},
    selectedRestaurant:{},
    selectedMenu:'',
    selectedCuisine:'',
    itemsChecked:{},
    openModal:false,
    checkoutModal:false,
    userAddressModal:false,
    minOrderModal:false,
    signUpModal:false,
    passwordResetForm:false,
    confirmRegistrationModal:false,
    confirmResetModal:false,
    errorModalOpen:false,
    searchCityModal:false,
    modalProduct:{},
    cart:{},
    isActive:false,
    cartTotalAmount:{},
    selectedRadioBtn:'',
    ingredients:[],
    checkBoxIngredients:[],
    ingredientsIdWithExceededLimit:[],
    radioBtnGroupName:[],
    redTickMark:false,
    greenTickMark:false,
    notSelectedGroupTitleArray:[],
    selectedGroupTitlesArray:[],
    images:[],
    customerAddress:[],
    selectedUserAddress:{},
    toggleSwitch: true,
    orderType:3,
    textAreaOrderRequest:'',
    userGeoLocation:[],
    newCustomerAddress:{},
    placeOrderStatus:false,
    deliveryStatus:'',
    placedOrderId:'',
    finalPlacedOrder:{},
    pagesNo:'',
    promoCodeResObj:{},
    selectedPaymentMethod:'COD',
    invalidPromo:'',
    promoModal:false,

    userRegistrationResponse:'',
    userRegistrationResponseStatus:null,
    userLoginResponse:'',
    userLoginResponseStatus:null,   
    successResetResponse:'',
    successResetResponseStatus:null,
    failureResetResponse:'',
    failureResetResponseStatus:null,
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    user:{},
    updateProfileResponse:{}

}


const reducer = (state=initState, action) => {
    switch(action.type){
        case PLACE_ORDER_STATUS:
            let orderStatus;
            if(action.payload === "No Deliver"){
                orderStatus = !state.placeOrderStatus
            } 
            return{
                ...state,
                placeOrderStatus:orderStatus,
                deliveryStatus:action.payload
            }
        case STORE_ORDER_HISTORY:
            return{
                ...state,
                orderHistory:action.payload
            }
        case CHANGE_PAYMENT_METHOD:
            return{
                ...state,
                selectedPaymentMethod:action.payload
            }
        case STORE_ORDER_STATUS:
            return{
                ...state,
                finalPlacedOrder : action.payload
            }
        case STORE_USER_LOCATION:
            return{
                ...state,
                userGeoLocation:action.payload
            }
        case ADD_AREAS:
            let areasList = [...action.payload];
            return{
                ...state,
                areas:areasList,
            }
        case ADD_CUISINES:
            let cuisineList = [...action.payload];
            return {
                ...state,
                cuisines:cuisineList,
            }
        case EMPTY_RESTAURANT_ARRAY:
            return{
                ...state,
                restaurantList:action.payload
            }
        case ADD_RESTAURANTS:
            return{
                ...state,
                restaurantList:[...state.restaurantList, ...action.payload.restaurants],
                pagesNo:action.payload.pagesNo,
                selectedArea:{
                            emiratesId:action.payload.emiratesId, 
                            areaId:action.payload.areaId,
                            searchCity:action.payload.searchCity,
                            searchArea:action.payload.searchArea 
                            }
            }
        case ADD_SEARCHED_RESTAURANTS:
            return {
                ...state,
                restaurantList:[...state.restaurantList, ...action.payload]
            }
        case STORE_RESTAURANTS_SEARCH_KEYWORD:
            return{
                ...state,
                searchRestaurantsKeyword:action.payload

            }
        case UPDATE_RESTAURANTS:
            let searchRest = action.payload;
            return {
                ...state,
                searchRestaurant:searchRest
            }
        case SELECT_CUISINE:
            let selectedCuisine = action.payload;
            return {
                ...state,
                selectedCuisine:selectedCuisine
            }
        case SEARCH_IN_MENU:
            return{
                ...state,
                menuSearchedKeyword:action.payload
            }
        case SEARCH_IN_THE_AREA:
            return{
                ...state,
                areaSearchedkeyword:action.payload
            }
        case ADD_MENU_GROUPS:
            let menuGroups = [...action.payload];
            return{
                ...state,
                menuGroups:menuGroups
            }
        case CLEAR_MENU_GROUP:
            return{
                ...state,
                menuGroups:[]
            }
        case SAVE_RESTAURANT:
            return{
                ...state,
                selectedRestaurant:action.payload
            }
        case SAVE_MENU:
            return{
                ...state,
                selectedMenu:action.payload
            }
        case ADD_PRODUCT_TO_LIST:
        let productsItems = [...action.payload];
        return{
            ...state,
            productsItems:productsItems
        }
        case OPEN_MODAL:
            const item = !state.openModal;
            let modalItem = {};
            for(let i = 0; i < state.menuGroups.length; i++){
                modalItem = state.menuGroups[i].products.find( element => {
                        return element._id === action.payload
                    })
                if(modalItem) break; 
            }
            return{
                ...state,
                openModal:item, 
                modalProduct:modalItem
            }
        case OPEN_CHECKOUT_MODAL:
                const modal = !state.checkoutModal;
                return {
                    ...state,
                    checkoutModal:modal
                }
        case OPEN_SIGN_UP_MODAL:
                const signUpModal = !state.signUpModal;
                return {
                    ...state,
                    signUpModal:signUpModal
                }
        case OPEN_RESET_PASSWORD_MODAL:
                const resetModal = !state.passwordResetForm;
                return {
                    ...state,
                    passwordResetForm:resetModal
                }
        case OPEN_ADDRESS_MODAL:
                const addressModal = !state.userAddressModal;
                return{
                    ...state,
                    userAddressModal:addressModal
                }
        case OPEN_MIN_ORDER_MODAL:
            const orderModal = !state.minOrderModal;
            return{
                ...state,
                minOrderModal:orderModal
            }
        case OPEN_CONFIRM_Registration_Modal:
            return{
                ...state,
                confirmRegistrationModal: !state.confirmRegistrationModal
            }
        case OPEN_CONFIRM_RESET_MODAL:
            return{
                ...state,
                confirmResetModal: !state.confirmResetModal
            }
        case OPEN_ERROR_MODAL:
            return{
                ...state,
                errorModalOpen: !state.errorModalOpen
            }
        case OPEN_SEARCH_CITY_MODAL:
            const searchCityBoolean = !state.searchCityModal
            return{
                    ...state,
                    searchCityModal:searchCityBoolean
            }
        case CLOSE_MODAL:
                    return {
                    ...state,
                    openModal:action.payload
                }
        case CLOSE_CHECKOUT_MODAL:
                return{
                ...state,
                checkoutModal:action.payload
            }
        case CLOSE_ADDRESS_MODAL:
            return{
                ...state,
                userAddressModal:action.payload
            }
        case CLOSE_CUSTOMIZATION_MODAL:
            return{
                ...state,
                placeOrderStatus:action.payload.status,
                deliveryStatus:action.payload.deliveryStatus
            }
        case CLOSE_MIN_ORDER_MODAL:
            return{
                ...state,
                minOrderModal:action.payload
            }
        case CLOSE_SIGN_UP_MODAL:
            return{
                ...state,
                signUpModal:action.payload
            }
        case CLOSE_RESET_PASSWORD_MODAL:
            return{
                ...state,
                passwordResetForm:action.payload
            }
        case CLOSE_CONFIRM_Registration_Modal:
            return{
                ...state,
                confirmRegistrationModal:action.payload
            }
        case CLOSE_CONFIRM_RESET_MODAL:
            return{
                ...state,
                confirmResetModal: action.payload
                }
        case CLOSE_ERROR_MODAL:
                return{
                    ...state,
                    errorModalOpen: action.payload
                }
        case CLOSE_SEARCH_CITY_MODAL:
            return{
                ...state,
                searchCityModal:action.payload,
                areaSearchedkeyword:''
            }
        case ADD_TO_CART:
            let cartItem = action.payload;
            let cartTotalAmount = {};
            let totalAmount = action.payload.totalAmount;
            let offerAmount = action.payload.offerAmount;
            cartTotalAmount['totalAmount'] = totalAmount;
            cartTotalAmount['offerAmount'] = offerAmount;
            return {
                ...state,
                cart: cartItem,
                cartTotalAmount:cartTotalAmount
            }
        case EMPTY_CART:
            return{
                ...state,
                cart:action.payload,
                itemCountsInCart:0
            }
        case EMPTY_INGREDIENT:
            return{
                ...state,
                ingredients:action.payload
            }
        case TOGGLE_ACTIVE:
            let active = !state.isActive;
            return{
                ...state,
                isActive:active
            }
        case TOGGLE_SWITCH:
            return{
                ...state,
                toggleSwitch:!state.toggleSwitch,
                orderType:action.payload
            }
        case UPDATE_QUANTITY:
            return {
                ...state,
                cartTotalAmount:action.payload

            }
        case TOGGLE_RADIO_BUTTON:
            return {
                ...state,
                selectedRadioBtn: action.payload
            }

        case ADD_INGREDIENTS_CHECKBOX:
            return {
                ...state,
                checkBoxIngredients:[...state.checkBoxIngredients, action.payload]
            }
        case REMOVE_INGREDIENTS_CHECKBOX:
            let updatedCheckBoxArr = state.checkBoxIngredients.filter(elem => elem.items_id !== action.payload.items_id)
            return {
                ...state,
                checkBoxIngredients:updatedCheckBoxArr
            }
        case CLEAR_INGREDIENTS_ARRAY:
            return {
                ...state,
                checkBoxIngredients:[],
                ingredients:[],
                ingredientsIdWithExceededLimit:[]
        
            }
        case ADD_IMAGE:
                return{
                    ...state,
                    images:[...state.images, action.payload]
                }
        case LIST_CUSTOMER_ADDRESS:
                return{
                    ...state,
                    customerAddress:action.payload
                }
        case CHOOSE_USER_ADDRESS:
                return {
                    ...state,
                    selectedUserAddress:action.payload
                }
        case DELETE_ADDRESS:
            return{
                ...state,
                customerAddress: state.customerAddress.filter(item => item._id !== action.payload)
            }
        case ADD_ADDRESS:
            return{
                ...state,
                customerAddress: [...state.customerAddress, action.payload]
            }
        case STORE_TEXT_AREA_REQUEST:
            return{
                ...state,
                textAreaOrderRequest: action.payload
            }
        case STORE_ORDER_ID:
            return{
                ...state,
                placedOrderId:action.payload

            }
        case SAVE_RADIO_BTN_GROUP_NAME:
            return {
                ...state,
                radioBtnGroupName:[...state.radioBtnGroupName, action.payload]
            }
        case ACTIVATE_RED_TICK_MARK:
            return{
                ...state,
                redTickMark:!state.redTickMark,
                notSelectedGroupTitleArray: action.payload
            }
        case DEACTIVATE_RED_TICK_MARK:
            return{
                ...state,
                // redTickMark:action.payload,
                notSelectedGroupTitleArray:state.notSelectedGroupTitleArray.filter(nameTitle => nameTitle !== action.payload)
            }
        case ACTIVATE_GREEN_TICK_MARK:
            return{
                ...state,
                greenTickMark:!state.greenTickMark,
                selectedGroupTitlesArray:[...state.selectedGroupTitlesArray, action.payload]
            }
        case CLEAR_TICK_MARKS:
            return {
                ...state,
                notSelectedGroupTitleArray:[],
                selectedGroupTitlesArray:[],
                radioBtnGroupName:[]
            }
        case ADD_INGREDIENT_ID_EXCEED_LIMIT: 
            return {
                ...state,
                ingredientsIdWithExceededLimit:[...state.ingredientsIdWithExceededLimit, action.payload]
            }
        case REMOVE_INGREDIENT_ID_EXCEED_LIMIT:
            return {
                ...state,
                ingredientsIdWithExceededLimit: state.ingredientsIdWithExceededLimit.filter(item => item !== action.payload)
            }
        case STORE_APPLIED_PROMOCODE_RESPONSE:
            return {
                ...state,
                promoCodeResObj:action.payload
            }
        case STORE_INVALID_PROMOCODE_RESPONSE:
            return{
                ...state,
                promoModal:!state.promoModal,
                invalidPromo:action.payload
            }
        case RESET_PROMOCODE_INVALID_RESPONSE:
            return{
                ...state,
                promoModal:action.payload.promoStatusModal,
                invalidPromo:action.payload.promoMsg
            }
        case UPDATE_FILTER_STATUS:
            return{
                ...state,
                itemsChecked:action.payload
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            let response = {
                responseCode:200,
                responseMessage:"Profile updated"
            }
            return{
                ...state,
                user:action.payload,
                updateProfileResponse:response
                
            }
        case UPDATE_USER_PROFILE_FAILED:
            return{
                ...state,
                updateProfileResponse:action.payload
            }
        case CLEAR_USER_PROFILE_RESPONSE :
            return{
                ...state,
                updateProfileResponse: {}
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.result.authToken);
            let userObject = {
                            userId:action.payload.result.userInfo._id,
                            fullName:action.payload.result.userInfo.fullName,
                            emailId:action.payload.result.userInfo.emailId,
                            phoneNumber:action.payload.result.userInfo.phoneNumber
                            }
                return{
                    ...state,
                    userLoginResponse:action.payload.responseMessage,
                    userLoginResponseStatus:action.payload.responseCode,
                    isAuthenticated:true,
                    token:action.payload.result.authToken,
                    user:userObject
                }

        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                userLoginResponse:action.payload.responseMessage,
                userLoginResponseStatus:action.payload.responseCode,
                isAuthenticated:false,
            }
        case CLEAR_SIGNIN_FAIL_ERRORS:
            return{
                ...state,
                userLoginResponse:'',
                userLoginResponseStatus:null,
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.result.authToken);
                return{
                    ...state,
                    userRegistrationResponse:action.payload.responseMessage,
                    userRegistrationResponseStatus:action.payload.responseCode,
                    isAuthenticated:true,
                    token:action.payload.result.authToken
                    // isLoading:false,
                    
                }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                successResetResponse:action.payload.responseMessage,
                successResetResponseStatus:action.payload.responseCode
            }
        case PASSWORD_RESET_FAILURE:
            return {
                ...state,
                failureResetResponse:action.payload.responseMessage,
                failureResetResponseStatus:action.payload.responseCode
            }
        case CLEAR_RESET_ERROR_MSGS:
            return{
                ...state,
                failureResetResponse:'',
                failureResetResponseStatus:null
            }
        // case AUTH_ERROR:
        case USER_EXIST:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                userRegistrationResponse:action.payload.responseMessage,
                userRegistrationResponseStatus:action.payload.responseCode,
                isAuthenticated:false,
            }
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                user:''
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                userRegistrationResponse:'',
                userRegistrationResponseStatus:null
            }
        case ADD_INGREDIENTS:
            let ingredientId = action.payload._id
            let updated = [...state.ingredients]
            let tempValue = updated.find(item => item['_id'] === ingredientId)
            if(tempValue) {
                let temp = updated.filter(item => item['_id'] !== ingredientId)
                return {
                    ...state,
                    ingredients:[...temp, action.payload]
                }
            } else if(tempValue === undefined) {
                return {
                    ...state,
                    ingredients:[...state.ingredients, action.payload]
                }
            }
        // eslint-disable-next-line no-fallthrough
        default:
            return state
    }
}

export default reducer;