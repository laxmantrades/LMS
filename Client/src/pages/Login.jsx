import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type == "singup") {
      setSignUpInput({ ...setSignUpInput, [name]: value });
    } else {
      setloginInput({ ...signupInput, [name]: value });
    }
  };
  console.log(signupInput.name);

  return (
    <div className="flex justify-center items-center ">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">SignUp</TabsTrigger>
          <TabsTrigger value="password">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-left">
              <div className="space-y-1 ">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue=""
                  name="name"
                  placeHolder="Full Name"
                  value={signupInput.name}
                  onChange={(e) => onChangeHandler(e, "singup")}
                  required={true}
                />
              </div>
              <div className="space-y-1 ">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  value={signupInput.email}
                  name="email"
                  onChange={(e) => onChangeHandler(e, "singup")}
                  placeHolder="Email"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="username"
                  defaultValue=""
                  placeHolder="Password"
                  value={signupInput.password}
                  name="password"
                  onChange={(e) => onChangeHandler(e, "singup")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <Button>SignUp</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-left">
              <div className="space-y-1">
                <Label htmlFor="current">Login</Label>
                <Input id="current" type="text" placeHolder="Email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input id="new" type="password" placeHolder="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center ">
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
