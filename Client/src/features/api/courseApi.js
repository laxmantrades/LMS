import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:5001/api/v1/course";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-creator-course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        method: "POST",
        url: "",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch-creator-course"],
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
      }),
      providesTags: ["Refetch-creator-course"],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch-creator-course"],
    }),
    getCourse: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId ) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useEditCourseMutation,
  useGetCourseQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} = courseApi;
