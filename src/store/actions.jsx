
import axios from 'axios';

export const ADD_AREAS = 'addAreas';
export const ADD_CUISINES = 'addCuisines';
export const ADD_RESTAURANTS = 'addRestaurants';
export const ADD_SEARCHED_RESTAURANTS = 'addSearchRestaurants';
export const STORE_RESTAURANTS_SEARCH_KEYWORD = 'storeRestaurantSearchKeyword'
export const UPDATE_RESTAURANTS = 'updateSearch';
export const SELECT_CUISINE = 'fetchSelectedCusinie';
export const SEARCH_IN_MENU = 'searchInTheMenu';
export const SEARCH_IN_THE_AREA = 'updateSearchArea';
export const ADD_MENU_GROUPS = 'addMenuGroups';
export const CLEAR_MENU_GROUP = 'clearMenuGroups';
export const ADD_PRODUCT_TO_LIST = 'addProductItems';
export const STORE_ORDER_HISTORY = 'storeOrderHistory';
export const OPEN_MODAL = 'openModal';
export const CLOSE_MODAL = 'closeModal';
export const ADD_TO_CART = 'addToCart';
export const SAVE_RESTAURANT = 'addSelectedRestaurant';
export const SAVE_MENU = 'addSelectedMenu';
export const TOGGLE_ACTIVE = 'toggleActive';
export const UPDATE_QUANTITY = 'updateQuantity';
export const TOGGLE_RADIO_BUTTON = 'selectRadioBtn';
export const EMPTY_CART = 'emptyCart';
export const ADD_INGREDIENTS = 'addIngredients';
export const ADD_INGREDIENTS_CHECKBOX = 'addIngredientsOfCheckBox';
export const CLEAR_INGREDIENTS_ARRAY = 'clearIngredientsItemsArray';
export const REMOVE_INGREDIENTS_CHECKBOX = 'removeIngredientOfCheckBox';
export const ADD_INGREDIENT_ID_EXCEED_LIMIT = 'addIngredientIdExceedLimit'
export const REMOVE_INGREDIENT_ID_EXCEED_LIMIT= 'removeIngredientIdExceedLimit';
export const EMPTY_INGREDIENT = 'emptyIngredients';  //!check
export const OPEN_CHECKOUT_MODAL = 'openCheckoutModal';
export const CLOSE_CHECKOUT_MODAL = 'closeCheckoutModal';
export const OPEN_SIGN_UP_MODAL = 'openSignUpModal';
export const CLOSE_SIGN_UP_MODAL = 'closeSignUpModal';
export const OPEN_CONFIRM_Registration_Modal = 'openConfirmRegistrationModal';
export const CLOSE_CONFIRM_Registration_Modal = 'closeConfirmRegistrationModal';
export const OPEN_RESET_PASSWORD_MODAL = 'openResetPasswordModal';
export const CLOSE_RESET_PASSWORD_MODAL = 'closeResetPasswordModal';
export const OPEN_CONFIRM_RESET_MODAL = 'openConfirmResetModal';
export const CLOSE_CONFIRM_RESET_MODAL = 'closeConfirmResetModal';
export const OPEN_ERROR_MODAL = 'openErrorModal';
export const CLOSE_ERROR_MODAL = 'closeErrorModal';
export const OPEN_SEARCH_CITY_MODAL = 'openSearchCityModal';
export const CLOSE_SEARCH_CITY_MODAL = 'closeSearchCityModal';
export const ADD_IMAGE = 'addImage';
export const LIST_CUSTOMER_ADDRESS = 'listCustomerAddress';
export const CHOOSE_USER_ADDRESS = 'chooseUserAddress';
export const OPEN_ADDRESS_MODAL = 'openUserAddressModal';
export const CLOSE_ADDRESS_MODAL = 'closeUserAddressModal';
export const TOGGLE_SWITCH = 'toggleSwitch';
export const STORE_TEXT_AREA_REQUEST = 'storeTextAreaRequest';
export const STORE_USER_LOCATION = 'storeUserCoordinates';
export const DELETE_ADDRESS = 'deleteAddress';
export const ADD_ADDRESS = 'addUserAddress';
export const PLACE_ORDER_STATUS = 'placeOrderStatus';
export const CLOSE_CUSTOMIZATION_MODAL = 'closeCustomizationModal';
export const STORE_ORDER_ID = 'storeOrderId';
export const STORE_ORDER_STATUS = 'storeOrderStatus';
export const EMPTY_RESTAURANT_ARRAY = 'emptyRestaurantListArray';
export const SAVE_RADIO_BTN_GROUP_NAME = 'saveRadioBtnGroupName';
export const ACTIVATE_RED_TICK_MARK = 'activateRedTickMark';
export const DEACTIVATE_RED_TICK_MARK= 'deactivateRedTickMark';
export const ACTIVATE_GREEN_TICK_MARK = 'activateGreedTickMark';
export const CLEAR_TICK_MARKS = 'CLEAR_TICK_MARKS';
export const OPEN_MIN_ORDER_MODAL = 'openMinOrderModal';
export const CLOSE_MIN_ORDER_MODAL = 'closeMinOrderModal';
export const STORE_APPLIED_PROMOCODE_RESPONSE = 'storeAppliedPromoCodeResponse';
export const STORE_INVALID_PROMOCODE_RESPONSE = 'storeInvalidPromoCodeResponse';
export const CHANGE_PAYMENT_METHOD = 'changePaymentMethod';
export const RESET_PROMOCODE_INVALID_RESPONSE = 'resetInvalidPromoCode';
export const UPDATE_FILTER_STATUS = 'updateFilterStatus';
export const STORE_TEMP_FILTERED_RESTAURANTS = 'storeTempFilterdRestaurant';
export const UPDATE_USER_PROFILE_SUCCESS ='updateUserProfileSuccess';
export const UPDATE_USER_PROFILE_FAILED = 'updateUserProfileFail';
export const CLEAR_USER_PROFILE_RESPONSE  = 'clearUserProfileResponse';

