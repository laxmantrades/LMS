import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse, { data, isLoading, isSuccess, isError }] =
    useCreateCourseMutation();
 

  const navigate = useNavigate();
  const getSlecetedCategory = (value) => {
    setCategory(value);
  };
  const handleCreate = async () => {
    try {
    await createCourse({ courseTitle, category });
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Succefully created the course");
      navigate("/admin/course")
    }
    if (isError) {
      toast.error(isError?.data?.message || "Failed to create Course");
    }
  }, [data, isError, isSuccess]);
  return (
    <div className="mt-20">
      <h1 className="text-xl font-bold">
        Lets add course, add some basic course details for your new course
      </h1>
      <h1>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, illo.
      </h1>
      <div className="mt-5">
        <h1 className="">Title</h1>
        <Input
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          className=""
          placeholder="Your course Name"
        ></Input>
        <Select onValueChange={getSlecetedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="NextJS">NextJS</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Frontend Development">
                Frontend Development
              </SelectItem>
              <SelectItem value="FullStack Development">
                FullStack Development
              </SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 mt-2  -">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/course");
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
      </div>
    </div>
  );
};
export default AddCourse;
