import{createAPI, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIN } from "../authSlice"


const URI_API="http://localhost:5001/api/v1/user/"
export const authApi=createAPI({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:URI_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(arg,{queryFulFilled},dispatch){
                try {
                    const result=await queryFulFilled
                    dispatch(userLoggedIN({user:result.data.user}))
                } catch (error) {
                    
                }
            }
        })

    })
})
export const {useRegisterUserMutation,useLoginUserMutation}=authApi