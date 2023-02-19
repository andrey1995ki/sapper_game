import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AppSlice from './app/app.slice'
import LeadersSlice from './leaders/leaders.slice'


const reducer = combineReducers({
    app: AppSlice,
    leaders: LeadersSlice

})
export const store = configureStore({
    reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
