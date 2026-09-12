import {configureStore} from '@reduxjs/toolkit'
import { loginSlice } from './slice'

export const store=configureStore({
    reducer:{
        loginSlice:loginSlice.reducer
    }
})      