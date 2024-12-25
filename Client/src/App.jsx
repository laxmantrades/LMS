import "./App.css";

import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/Mylearning";
import Profile from "./pages/student/Profile";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses/>
          </>
        ),
      },
      {
        path:"login",
        element:<Login/>
        
      },
      {
        path:"my-learning",
        element:<MyLearning/>
        
      },
      {
        path:"profile",
        element:<Profile/>
        
      }
    ],
  },
]);
function App() {
  return (
    <>
    <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
