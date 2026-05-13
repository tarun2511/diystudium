"use client";
import React from "react";
import Image from "next/image";

export default function ExploreUnis() {
  return (
    <div className="flex flex-col items-center mt-20 h-screen font-sans dark:bg-black">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">
        Explore Universities
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Discover your ideal university in Germany based on your profile.
      </p>
      <div className="flex gap-8 mt-10">
      <div className="relative h-48 w-72 rounded-xl overflow-hidden shadow-lg border border-white/20 hover:scale-110 transition-transform">
        <Image src="/uni1.jpg" alt="TU Munich" fill className="object-cover" />
        {/* The Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs font-semibold text-[#ff7614]">MUNICH</p>
            <h4 className="font-bold">TU Munich</h4>
        </div>
       </div>
       <div className="relative h-48 w-72 rounded-xl overflow-hidden shadow-lg border border-white/20 hover:scale-110 transition-transform">
        <Image src="/uni2.jpg" alt="Humboldt Uni zu Berlin" fill className="object-cover" />
        {/* The Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs font-semibold text-[#ff7614]">Berlin</p>
            <h4 className="font-bold">Humbodt Uni zu Berlin</h4>
        </div>
       </div>

       <div className="relative h-48 w-72 rounded-xl overflow-hidden shadow-lg border border-white/20 hover:scale-110 transition-transform">
        <Image src="/uni3.jpg" alt="LUH" fill className="object-cover" />
        {/* The Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs font-semibold text-[#ff7614]">Hannover</p>
            <h4 className="font-bold">Leibniz University Hannover (LUH)</h4>
        </div>
       </div>
       </div>
    </div>
  );
}