
import NavBar from "../components/ui/navBar";
import ExploreUnis from "@/components/ui/ExploreUnis";
import DashboardClient from "@/components/ui/dashBoardClient";
import Footer from "@/components/ui/footer";
import WhatsNewCard from "@/components/ui/WhatsNewCard";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 bg-white font-sans dark:bg-black">
      <NavBar />
      <main className="flex-grow">
        <DashboardClient />
        <ExploreUnis />
        <WhatsNewCard />
      </main>
      <Footer />
    </div>
  );
}
