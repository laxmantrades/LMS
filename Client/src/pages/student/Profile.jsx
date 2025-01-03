import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

function Profile() {
  const [editname, seteditName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading,refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      isSuccess,
      error
    },
  ] = useUpdateUserMutation();
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", editname);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData)
  };

  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success(data.message || "Profile Updated");
    }
    if (isError) {
      toast.error(isError.message || "Profile failed to update");
    }
  }, [error,isError, data, isSuccess,updateUserData]);
  if (isLoading) return <h1>Profile Loading</h1>;
  if(!data) return
  const { name, email, role, enrolledCourses,photoUrl } = data?.user;
  console.log(enrolledCourses);
  
  return (
    <div className="max-w-4xl mx-auto px-4 my-20 ">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex space-x-5">
        <div className="">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={photoUrl||"https://github.com/shadcn.png"} alt="@shadcn" className=" object-cover"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="flex mb-2">
            <h1 className="font-bold">Name :</h1>
            <h1>{name}</h1>
          </div>
          <div className="flex  mb-2">
            <h1 className="font-bold">Email :</h1>
            <h1>{email}</h1>
          </div>
          <div className="flex  mb-2">
            <h1 className="font-bold">Role :</h1>
            <h1>{role}</h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editname}
                    className="col-span-3"
                    onChange={(e) => seteditName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    type="file"
                    className="col-span-3"
                    onChange={(e) => onChangeHandler(e)}
                  />
                </div>
              </div>
              <DialogFooter className="flex items-center justify-center">
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  type="submit"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-bold mt-5 text-2xl">Course you are enrolled in</h1>
        <div className="mt-10">
          {enrolledCourses && enrolledCourses.length === 0 ? (
            <h1>You have not enrolled to the courses yet</h1>
          ) : (
            <div className="flex flex-wrap">
              {enrolledCourses.map((course) => (
                <Course  course={course} key={course?._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
