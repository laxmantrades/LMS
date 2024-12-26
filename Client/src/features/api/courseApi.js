const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query");


const COURSE_URL="http://localhost:8080/api/v1/course"
const courseApi=createApi({
    reducerPath:"courseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_URL,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:({courseTitle,category})=>({
                method:"POST",
                url:"",
                body:courseTitle,category
                
            })
        })
    })
})

export const{   useCreateCourseMutation }=courseApi