export const REGISTER_SUCCESS = 'registerSuccess';
export const REGISTER_FAIL = 'failInUserRegistration';
export const USER_LOADING = 'loadingUser';
export const CLEAR_ERRORS = 'clearErrors';
export const LOGIN_SUCCESS = 'loginSuccess';
export const LOGIN_FAIL = 'loginFail';
export const CLEAR_SIGNIN_FAIL_ERRORS = 'clearSignFailErrors';
export const LOGOUT_SUCCESS = 'logoutSuccess';
export const USER_EXIST = 'userAlreadyExist';
export const PASSWORD_RESET_SUCCESS = 'passwordResetSuccess';
export const PASSWORD_RESET_FAILURE = 'passwordResetFailure';
export const CLEAR_RESET_ERROR_MSGS = 'clearResetErrorMsgs';

// fetching areas and adding it to store

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmJlZmUzY2QzOGNmMTNlODg3MmFiZGUiLCJjcmVhdGVkQXQiOiIyMDE4LTEwLTExVDA3OjM5OjQwLjEzOVoiLCJpYXQiOjE1NTgyNTIyODl9.UQIwD_KJpj68c8m4rOJnfVd3gCgg8Bg9Z-Q5hIdnB9A'
// let config = {
//     'Content-Type':'application/json',
//     'authToken':token
//   };


export const tokenConfig = getState => {
  //get tokent from local storage
  const token = getState().token;

  //headers
  const config = {
      "Content-type":"application/json"
  }

  //if token then add to headers
  if(token){
    config['authToken'] = token;
  }

  return config;
}


//loading User
export const loadingUser = () =>{
  return{
    type:USER_LOADING
  }
  
}


//action as result of success login
export const loginSuccess = (responseMsg) => {
  return{
    type:LOGIN_SUCCESS,
    payload:responseMsg
  }
}

//action to handle result of failed login
export const loginFail = (responseMsg) => {
  return{
    type:LOGIN_FAIL,
    payload:responseMsg
  }
}


//clear the error messages caused by failed login
export const clearSignFailErrors = () => {
  return{
    type:CLEAR_SIGNIN_FAIL_ERRORS
  }
}

//action to handle logout
export const logoutSuccess = () => {
  return{
    type:LOGOUT_SUCCESS
  }
}

//store new user registration response
export const registerSuccess = (responseData) => {
  return{
    type:REGISTER_SUCCESS,
    payload:responseData
  }
}

//handle the response when user already exist 
export const userAlreadyExist = (responseData) => {
  return {
    type:USER_EXIST,
    payload:responseData
  }
}

//handle when password reset operation is success
export const passwordResetSuccess = (responseData) => {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload:responseData
    }
}

// handle when password reset operation is failure
export const passwordResetFailure = (responseData) => {
  return{
    type:PASSWORD_RESET_FAILURE,
    payload:responseData
  }
}

//clear the errors messages when the reset operation failed
export const clearResetErrorMsgs = () => {
  return{
    type:CLEAR_RESET_ERROR_MSGS
  }
}

// handle when the new user registration fail
export const failInUserRegistration = () => {
  return {
    type:REGISTER_FAIL
  }
}

//clear the errors when close the registration modal
export const clearErrors = () => {
  return {
    type:CLEAR_ERRORS
  }
}

// change the payment method
export const changePaymentMethod = (selectedPaymentMethod) => {
  return{
    type:CHANGE_PAYMENT_METHOD,
    payload:selectedPaymentMethod
  }
}


// storing applied promocode response
export const storeAppliedPromoCodeResponse = (promoCodeObj) => {
  return{
    type:STORE_APPLIED_PROMOCODE_RESPONSE,
    payload:promoCodeObj
  }
}

