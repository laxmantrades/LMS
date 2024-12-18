import { GraduationCap } from "lucide-react";
import { Link } from "react-router";

function AuthPage() {
  return (
    <div className="flex flex-col ">
      <header className="  border-b h-20  font-bold text-2xl">
        <Link to={"/"} className="flex items-center">
          <GraduationCap className="h-20 w-20"/>
          <span className="px-2 ">LMS learning</span>
        </Link>
      </header>
    </div>
  );
}

export default AuthPage;
