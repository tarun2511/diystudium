"use client";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { ArrowUpIcon, Calculator, ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefObject } from "react";

interface toolsProps {
    apsRef: RefObject<HTMLDivElement | null>;
};

export default function Tools({apsRef}: toolsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-8 p-6">
            <Card className="relative max-w-xl w-full h-120 justify-center p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
                <Badge className="bg-[#ff7614] absolute top-6 right-6">Free</Badge>
                <CardHeader>
                    <div className="flex items-center gap-x-2">
                    <CardTitle className="text-2xl">German Grade Calculator</CardTitle>
                    <Calculator />
                    </div>
                    <CardDescription>
                    <p className="text-lg text-gray-600">"Grade Conversion using the Bavarian Formula"</p>
                    </CardDescription>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                    <p className="text-lg text-gray-600"></p>
                    <label className="text-sm font-medium text-gray-700 ml-1">Minimum Passing Grade</label>
                    <input
                        type="text"
                        placeholder="e.g. 8.5"
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
                    />
                    <label className="text-sm font-medium text-gray-700 ml-1">Maximum Grade</label>
                    <input
                        type="text"
                        placeholder="e.g. 10.0"
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
                    />
                    <label className="text-sm font-medium text-gray-700 ml-1">Current Overall Grade</label>
                    <input
                        type="text"
                        placeholder="e.g. 9.0"
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
                    />
                    <Button variant="outline" className="w-full bg-[#ff7614] text-white hover:bg-[#e66a12] border-none">Calculate</Button>
                    </CardContent>
            </Card>

            <Card ref={apsRef} className="max-w-xl w-full h-120 justify-center p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
                <CardHeader>
                    <div className="flex items-center gap-x-2">
                    <CardTitle className="text-2xl">Track APS processing trends</CardTitle>
                    <ChartNoAxesCombined />
                    </div>
                    <CardDescription>
                    <p className="text-lg text-gray-600">"See peak application periods and estimate your waiting time."</p>
                    </CardDescription>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-gray-600"></p>
                    <input
                        type="text"
                        placeholder="Search for universities..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614]"
                    />
                    </CardContent>
            </Card>
        </div>
    )

}