// store the invalid response of the promo code
export const storeInvalidPromoCodeResponse = (responseMsg) => {
  return{
    type:STORE_INVALID_PROMOCODE_RESPONSE,
    payload:responseMsg
  }
}

//reset the invalid response of promo code
export const resetInvalidPromoCode = () => {
  return{
    type:RESET_PROMOCODE_INVALID_RESPONSE,
    payload:{
      promoStatusModal:false,
      promoMsg:''
    }
  }
}
// to activate red tick mark once the radio button is not selected of ingredients
export const activateRedTickMark = (notSelectedGroupTitleArray) => {
  return{
    type:ACTIVATE_RED_TICK_MARK,
    payload:notSelectedGroupTitleArray
  }
}

export const deactivateRedTickMark = (groupNameTitle) => {
    return{
      type:DEACTIVATE_RED_TICK_MARK,
      payload:groupNameTitle
    }
}

//activate the greed tick mark one the radio/checkbox selected
export const activateGreenTickMark = (groupNameTitle) => {
  return{
    type:ACTIVATE_GREEN_TICK_MARK,
    payload:groupNameTitle
  }
}

//clear the tick marks in the modal
export const clearTickMarks = () =>{
  return{
    type:CLEAR_TICK_MARKS,
  }
}

//adding the ingredient IDs that exceed number of selection of checkboxes more than the limit size
export const addIngredientIdExceedLimit = (id) => {
  return{
    type:ADD_INGREDIENT_ID_EXCEED_LIMIT,
    payload:id
  }
}

// removing the ingredient iD that exceeded the number of selection in its checkbox items
export const removeIngredientIdExceedLimit = (id) => {
  return {
    type: REMOVE_INGREDIENT_ID_EXCEED_LIMIT,
    payload:id
  }
}

// save the name of the group of radio btns of the ingredients
export const saveRadioBtnGroupName = (radioBtnsGroupName) => {
  return{
    type:SAVE_RADIO_BTN_GROUP_NAME,
    payload:radioBtnsGroupName
  }
}

  // empty restaurant list array 
  export const emptyRestaurantListArray = () => {
    return{
      type:EMPTY_RESTAURANT_ARRAY,
      payload:[]
    }
  }
  // storing the placed order Id
  export const storeOrderId = (orderId) => {
    return{
      type:STORE_ORDER_ID,
      payload:orderId
    }
  }


// storing the status when placing the order
export const placeOrderStatus = (status) => {
  return {
    type:PLACE_ORDER_STATUS,
    payload:status
  }
}

// storeing the object of the order that is placed by customer
export const storeOrderStatus = (order) => {
  return{
    type:STORE_ORDER_STATUS,
    payload:order
  }
}

// storing user geo coordinates
export const storeUserCoordinates = (arr) => {
  return{
    type:STORE_USER_LOCATION,
    payload:arr
  }
}


//fetch and list customer addresses
export const listCustomerAddress = (address) => {
  return{
    type:LIST_CUSTOMER_ADDRESS,
    payload: address
  }
}

//delete user address
export const deleteAddress = (addressId) => {
  return{
    type:DELETE_ADDRESS,
    payload:addressId
  }
}

// add new user address
export const addUserAddress = (addressObj) => {
  return{
    type:ADD_ADDRESS,
    payload:addressObj
  }
}
//action to store the text area order request
export const storeTextAreaRequest = (orderRequest) => {
  return{
    type:STORE_TEXT_AREA_REQUEST,
    payload:orderRequest
  }
}

export const chooseUserAddress = (address) => {
  return{
    type:CHOOSE_USER_ADDRESS,
    payload:address
  }
}

  //add selected product images to store
export const addImage = (img) => {
    return{
      type:ADD_IMAGE,
      payload:img
    }
  }

//empty the shopping cart
export const emptyCart =() => {
  let emptyObj = {}
  return{
    type:EMPTY_CART,
    payload:emptyObj
  }
}

// empty the ingredients array 
export const emptyIngredients = () => {
  let emptyArray = []
  return{
    type:EMPTY_INGREDIENT,
    payload:emptyArray
  }
}

// add ingredients of the radio buttons
export const addIngredients = (ingredientId, itemId) => {
    let newIngredient = {
      _id:ingredientId,
      items_id:itemId
    }
    return {
      type:ADD_INGREDIENTS,
      payload:newIngredient
    }

}

// add item of specific ingredient of the check box buttons
export const addIngredientsOfCheckBox = (ingredientId, itemId) => {
  let newIngredient = {
    _id:ingredientId,
    items_id:itemId
  }
  return {
    type:ADD_INGREDIENTS_CHECKBOX,
    payload:newIngredient
  }
}

//remove items of specific ingredient of the check box buttons
export const removeIngredientOfCheckBox = (ingredientId, itemId) => {
  let itemToRemove = {
    _id:ingredientId,
    items_id:itemId
  }
  return {
    type:REMOVE_INGREDIENTS_CHECKBOX,
    payload:itemToRemove
  }
}

