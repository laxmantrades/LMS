import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function HeroSection() {
  const [searchQuery, setSearchquery] = useState("");
  const navigate=useNavigate()
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim()!==""){
      navigate(`/course/search?query=${searchQuery}`)
    }
   
    
  };
  
  
  return (
    <div className="relative bg-gradient-to-r from-blue-400 to-indigo-700 dark:from-gray-800 dark:to-gray-900 my-16 text-center text-white py-24 shadow-lg">
      <h1 className="  font-bold text-4xl ">Find the Best Courses for You!</h1>
      <h1>Discover, Learn, and Upskill with our wide range of courses</h1>
      <form
        onSubmit={searchHandler}
        className="flex items-center justify-center mt-5 "
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchquery(e.target.value)}
          className="w-1/3 p-4 rounded-l-full shadow-md text-black dark:bg-gray-600  overflow-hidden dark:text-white dark:placeholder:bg-gray-600 "
          placeholder="search courses"
        ></input>
        <button
          type="submit"
          className="p-4 bg-blue-800 rounded-r-full shadow-md  hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-800"
        >
          Search
        </button>
      </form>
      <Button className="mt-6 bg-white text-black rounded-full  p-6 text-xl dark:bg-gray-800 hover:bg-gray-200">
        Explore Courses
      </Button>
     
    </div>
  );
}

export default HeroSection;
