import { Link } from "react-router";

import CourseTab from "./CourseTab";

const EditCourse = () => {
  
  return <div>
          <div className="flex justify-between p-4">
              <h1 className="font-bold text-2xl">Add detail information regarding course</h1>
              <Link to={"lecture"}><h1 className=" underline">Go to lecture page</h1></Link>
          </div>
          <div>
            <CourseTab/>
          </div>
          
  </div>;
};
export default EditCourse;