//clear the items of ingredients once the igredients modal is closed
export const clearIngredientsItemsArray = () => {
  return {
    type:CLEAR_INGREDIENTS_ARRAY
  }
}

//update the sate of radio button
export const selectRadioBtn = (item) => {
  return{
    type:TOGGLE_RADIO_BUTTON,
    payload:item
  }
}
// toggle the activity of the shopping cart spinner
export const toggleActive = () => {
  return{
    type:TOGGLE_ACTIVE,
    // payload:item
  }
}

// toggle the delivery and pickup switch
export const toggleSwitch = (order) => {
  return{
    type:TOGGLE_SWITCH,
    payload:order
  }
}

//action to store the total amount of the cart
export const updateQuantity = (obj) => {
  return {
    type:UPDATE_QUANTITY,
    payload:obj
  }
}

export const openModal = (id) => {
  return{
      type:OPEN_MODAL,
      payload:id
  }
}

export const openCheckoutModal = () => {
    return{
      type:OPEN_CHECKOUT_MODAL,
    }
}

export const openUserAddressModal = () => {
  return{
    type:OPEN_ADDRESS_MODAL
  }
}

export const openMinOrderModal = () => {
  return{
    type:OPEN_MIN_ORDER_MODAL
  }
}

export const openSignUpModal = () => {
  return{
    type:OPEN_SIGN_UP_MODAL
  }
}

export const openResetPasswordModal = () => {
  return{
    type:OPEN_RESET_PASSWORD_MODAL
  }
}

export const openConfirmRegistrationModal = () => {
  return{
    type:OPEN_CONFIRM_Registration_Modal
  }
}

// opneing the success confirmation modal of the reset
export const openConfirmResetModal = () => {
  return {
    type:OPEN_CONFIRM_RESET_MODAL
  }
}

// opening error modal
export const openErrorModal = () => {
  return {
    type:OPEN_ERROR_MODAL
  }
}

//open search city modal
export const openSearchCityModal = () => {
  return {
    type:OPEN_SEARCH_CITY_MODAL
  }
}

export const closeModal = () => {
  return{
      type:CLOSE_MODAL,
      payload:false
  }
}

export const closeCheckoutModal = () => {
    return {
      type:CLOSE_CHECKOUT_MODAL,
      payload:false
    }
}

export const closeUserAddressModal = () => {
    return {
      type: CLOSE_ADDRESS_MODAL,
      payload: false
    }
}

export const closeCustomizationModal = () => {
    return {
      type: CLOSE_CUSTOMIZATION_MODAL,
      payload: {
        status:false,
        deliveryStatus:''
      }
    }
}

export const closeMinOrderModal = () => {
    return{
      type:CLOSE_MIN_ORDER_MODAL,
      payload:false
    }
}

export const closeSignUpModal = () => {
  return{
    type:CLOSE_SIGN_UP_MODAL,
    payload:false
  }
}


export const closeResetPasswordModal = () => {
  return{
    type:CLOSE_RESET_PASSWORD_MODAL,
    payload:false
  }
}

export const closeConfirmRegistrationModal = () => {
  return{
    type:CLOSE_CONFIRM_Registration_Modal,
    payload:false
  }
}

// closing the reset confirmation modal
export const closeConfirmResetModal = () => {
  return {
    type:CLOSE_CONFIRM_RESET_MODAL,
    payload:false
  }
}


//close error modal
export const closeErrorModal = () => {
  return{
    type:CLOSE_ERROR_MODAL,
    payload:false
  }
}


//close search city modal
export const closeSearchCityModal = () => {
  return {
    type:CLOSE_SEARCH_CITY_MODAL,
    payload:false
  }
}


export const addAreas = (areas) => {
    return {
        type:ADD_AREAS,
        payload: areas
    }
}


//store selected restaurant Id
export const addSelectedRestaurant = (restaurantId) => {
    return {
      type:SAVE_RESTAURANT,
      payload:restaurantId
    }
}


//store selected menu Id
export const addSelectedMenu = (menuId) => {
  return {
    type:SAVE_MENU,
    payload:menuId
  }
}

// fetching cuisines and adding it to the store
export const addCuisines = (cuisines) => {
    return{
        type:ADD_CUISINES,
        payload: cuisines
    }
}

export const addMenuGroups = (menuGroups) =>{
  return{
    type:ADD_MENU_GROUPS,
    payload:menuGroups
  }
}

//clearning the Menu groups array before the next fetch
export const clearMenuGroups = () => {
  return{
    type:CLEAR_MENU_GROUP,
  }
}

export const addProductItems = (productsItems) => {
  return{
    type:ADD_PRODUCT_TO_LIST,
    payload:productsItems
  }
}

