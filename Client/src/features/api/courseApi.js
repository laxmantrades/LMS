import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL =
  window.location.hostname === "challenge.devconnectify.com"
    ? " https://challenge.devconnectify.com/api/v1/course"
    : "http://localhost:5001/api/v1/course";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-creator-course", "Refetch Lecture", "Refetch Course"],
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
    getSearchCourses: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `/search/course?query=${encodeURIComponent(
          searchQuery
        )}`;
        //append category
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }
        //append sort by price if avaialble
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    getAllCourse: builder.query({
      query: () => ({
        url: "search",
        method: "GET",
      }),
      providesTags: ["Refetch-creator-course", "Refetch Course"],
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-course",
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
      invalidatesTags: ["Refetch-creator-course"],
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch-creator-course"],
    }),
    editLecure: builder.mutation({
      query: ({
        lectureId,
        lectureTitle,
        videoInfo,

        courseId,
        isPreviewFree,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PATCH",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["Refetch Lecture"],
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "Delete",
      }),
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      // providesTags:["Refetch Lecture"]
    }),
    togglePublishCourse: builder.mutation({
      query: ({ query, courseId }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),

      invalidatesTags: ["Refetch Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCoursesQuery,
  useGetAllCourseQuery,
  useEditCourseMutation,
  useGetCourseQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLecureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useTogglePublishCourseMutation,
  useGetPublishedCourseQuery,
} = courseApi;
