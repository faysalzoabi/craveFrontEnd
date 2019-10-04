import { createStore, applyMiddleware,compose} from 'redux';
import reducer from "./reducer";
import thunk from 'redux-thunk'

function saveToLocalStorage(state) {
    try{
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(e) {
        return undefined
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage()
const store = createStore(reducer, persistedState, composeEnhancers(applyMiddleware(thunk)));


store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