// store the user order history in redux store
export const storeOrderHistory = (orderArr) => {
  return {
    type:STORE_ORDER_HISTORY,
    payload:orderArr
  }
}



export const addRestaurants = (restaurants,pagesNo,emiratesId, areaId, searchCity, searchArea) => {
    const restaurantObj = {restaurants, 
                            pagesNo,
                            emiratesId,
                            areaId,
                            searchCity, 
                            searchArea
                            };
    return{
        type:ADD_RESTAURANTS,
        payload: restaurantObj
    }
}

//store result of search in restaurants
export const addSearchRestaurants = (restaurants,pagesNo,emiratesId, areaId) => {
    return {
      type:ADD_SEARCHED_RESTAURANTS,
      payload:restaurants
    }
}
//save the restaurant search keyword 
export const storeRestaurantSearchKeyword = (keyWord) => {
  return{
    type:STORE_RESTAURANTS_SEARCH_KEYWORD,
    payload:keyWord
  }
}

export const updateRestaurant = (searchRestaurant) => {
  return{
    type:UPDATE_RESTAURANTS,
    payload: searchRestaurant
  }
}

//action to store the result of search in menu
export const searchInTheMenu = (searchedInput) => {
  return {
    type:SEARCH_IN_MENU,
    payload:searchedInput
  }
}

//action to store the result of area search
export const updateSearchArea = (searchedInput) => {
  return{
    type:SEARCH_IN_THE_AREA,
    payload:searchedInput
  }
}

// fetching the selected cuisine
export const fetchSelectedCusinie = (selectedCuisine) => {
  return{
    type:SELECT_CUISINE,
    payload: selectedCuisine
  }
}

// add items to cart
export const addToCart = (item) => {
  return {
    type:ADD_TO_CART,
    payload: item
  }
}


//Update the restaurant filter selection
export const updateFilterStatus = (itemsChecked) => {
  return {
    type:UPDATE_FILTER_STATUS,
    payload:itemsChecked
  }
}


//Update user profile info succeeded
export const updateUserProfileSuccess = (userId,fullName,emailId, phoneNumber) => {
  let userObj = {
    userId,
    fullName,
    emailId,
    phoneNumber
  }
  return {
    type:UPDATE_USER_PROFILE_SUCCESS,
    payload:userObj
  }
}

// update user profile failed
export const updateUserProfileFail = (response) => {
  return {
    type:UPDATE_USER_PROFILE_FAILED,
    payload:response
  }
}

export const clearUserProfileResponse = () => {
    return {
      type:CLEAR_USER_PROFILE_RESPONSE,
    }
}

export const updateSearch = (searchRestaurant) => (dispatch, getState) => {
  dispatch(updateRestaurant(searchRestaurant))
}


//fetch the history of user orders
export const fetchMyOrdersHistory = () => (dispatch, getState) => {
  axios({
    method:"GET",
    url:`/api//myOrders/?skip=0&orderType=3`,
    headers:tokenConfig(getState),
    })
    .then(res => {
      dispatch(storeOrderHistory(res.data.result))
    })
    .catch(error => console.log('Error', error))
}

// fetch the customer user address
export const fetchUserAddress = () => (dispatch, getState) => {
  axios({
    method:"GET",
    url: "/api/addressList",
    headers:tokenConfig(getState),
  })
  .then(res => {
    dispatch(listCustomerAddress(res.data.result))
  })
  .catch(error => console.log('Error', error))
}


//fetching areas with their ids
export const fetchAreaData = () => (dispatch, getState) => {
    axios.get(`/api/getAreas/`)
        .then(res => {
            dispatch(addAreas(res.data.result))
          })
        .catch(error=> console.log('Error',error));
}


//fetching cuisine data with their corresponding ids
export const fetchCuisineData = () => (dispatch, getState) => {
    axios.get(`api/categorylist`)
        .then(res => {
            dispatch(addCuisines(res.data.result))
          })
        .catch(error=> console.log('Error',error));
}

//fetching adding menu groups to the store
export const fetchMenuList = (menuId) => (dispatch, getState) => {
  if(getState().menuGroups.length > 0) {
    dispatch(clearMenuGroups())
  }
  axios({
    method: "POST",
    url: "/api/groupwithproduct/",
    data: {
        "restaurantId" : menuId
    }
  })
    .then(res => {
      dispatch(addMenuGroups(res.data.result.docs));

    })
    
    .catch(err => {
      console.log('Error in Request', err);
    })
}

// fetching and adding product items to the store
export const fetchProductList = (restaurantId, menuId, categoryId) => (dispatch, getState) => {
  axios({
    method: "POST",
    url: "/api/productList/",
    data: {
      "pageNumber":1,
      "restaurantId":menuId,
      "restId":restaurantId,
      "language":"en",
      "category":categoryId
    }
  })
    .then(res => {
      dispatch(addProductItems(res.data.result.docs));

    })
    .catch(err => {
      console.log('Error in Request', err);
    })
}

