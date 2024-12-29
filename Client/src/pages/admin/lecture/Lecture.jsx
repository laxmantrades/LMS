import { Edit } from "lucide-react";
import { useNavigate } from "react-router";

const Lecture = ({lecture,courseId,index}) => {
    const navigate=useNavigate()
    
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture - {index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={()=>navigate(`/admin/course/${courseId}/lecture/${lecture._id}`)}
        size={20}
        className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      />
    </div>
  );
};
export default Lecture;
