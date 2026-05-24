"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Calculator, ChartNoAxesCombined, Globe, Clock, RefreshCw, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import GradeCalculator from "./gradeCalculator";

interface toolsProps {
    apsRef: RefObject<HTMLDivElement | null>;
}

const BASELINE_REGIONS = [
  { id: "asia-oceania", name: "Asia, North America & Oceania", minWeeks: 5, maxWeeks: 6 },
  { id: "cee-turkey", name: "Central & Eastern Europe, Turkey", minWeeks: 4, maxWeeks: 5 },
  { id: "we-latam", name: "Western Europe & Latin America", minWeeks: 4, maxWeeks: 5 },
  { id: "africa-me", name: "Africa, Middle East & Iran", minWeeks: 4, maxWeeks: 5 }
];

export default function Tools({ apsRef }: toolsProps) {

    const [regions, setRegions] = useState(BASELINE_REGIONS);
  const [selectedRegionId, setSelectedRegionId] = useState("asia-oceania");
  const [isLive, setIsLive] = useState(false);

  // Find the currently active region object from state
  const selectedRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  // Fetch the actual scraped dynamic data instantly on layout mount
  useEffect(() => {
    async function syncUniAssistData() {
      try {
        const res = await fetch("/api/uni-assist");
        const json = await res.json();
        if (json.success && json.regions) {
          setRegions(json.regions);
          setIsLive(true); // Changes badge color to show successful live connection
        }
      } catch (err) {
        console.warn("Failed syncing uni-assist live data, utilizing core defaults.");
      }
    }
    syncUniAssistData();
  }, []);

    const currentMonth = new Date().getMonth();
  const isHighVolumeSeason = currentMonth >= 4 && currentMonth <= 6;


    //aps
    const currentMonthIndex = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthName = months[currentMonthIndex];
    const isCurrentMonthPeak = ['May', 'Jun', 'Jul'].includes(currentMonthName);
    const isCurrentMonthMid = ['Feb', 'Mar', 'Apr', 'Aug'].includes(currentMonthName);
    
    let badgeText = "Off-Peak Speed";
    let badgeStyle = "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
    if (isCurrentMonthPeak) {
        badgeText = "Peak Season Now";
        badgeStyle = "bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 animate-pulse";
    } else if (isCurrentMonthMid) {
        badgeText = "Moderate Backlog";
        badgeStyle = "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
    }

    return (
        /* Added scroll-mt-24 here so it doesn't get covered by your NavBar when scrolling down */
        <div ref={apsRef} className="flex flex-wrap justify-center gap-8 p-6 scroll-mt-24">
            
            {/* CARD 1: German Grade Calculator */}
            {/* Changed h-120 to min-h-[30rem] to prevent layout squishing */}
            <GradeCalculator />

            {/* CARD 2: Track APS Processing Trends */}
            <Card id="apsTrends" className="max-w-xl w-full min-h-[30rem] flex flex-col justify-between p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
                <CardHeader className="p-0">
                    <div className="flex items-center gap-x-2">
                        <CardTitle className="text-2xl">Track APS processing trends</CardTitle>
                        <ChartNoAxesCombined className="text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <CardDescription className="text-lg text-gray-600 mt-1">
                        "See peak application periods and estimate your waiting time."
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="p-0 mt-6 flex-1 flex flex-col justify-center">
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 w-full">
    <div className="flex justify-between items-center mb-3">
        <h5 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            2026 Processing Speed Estimate
        </h5>
        
        {/* DYNAMIC BADGE */}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${badgeStyle}`}>
            {badgeText}
        </span>
    </div>

    {/* Months Track Grid Layout */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 text-center text-xs">
                    {months.map((month, index) => {
                        const isPeak = ['May', 'Jun', 'Jul'].includes(month);
                        const isMid = ['Feb', 'Mar', 'Apr', 'Aug'].includes(month);
                        
                        // Highlight the exact current month so users know where they stand
                        const isThisMonth = index === currentMonthIndex;
                        
                        return (
                            <div 
                                key={month} 
                                className={`p-2 rounded-lg border font-semibold transition-all duration-300 ${
                                    isPeak 
                                        ? 'bg-rose-500/10 dark:bg-rose-950/30 border-rose-500/50 dark:border-rose-800 text-rose-600 dark:text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.1)]' 
                                        : isMid
                                        ? 'bg-amber-50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-500'
                                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'
                                } ${
                                    /* Subtle styling bonus: rings the current month box */
                                    isThisMonth ? 'ring-2 ring-[#ff7614] ring-offset-2 dark:ring-offset-zinc-950 scale-105 shadow-[0_0_15px_rgba(255,118,20,0.25)] animate-none' : ''
                                }`}
                            >
                                {month}
                            </div>
                        );
                    })}
                </div>
            </div>
                </CardContent>
            </Card>

            {/* CARD 3: Fully Dynamic Scraped uni-assist Monitor */}
      <Card id="uniAssistMonitor" className="max-w-xl w-full min-h-[30rem] flex flex-col justify-between p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
        
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <CardTitle className="text-2xl">uni-assist Queue Live</CardTitle>
              <Globe className="text-zinc-700 dark:text-zinc-300 w-5 h-5" />
            </div>
            
            {/* The Badge color shifts automatically from gray to live emerald green when fetched */}
            <Badge variant="outline" className={`flex items-center gap-1 text-[11px] transition-colors duration-500 ${
              isLive 
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400" 
                : "bg-zinc-50 text-zinc-400 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            }`}>
              <RefreshCw className={`w-3 h-3 ${isLive ? "" : "animate-spin text-orange-500"}`} />
              <span>{isLive ? "Live Verified" : "Syncing..."}</span>
            </Badge>
          </div>
          <CardDescription className="text-lg text-gray-600 mt-1">
            "Real-time evaluation speeds sourced directly from current official verification batches."
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 mt-6 flex flex-col space-y-5 w-full flex-1 justify-center">
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Where did you obtain your educational certificates?
            </label>
            <select 
              value={selectedRegionId}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614] bg-white text-zinc-900 font-medium text-sm transition-shadow cursor-pointer"
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 w-full flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Current Waiting Target
              </span>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-white flex items-baseline gap-1">
                {selectedRegion.minWeeks}–{selectedRegion.maxWeeks}
                <span className="text-sm font-medium text-zinc-500">weeks</span>
              </h4>
            </div>
            
            <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
              <Clock className="w-6 h-6 text-[#ff7614]" />
            </div>
          </div>

          <div className="flex gap-3 items-start p-4 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 dark:border-amber-900/40 rounded-xl text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#ff7614] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Official Recommendation:</p>
              <p>
                Uni-assist processes submissions strictly in order of arrival. They recommend applying **at least 8 weeks before** your university deadline expires to guarantee time to fix missing documents.
              </p>
              {isHighVolumeSeason && (
                <p className="text-rose-600 dark:text-rose-400 font-medium animate-pulse mt-1">
                  ⚠️ Note: Current admissions window is inside the high-volume cycle. Expect closer to the max evaluation margins.
                </p>
              )}
            </div>
          </div>

        </CardContent>
      </Card>

        </div>
    );
}