// fetching the list of restaurants in particular area
export const fetchRestData = (emiratesId, areaId, cuisineId, searchCity, searchArea) => (dispatch, getState) => {
    axios({
        method: "POST",
        url: "/api/showRestaurantList",
        data: {
            "userId" : "",
            "Filter" : "Recommended",
            "EmiratesId" : emiratesId,
            "search" : '',
            "lng" : "",
            "pageNumber" : 1,
            "distance" : {
              "min" : "0",
              "max" : "50"
            },
            "AreasId" : areaId,
            "CuisineId" : cuisineId,
            "lat" : ""
        }
      })
        .then(res => {
          dispatch(addRestaurants(res.data.result.docs, res.data.result.pages, emiratesId, areaId, searchCity, searchArea));
      
        })
        .catch(err => {
          console.log("error in request", err);
        });
}



// fetching the list of restaurants in particular area
export const searchAndFetchRestaurants = (emiratesId, areaId, cuisineId, pageNumber = 1, searchKeyword='') => (dispatch, getState) => {
  axios({
      method: "POST",
      url: "/api/showRestaurantList",
      data: {
          "userId" : "",
          "Filter" : "Recommended",
          "EmiratesId" : emiratesId,
          "search" : searchKeyword,
          "lng" : "",
          "pageNumber" : pageNumber,
          "distance" : {
            "min" : "0",
            "max" : "50"
          },
          "AreasId" : areaId,
          "CuisineId" : cuisineId,
          "lat" : ""
      }
    })
      .then(res => {
        dispatch(addSearchRestaurants(res.data.result.docs, res.data.result.pages, emiratesId, areaId));
    
      })
      .catch(err => {
        console.log("error in request", err);
      });
}


// fetching if there is items in the user cart
export const fetchItemsOfCart = () => (dispatch, getState) => {
  axios({
          method:"GET",
          url:"/api/cartList/",
          headers:tokenConfig(getState),
      })
      .then(res => {
        if(res.data.responseMessage === "success")
              dispatch(addToCart(res.data.result));
        // dispatch(toggleActive())
      })
      .catch(err => {
        console.log('Error in Request', err);
      })
}

// adding items to cart
export const addItemsToCart = (restaurantId, menuId, productId) => (dispatch, getState) => {
  const{minPriceForHomeDelivery,deliveryCharge,avgDeliveryTime} = getState().selectedRestaurant;
  const ingredients = getState().ingredients;
  const checkBoxIngredients = getState().checkBoxIngredients;
  dispatch(toggleActive())
    axios({
      method:"POST",
      url:"/api/addInCart/",
      headers:tokenConfig(getState),
      data: {
        "productId" : productId,
        "restaurantId" : restaurantId,
        "minPriceForHomeDelivery" : minPriceForHomeDelivery,
        "menuId" : menuId,
        "version" : 2,
        "avgDeliveryTime" : avgDeliveryTime,
        "deliveryCharge" : deliveryCharge,
        "ingridients":[...ingredients, ...checkBoxIngredients]
        }
      
    })
      .then(res => {
        //  if(res.responseCode === 200 && res.responseMessage === "success"){
        //     dispatch(addToCart(res.data.result));
        //     dispatch(toggleActive(getState().isActive));
        //  }
        return axios({
          method:"GET",
          url:"/api/cartList/",
          headers:tokenConfig(getState),
        })
      })
      .then(res => {
        dispatch(toggleActive())
        dispatch(addToCart(res.data.result));
      })
      .catch(err => {
        console.log('Error in Request', err);
      })
}


export const deleteProductItem = (productId) => (dispatch, getState) => {
  dispatch(toggleActive(getState().isActive))
  axios({
    method:"POST",
    url:"/api/deleteFromCart/",
    headers:tokenConfig(getState),
    data: {
      "cartId" : productId,
      }
    })
    .then(res => {
      return axios({
      method:"GET",
      url:"/api/cartList/",
      headers:tokenConfig(getState),
      })
  })
    .then(res => {
      dispatch(toggleActive(getState().isActive))
      dispatch(addToCart(res.data.result));
    })
    .catch(err => console.log('Error in Request', err))
}


export const updateProductQuantity = (productId, quantity) => (dispatch, getState) => {
  dispatch(toggleActive(getState().isActive))
  axios({
    method:"POST",
    url:"/api/updateCartQuantity",
    headers:tokenConfig(getState),
    data:{
      "cartId":productId,
      "quantity":quantity
    }
  })
  .then(res => {
    dispatch(updateQuantity(res.data.result))
    return axios({
      method:"GET",
      url:"/api/cartList/",
      headers:tokenConfig(getState),
    })
  })
  .then(res => {
    dispatch(toggleActive(getState().isActive))
    dispatch(addToCart(res.data.result));
  })
  .catch(err => console.log('Error in Request', err))
}


