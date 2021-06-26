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
