import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_URL =
  window.location.hostname === "challenge.devconnectify.com"
    ? "https://challenge.devconnectify.com/api/v1/progress"
    : "http://localhost:5001/api/v1/progress";
export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: ({ courseId }) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lectures/${lectureId}/view`,
        method: "POST",
      }),
    }),
    completeCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: ({ courseId }) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useInCompleteCourseMutation,
  useCompleteCourseMutation,
} = courseProgressApi;
