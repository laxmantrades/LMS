import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetAllCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";

function CourseTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, isSuccess } = useGetAllCourseQuery();
  if(isLoading)<h1>Loadig...</h1>
  

  return (
    <div className="mt-4">
      <Button
        onClick={() => navigate("create")}
        className="bg-black text-white"
      >
        Create a new Course
      </Button>

      <Table>
        <TableCaption>A list of your created course.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.findCourse?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.coursePrice || "NA"}
              </TableCell>
              <TableCell>{course?.paymentStatus || "Draft"}</TableCell>
              <TableCell>{course?.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={()=>navigate(`${course._id}`)}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CourseTable;
