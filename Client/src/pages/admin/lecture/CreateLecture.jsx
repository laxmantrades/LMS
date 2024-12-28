import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const param = useParams();
  const { courseId } = param;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isError, isSuccess }] =
    useCreateLectureMutation();
  const {data:lecture,isLoading:lectureLoading,isError:lectureErrror}=useGetCourseLectureQuery(courseId)
  console.log(lecture);
  
    
  useEffect(() => {
    if (isSuccess) {
      toast.success("Created lecture Succefully");
    }
    if (isError) {
      toast.error("Failed to create lecture ");
    }
  }, [isError, isSuccess]);

  const handleCreate = async () => {
    await createLecture({ lectureTitle,courseId });
    
    
  };
  return (
    <div className="mt-20">
      <h1 className="text-xl font-bold">
        Lets add lecture, add some basic details for your new lecture
      </h1>
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, illo.
      </h1>
      <div className="mt-5">
        <h1 className="">Title</h1>
        <Input
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          className=""
          placeholder="Your course Name"
        ></Input>

        <div className="flex items-center gap-2 mt-2  -">
          <Button
            variant="outline"
            onClick={() => {
              navigate(`/admin/course/${courseId}`);
            }}
            className=" bg-black text-white cursor-pointer "
          >
            Back
          </Button>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
        <div>{
          lectureLoading?<p>Loading Lecture</p>:lectureErrror?<p>Failed to Load Lectures</p>:lecture.length===0?<p>No lectures available</p>:"hi"
          }</div>
      </div>
    </div>
  );
};
export default CreateLecture;
