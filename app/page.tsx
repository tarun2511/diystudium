import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/ui/navBar";
import ProgressBar from "@/components/ui/progressBar";
import UniFinder from "@/components/ui/uniFinder";
import Tools from "@/components/ui/Tools";
import ExploreUnis from "@/components/ui/ExploreUnis";
import DashboardClient from "@/components/ui/dashBoardClient";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 bg-white font-sans dark:bg-black">
      <NavBar />
      <DashboardClient />
      <ExploreUnis />
    </div>
  );
}
