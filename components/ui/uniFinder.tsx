import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./button";
import Image from "next/image";

export default function UniFinder() {
  return (
    <div className="flex justify-around items-center mt-20 mb-20 h-200 bg-[linear-gradient(315deg,_#F7A959,_#F45707)]">
        {/* <div className="flex flex-col">
        <p className="text-4xl font-bold">Find the perfect university for your studies in Germany.</p>
        <p className="text-lg text-gray-600 mb-8"></p>
        <input
            type="text"
            placeholder="Search for universities..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
        />
        </div>
         <Image src="/uni1.jpg" alt="University Finder" width={800} height={200} className="rounded-lg" /> */}
      <Card className="max-w-xl w-300 h-100 justify-center shadow-[0_20px_50px_rgba(180,60,0,0.3)] bg-white/90 backdrop-blur-md p-10">
      <CardHeader>
        <CardTitle className="text-2xl mb-4 flex">Find University<Image src="/icons/german-flag.png" width={28} height={28} alt="University Finder" className="rounded-lg ml-2" /></CardTitle>
        <CardDescription>
          <p>Find the perfect university for your studies in Germany.</p>
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-600 mb-8"></p>
        <input
            type="text"
            placeholder="Search for universities..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
        />
        </CardContent>
      </Card>
      <div className="space-y-8">
        <h1 className="text-6xl font-bold">Stop opening 20 tabs.</h1>
        <p className="text-orange-50">We organize your entire study abroad process.</p>
        <p>From university search to visa approvals — track everything in one journey.</p>
      </div>
    </div>
  );
}