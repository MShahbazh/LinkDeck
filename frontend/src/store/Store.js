import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './slice'

export const store=configureStore({
    reducer:{
        authSlice:authSlice.reducer
    }
})      