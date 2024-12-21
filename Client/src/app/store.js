import authSlice from "@/features/authSlice"
import { configureStore } from "@reduxjs/toolkit"


const appStore=configureStore({
    reducer:{
        authSlice:authSlice
    }
})
export default appStore