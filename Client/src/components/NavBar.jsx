import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Menu, School } from "lucide-react";
import { Button } from "./ui/button";

import { Label } from "./ui/label";
import DarkMode from "@/DarkMode";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store?.auth?.user?.user);

  const [logoutUser, { data, isLoading, isError, isSuccess }] =
    useLogoutUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User loged out");
      navigate("/login");
    }
  }, [isSuccess]);

  const logOuthandler = async () => {
    await logoutUser();
  };

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed  top-0 left-0 right-0 duration-300 z-10  ">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2 ">
          {" "}
          <School className="h-10 w-10" />
          <h1 className=" hidden md:block font-extrabold text-2xl ">
            <Link to={"/"}>E Learning</Link>
          </h1>
        </div>{" "}
        <div className="flex gap-3 ">
          {user ? (
            <DropdownMenu className="opacity-100">
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={
                      (user && user?.photoUrl) ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-white dark:bg-gray-800 ">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"/my-learning"}>My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"/profile"}>Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logOuthandler}>
                    Log Out
                  </DropdownMenuItem>
                  {user?.role === "instructor" && (
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      <div className=" md:hidden  flex items-center h-full justify-between px-4">
        <h1 className="text-2xl font-bold ml-3 ">E-Learning</h1>
        <MobileNavBar user={user?.role} />
      </div>
    </div>
  );
};
export default NavBar;

const MobileNavBar = ({ user }) => {
  const role = "instructor";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className=" rounded-full " variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader className="flex flex-row items-center justify-between p-4">
          <SheetTitle className="text-xl">E-learning</SheetTitle>
          <SheetDescription>
            <DarkMode />
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col justify-between ">
          <span className="mt-2">My learning</span>
          <span className="mt-2">Edit Profile</span>
          <span className="mt-2">Log out</span>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose
              asChild
              className="w-full flex items-center justify-center mt-2"
            >
              <Button className="bg-red-400" type="submit">
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