export const emptyShoppingCart = (productId, quantity) => (dispatch, getState) => {
  axios({
    method:"POST",
    url:"/api/deleteAllFromCart",
    headers:tokenConfig(getState),
  })
  .then(res => {
    dispatch(emptyCart())
  })  
  .catch(err => console.log('Error in Request', err))
}



// place an order and verify the distance between the restaurant and restaurant
export const placeOrder = (totalAmount, payAmount, offerAmount, orderType, deliveryAddressId, textAreaOrderRequest, userCoordinates, restCoordinates, selectedPaymentMethod) => (dispatch, getState) => {

    if(orderType === 1) {
          axios({
            method:"POST",
            url:"/api/bookOrderByCart",
            headers:tokenConfig(getState),
            data:{
              "totalAmount":totalAmount,
              "payAmount":payAmount,
              "offerAmount":offerAmount,
              "specialRequest":textAreaOrderRequest,
              "paymentMode":selectedPaymentMethod,
              "orderType":orderType,
            }
          })
          .then(res => {
            dispatch(storeOrderId(res.data.result.orderId));
          })
          .catch(err => console.log('Error in Request', err))
          // if its delivery
  } else if(orderType === 3){
          axios({
            method:"POST",
            url:'/api/getRestDetails',
            data:{
              "restlat":restCoordinates[0],
              "restlong":restCoordinates[1],
              "userlat":userCoordinates[0],
              "userlong":userCoordinates[1],
              }
          })
          .then(res => {
            if(res.data.result === 1){
              return axios({
                method:"POST",
                url:"/api/bookOrderByCart",
                headers:tokenConfig(getState),
                data:{
                  "totalAmount":totalAmount,
                  "payAmount":payAmount,
                  "offerAmount":offerAmount,
                  "specialRequest":textAreaOrderRequest,
                  "paymentMode":"COD",
                  "orderType":orderType,
                  "deliveryAddressId":deliveryAddressId
                }
              })
            }
            else {
              dispatch(placeOrderStatus("No Deliver"))
              return;
            }
          })
          .then(res => {
            dispatch(storeOrderId(res.data.result.orderId));
          })
          .catch(err => console.log('Error in Request', err))

  }
  
}


// find the city from google search
function findCity(suggestedAddress,cities) {
  let city;
  cities.forEach(item => {
    let check = suggestedAddress.indexOf(item);
    if(check !== -1) city = item;
  })
  return city;
}

// find the country from google search
function findCountry(suggestedAddress, countries) {
  let country;
  countries.forEach(item => {
    let check = suggestedAddress.indexOf(item);
    if(check !== -1) country = item;
    
  })
  return country
}
// adding new user address
export const addNewAddress = (addressObj, coordinatesArr, suggestedAddress) => (dispatch, getState) => {
    let userCoordObj = {};
    let cities = ['Abu Dhabi','Dubai','Sharjah','Ajman','Umm Al Quawain','Fujairah','Ras al Khaimah'];
    let countries = ['United Arab Emirates'];
    userCoordObj['coordinates'] = coordinatesArr;
    let foundCity = findCity(suggestedAddress, cities);
    let foundCountry = findCountry(suggestedAddress, countries);
    axios({
      method:"POST",
      url:"/api/addAddress",
      headers:tokenConfig(getState),
      data:{
        "title":addressObj.title,
        "state":"Dubai",
        "zipCode":null,
        "address":addressObj.firstAddress,
        "line1":addressObj.secondAddress,
        "landMark":'temporary for now',
        "city":foundCity,
        "country":foundCountry,
        "latLong":coordinatesArr
      }
    })
    .then(res => {
      dispatch(addUserAddress(res.data.result[0]));
    })
    .catch(err => console.log('Error in Request', err))
}

// deleting User Address
export const deleteUserAddress = (addressId) => (dispatch, getState) => {
  axios({
    method:"POST",
    url:"/api/updateAddress",
    headers:tokenConfig(getState),
    data:{
      "addressId":addressId,
      "type":"Delete"
    }
  })
  .then(res => {
    if(res.data.responseMessage === "Address Deleted" && res.data.responseCode === 200){
      dispatch(deleteAddress(addressId))
    }
    if(res.data.responseMessage === "Something went wrong" && res.data.responseCode === 400){
      dispatch(openErrorModal())
    }
  })
  .catch(err => console.log('Error in Request', err))
}


// fetching the placed order status and all the details
export const fetchOrderStatusDetails = (orderId) => (dispatch, getState) => {
  axios({
    method:"GET",
    url:`/api/orderDetails/?orderId=${orderId}`,
    headers:tokenConfig(getState),
  })
  .then(res => {
            dispatch(storeOrderStatus(res.data.result))
          })
  .catch(err => console.log('Error in Request', err))
}

