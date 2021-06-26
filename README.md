# These below are the steps of how to integrate Redux Saga in Our App 🚀

## Steps:

1. <code>npm install react-redux redux redux-saga</code>
2. create a folder named `store` and put `index.js` inside
3. put code below inside `store/index.js` :

```
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);
export default store;
```
4. because we already have `import sagas from './sagas';` inside above file, so now we have to add a directory `sagas` in `store` directory and don't forget to put `index.js` again inside `sagas`.

5. in `sagas/index.js` put code below

```
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* callMeDirectly() {
    // for better of using saga, you only can use this "directly" function to put redux effects (call, put, takeLatest, etc).
    // and also you can put trycatch inside for better. cause redux saga handled asynchronous process right?
    try {
        yield console.log('Hi! 👋, Thanks for calling me')
    } catch (e) {
        yield console.log("No worries, this one is used for handled your future error 🤭")
    }
}

function imAnotherFunction(args) {
    // for better of using saga, this "indirectly" function is used for processing other logic out of redux effects (call, put, takeLatest, etc).
    // in case, I'm trying to fetch data from jsonplaceholder's API
    console.log(args) // this one would print "I'm an argument"
    return axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users'
    })
        .then(({ data }) => data)
        .catch(err => err)
}

function* callAnotherFunction() {
    try {
        const data = yield call(imAnotherFunction, "I'm an argument") // this one show you how to call another function and pass argument/parameter
        yield put({ type: 'CHANGE_DATA_ON_REDUX', payload: data })
    } catch (error) {
        yield console.log("I'm an error")
    }
}

function* rootSagas() {
    // ~ cause we have * after wrote function keyword (function*), so make sure you are using yield inside
    yield takeLatest('CALL_ME_DIRECTLY', callMeDirectly);
    yield takeLatest('CALL_ANOTHER_FUNCTION', callAnotherFunction);
}

export default rootSagas;
```

6. remember that we also have `import reducers from './reducers'` inside `store/index.js`. So now we have to add one directory inside `store` named `reducers` and put `index.js` inside. Then, put code below

```
const initialState = {
    data: "",
    // below state are used for future use
    error: "",
    loading: false,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CHANGE_DATA_ON_REDUX':
            return {
                ...state,
                data: payload,
            }
        default:
            return state;
    }
};

export default reducer;

```

7. Alright, look at `App.js`, that file shows you how we can integrate and use saga into our interface ✨✨


Thanks for read the documentation

follow me on github and put your star ⭐️ on this documentation please!


#### Have any problem?

- try to clone this repo or make an issue