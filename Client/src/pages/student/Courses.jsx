import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
    
    const  {data,isLoading,isError}=useGetPublishedCourseQuery()
    const publishedCourse=data?.getPublishedCourse
    
    if(isError){return <p className="text-center">Something went wrong while fetching</p>}
  
    return (
      <div className="bg-gray-50 dark:bg-[#141414]">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            ) : publishedCourse&& publishedCourse.map((course) => (
                <Course course={course} key={course._id} />
              ))
            
            }
          </div>
        </div>
      </div>
    );
  };
  
  export default Courses;
const CourseSkeleton = () => {
    return (
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
        <Skeleton className="w-full h-36" />
        <div className="px-5 py-4 space-y-3">
          <Skeleton className="h-6 w-3/4 bg-gray-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full  bg-gray-100" />
              <Skeleton className="h-4 w-20  bg-gray-100" />
            </div>
            <Skeleton className="h-4 w-16  bg-gray-100" />
          </div>
          <Skeleton className="h-4 w-1/4  bg-gray-100" />
        </div>
      </div>
    );
  };
