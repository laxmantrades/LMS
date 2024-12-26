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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddCourse = () => {
  const isLoading = false;
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  

  const navigate = useNavigate();
  const getSlecetedCategory = (value) => {
    setCategory(value);
  };
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
        <div className="flex items-center gap-2 mt-2 relative -z-20">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading}>
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
