import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API =window.location.hostname==="challenge.devconnectify.com"? "https://challenge.devconnectify.com/api/v1/purchase": "http://localhost:5001/api/v1/purchase";
export const purchaseApi = createApi({
  reducerPath: "purchaseAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ courseId }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailsWithPurchaseStatus: builder.query({
      query: ({ courseId }) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailsWithPurchaseStatusQuery,
  useGetAllPurchasedCourseQuery,
} = purchaseApi;
