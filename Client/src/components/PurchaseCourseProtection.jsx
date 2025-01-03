import { useGetCourseDetailsWithPurchaseStatusQuery } from "@/features/api/purchaseApi";
import React from "react";
import { Navigate, useParams } from "react-router";

function PurchaseCourseProtection({ children }) {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailsWithPurchaseStatusQuery({
   
    
    courseId,
  });
  console.log(data);
  if (isLoading) return <p>Loading...</p>;

  return data.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
}

export default PurchaseCourseProtection;
