import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/ui/navBar";
import ProgressBar from "@/components/ui/progressBar";
import UniFinder from "@/components/ui/uniFinder";
import Tools from "@/components/ui/tools";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white font-sans dark:bg-black">
      <NavBar />
      <ProgressBar />
      <UniFinder />
      <Tools />
    </div>
  );
}
