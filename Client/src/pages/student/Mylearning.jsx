import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";
import Course from "./Course";

const MyLearning = () => {
  const myLearning = ["hi"];
  const loading = false;

  const{data}=useGetAllPurchasedCourseQuery()
  const course=data?.purchaseCourse
  return (
    <div className="text-center mt-24">
      <div className="font-bold text-3xl">My Learning</div>
      <div className="mt-4">
      {loading ? (
        <MyLearningSkeleton />
      ) : myLearning.length === 0 ? (
        <h1 className="mt-40">You are not enrolled to any courses yet</h1>
      ) : (
        <div className="flex justify-center items-center gap-4">
          {course && course.map((index) => (
            <Course course={course }key={index} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};
export default MyLearning;
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