// Applying the promo code
export const applyPromoCode = (selectedRestaurantId,totalAmount,promoCode) => (dispatch, getState) => {
  axios({
    method:"POST",
    url:'/api/applyPromoCode/',
    headers:tokenConfig(getState),
    data:{
      "restaurantId":selectedRestaurantId,
      "promoCode":promoCode,
      "totalAmount":totalAmount
    }
  })
  .then( res => {
      if(res.data.result){
        dispatch(storeAppliedPromoCodeResponse(res.data.result));
      } else{
        dispatch(storeInvalidPromoCodeResponse('Invalid Promo Code'))
      }
  })
  .catch(err => console.log('Error in Request', err))
}


//Get token and load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(loadingUser())
  const token = getState().token;

  //headers
  const config = {
    headers:{
      "Content-type":"application/json"
    }
  }

  //if token then add to headers
  if(token){
    config.headers['authToken'] = token;
  }
}


// send user profile updated info
export const updatingUserProfile = (name, mobileNo) => (dispatch, getState) => {
  dispatch(clearUserProfileResponse())
  axios({
    method:'POST',
    url:'/api/updateProfile',
    headers:tokenConfig(getState),
    data:{
      "fullName":name,
      "phoneNumber":mobileNo
    }
  })
  .then(res => {
    if(res.data.responseCode === 200 && res.data.responseMessage === "Profile updated") {
        const{fullName, emailId, phoneNumber} = res.data.result;
        const userId = res.data.result._id;
        dispatch(updateUserProfileSuccess(userId,fullName,emailId, phoneNumber))
    }
    
    if(res.data.responseCode === 204 && res.data.responseMessage === "Phone number already taken") {
      dispatch(updateUserProfileFail(res.data))
  }
    
  })
  .catch(err => console.log('Error in Request', err));
}


//valdiate the user login
export const validateUserLogin = (email, password, deviceToken) => (dispatch, getState) => {
  
  axios({
    method:'POST',
    url:'/api/login',
    data:{
      "password" : password,
      "deviceType" : "web",
      "emailId" : email,
      "deviceToken":deviceToken
    }
  })
  .then(res => {
            if(res.data.responseCode === 200){
                dispatch(loginSuccess(res.data))
                dispatch(closeCheckoutModal())
            }
                
            if(res.data.responseCode === 409 || res.data.responseCode === 404)
                dispatch(loginFail(res.data)) 
          })
  .catch(err => console.log('Error in Request', err))
}


//handle user social login
export const socialUserLogin = (email, name, socialId, deviceToken, accountType) => (dispatch, getState) => {
  axios({
    method:'POST',
    url:'/api/socialLogin',
    data:{
      "emailId":email,
      "fullName":name,
      "socialId":socialId,
      "deviceToken":deviceToken,
      "deviceType" : "web",
      "accountType": accountType
    }
  })
  .then(res => {
      if(res.data.responseCode === 200) {
          dispatch(loginSuccess(res.data))
          dispatch(closeCheckoutModal())
      }
      if(res.data.responseCode === 400) {
        dispatch(loginFail(res.data))
      }
  })
  .catch(err => console.log('Error in Request', err))
}


//log out the User
export const logoutUser = () => (dispatch, getState) => {
  axios({
    method:'POST',
    url:'/api/logOut',
    headers:tokenConfig(getState),
  })
  .then(res => {
    dispatch(clearUserProfileResponse())
    dispatch(logoutSuccess())
  })
  .catch(err => console.log('Error in Request', err))

}


//register a new user and  create account
export const registerNewUser =(name, email, password, phone, deviceToken = "") => (dispatch, getState) => {
  axios({
    method:'POST',
    url:'/api/signUp',
    data:{
      "fullName":name,
      "emailId": email,
      "password":password,
      "phoneNumber":phone,
      "deviceType":"web",
      "deviceToken":deviceToken
    }
  })
  .then(res => {
    if(res.data.responseCode === 200 && res.data.responseMessage === "Account created")
            dispatch(registerSuccess(res.data))
    if(res.data.responseCode === 409 && res.data.responseMessage === "Email id already taken")
            dispatch(userAlreadyExist(res.data))
  })
  .catch(err => {
    dispatch(failInUserRegistration())
  })
}

//sending the saved password to the user
export const resetUserPassword = (email) => (dispatch, getState) => {
  axios({
    method:'POST',
    url:'/api/forgotPassword',
    data:{
      "emailId": email
    }
  })
  .then(res => { 
    if(res.data.responseCode === 200 && res.data.responseMessage === 'Your new password has been sent to your primary email address'){
      dispatch(passwordResetSuccess(res.data))
    }
      
    if(res.data.responseCode === 204 && (res.data.responseMessage === 'Something went wrong' || res.data.responseMessage === 'Email id does not exist'))
      dispatch(passwordResetFailure(res.data))

  })
  .catch(err => console.log('Error in Request', err))
}


