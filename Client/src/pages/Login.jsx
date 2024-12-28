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
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [signupInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: resgisterLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const onChangeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type == "singup") {
      setSignUpInput({ ...signupInput, [name]: value });
    } else {
      setloginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  useEffect(() => {
    if (registerData && registerIsSuccess) {
      toast.success(registerData.message || "Succefully signed Up");
    } else if (loginData && loginIsSuccess) {
      toast.success(loginData?.message || "Successfuly Logged In");
      navigate("/");
    } else if (loginError) {
      toast.error(loginError?.data?.message || "Failed to Log In");
    } else if (registerError) {
      toast.error(registerError?.data?.message || "Failed to Register");
    }
  }, [
    registerData,
    registerError,
    registerIsSuccess,
    loginData,
    loginError,
    loginIsSuccess,
  ]);

  return (
    <div className="flex justify-center items-center mt-20 ">
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
                  name="name"
                  placeholder="Full Name"
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
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="username"
                  placeholder="Password"
                  value={signupInput.password}
                  name="password"
                  onChange={(e) => onChangeHandler(e, "singup")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <Button
                disabled={resgisterLoading}
                onClick={() => handleRegistration("signup")}
              >
                {resgisterLoading ? (
                  <>
                    <Loader2 className="mr2 h-4 w-4 animate-spin">
                      Please wait
                    </Loader2>
                  </>
                ) : (
                  "SignUp"
                )}
              </Button>
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
                <Input
                  id="current"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => onChangeHandler(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  id="new"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => onChangeHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center ">
              <Button onClick={() => handleRegistration("login")}>
                {loginLoading ? (
                  <>
                    <Loader2 className="mr2 h-4 w-4 animate-spin">
                      Please wait
                    </Loader2>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
