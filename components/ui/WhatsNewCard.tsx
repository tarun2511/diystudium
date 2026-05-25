"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, Newspaper, Landmark, Briefcase, ShieldCheck } from "lucide-react";

interface NewsArticle {
  id: string;
  category: "immigration" | "politics" | "career";
  title: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl?: string; // Optional background image slot for the main card
  gridClass: string;  // Tailwind grid sizing constraints
}

// Hardcoded fallback data styled EXACTLY like your blueprint image layouts
const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "art-1",
    category: "immigration",
    title: "Germany's New Visa Fast-Track Options Released",
    sourceName: "make-it-in-germany.com",
    sourceUrl: "https://www.make-it-in-germany.com",
    imageUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=600&q=80", // Premium Berlin/German aesthetic backdrop
    gridClass: "col-span-1 row-span-2 min-h-[32rem]" // The tall card on the left
  },
  // {
  //   id: "art-2",
  //   category: "career",
  //   title: "Convert Grades with Bavarian Formula Instantly",
  //   sourceName: "De-Dash Calculator",
  //   sourceUrl: "#",
  //   gridClass: "col-span-1 row-span-1"
  // },
  {
    id: "art-3",
    category: "immigration",
    title: "APS Certificates Verified via DigiLocker inside 15 Days",
    sourceName: "My Personal Process Log",
    sourceUrl: "#",
    gridClass: "col-span-1 row-span-1"
  },
  {
    id: "art-4",
    category: "politics",
    title: "Latest Embassy Slots & Visa Processing Requirements in Your Region",
    sourceName: "Anabin Database updates",
    sourceUrl: "https://anabin.kmk.org",
    gridClass: "col-span-1 row-span-1 bg-zinc-100/50 dark:bg-zinc-900/40"
  },
  {
    id: "art-5",
    category: "career",
    title: "Live uni-assist Queue Tracking System Online",
    sourceName: "uni-assist.de portal",
    sourceUrl: "https://www.uni-assist.de",
    gridClass: "col-span-1 row-span-1"
  },
  {
    id: "art-6",
    category: "politics",
    title: "Secure Your Blocked Account Instantly with Verified Partners",
    sourceName: "Expatrio / Fintiba Source",
    sourceUrl: "#",
    gridClass: "col-span-1 row-span-1 bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-400" // Light green card accent layout
  }
];

export default function WhatsNewCard() {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);

  // Helper function to return category icons matching your top-left icon badges
  const getIcon = (category: string, isBlueCard: boolean) => {
    const baseClass = `w-4 h-4 ${isBlueCard ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`;
    switch (category) {
      case "politics": return <Landmark className={baseClass} />;
      case "career": return <Briefcase className={baseClass} />;
      default: return <Newspaper className={baseClass} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 mb-30">
      
      {/* SECTION TITLE */}
      <div className="mb-8 space-y-1">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">What's New</h2>
        <p className="text-sm text-zinc-500">Real-time updates regarding German immigration, tech careers, and university requirements.</p>
      </div>

      {/* THE MAIN BENTO GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[15rem]">
        {articles.map((item) => {
          const isBlueCard = item.gridClass.includes("bg-blue-600");
          
          return (
            <a
              key={item.id}
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between p-8 overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-stone-50/40 dark:border-zinc-800/80 dark:bg-zinc-950/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${item.gridClass}`}
              style={
                item.imageUrl 
                  ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 100%), url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
                  : {}
              }
            >
              {/* TOP ACTION LAYER: Dynamic Category Badge Button Icon */}
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl shadow-sm ${
                  item.imageUrl ? 'bg-white/20 backdrop-blur-md border border-white/20' : isBlueCard ? 'bg-white/10' : 'bg-lime-300'
                }`}>
                  {getIcon(item.category, isBlueCard || !!item.imageUrl)}
                </div>
                
                <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 ${
                  item.imageUrl || isBlueCard ? 'text-white' : 'text-[#ff7614]'
                }`} />
              </div>

              {/* BOTTOM ACTION LAYER: Headline + Source Link Reference */}
              <div className="space-y-3">
                <h3 className={`font-black leading-tight tracking-tight text-xl ${
                  item.imageUrl || isBlueCard ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'
                }`}>
                  {item.title}
                </h3>
                
                <p className={`text-xs font-bold underline underline-offset-4 transition-colors ${
                  item.imageUrl ? 'text-zinc-300 group-hover:text-white' : isBlueCard ? 'text-blue-200 group-hover:text-white' : 'text-zinc-500 group-hover:text-[#ff7614]'
                }`}>
                  {item.imageUrl ? `Full Story @ ${item.sourceName}` : item.sourceName}
                </p>
              </div>

            </a>
          );
        })}
      </div>

    </div>
  );
}