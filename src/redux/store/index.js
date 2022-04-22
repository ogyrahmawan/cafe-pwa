import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import allReducers from '../reducers'

const middleware = [thunk]

const makeStore = () => createStore(allReducers, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)