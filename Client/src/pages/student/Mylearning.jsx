import { useGetAllPurchasedCourseQuery } from "@/features/api/purchaseApi";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  
  const loading = false;

  const{data,isLoading}=useLoadUserQuery()
  const myLearning=data?.user.enrolledCourses||[]
  console.log(myLearning);
  
  return (
    <div className="text-center mt-24">
      <div className="font-bold text-3xl">My Learning</div>
      <div className="mt-4">
      {isLoading ? (
        <MyLearningSkeleton />
      ) : myLearning.length === 0 ? (
        <h1 className="mt-40">You are not enrolled to any courses yet</h1>
      ) : (
        <div className="flex justify-center items-center gap-4">
          {myLearning && myLearning.map((course) => (
            <Course course={course }key={course._id} />
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
