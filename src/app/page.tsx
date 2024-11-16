import { useSession } from "next-auth/react";
import Navbar from "./_components/nav-bar";
import ProjectCard from "./_components/project-card";

export default function Home() {
  // const user = await getServerSession();
  // console.log("user", user);

  return (
    <div>
      <Navbar />
      <div className="bg-purple-900 min-h-[calc(100vh-6rem)] py-3">
        <h1 className="text-white text-4xl text-center font-bold py-3">
          WelCome Back!!
        </h1>
        <ProjectCard />
      </div>
    </div>
  );
}
