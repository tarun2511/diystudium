"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Calculator, Award, Info, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function gradeCalculator() {
  const [minPass, setMinPass] = useState("");
  const [maxGrade, setMaxGrade] = useState("");
  const [currentGrade, setCurrentGrade] = useState("");
  const [germanGrade, setGermanGrade] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateGrade = () => {
    setError("");
    setGermanGrade(null);

    const pMin = parseFloat(minPass);
    const pMax = parseFloat(maxGrade);
    const pCurrent = parseFloat(currentGrade);

    if (isNaN(pMin) || isNaN(pMax) || isNaN(pCurrent)) {
      setError("Please fill in all three fields with valid numbers.");
      return;
    }
    if (pMin >= pMax) {
      setError("Maximum grade must be higher than the passing grade.");
      return;
    }
    if (pCurrent < pMin || pCurrent > pMax) {
      setError("Your grade must be between the minimum pass and maximum score.");
      return;
    }

    // Official Bavarian Formula
    let result = 1 + 3 * ((pMax - pCurrent) / (pMax - pMin));

    if (result < 1.0) result = 1.0;

    // Rounded to exactly 1 decimal place matching uni-assist standard
    setGermanGrade(Math.round(result * 10) / 10);
  };

  return (
    <Card id="gradeCalculator" className="relative max-w-xl w-full min-h-[30rem] flex flex-col justify-between p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
      <Badge className="bg-[#ff7614] hover:bg-[#ff7614] absolute top-6 right-6">Free</Badge>
      
      <CardHeader className="p-0">
        <div className="flex items-center gap-x-2">
          <CardTitle className="text-2xl">German Grade Calculator</CardTitle>
          <Calculator className="text-zinc-700 dark:text-zinc-300 w-5 h-5" />
        </div>
        <CardDescription className="text-lg text-gray-600 mt-1">
          Grade Conversion using the Bavarian Formula
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 p-0 mt-6 flex-grow justify-center">
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Minimum Passing Grade</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 4.0 or 40"
            value={minPass}
            onChange={(e) => setMinPass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614] bg-white/50 text-zinc-900 font-medium text-sm"
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Maximum Grade</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 10.0 or 100"
            value={maxGrade}
            onChange={(e) => setMaxGrade(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614] bg-white/50 text-zinc-900 font-medium text-sm"
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Current Overall Grade</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 7.5 or 82"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7614] bg-white/50 text-zinc-900 font-medium text-sm"
          />
        </div>

        {error && (
          <p className="text-xs font-semibold text-rose-500 ml-1 animate-pulse">
            ⚠️ {error}
          </p>
        )}
        
        <Button 
          onClick={calculateGrade}
          className="w-full bg-[#ff7614] text-white hover:bg-[#e66a12] border-none hover:cursor-pointer transition-colors mt-2 font-semibold h-10"
        >
          Calculate German GPA
        </Button>

        {/* Dynamic Result Panel */}
        {germanGrade !== null && (
          <div className="space-y-3 mt-4 transition-all animate-in fade-in duration-300">
            
            {/* Core Grade Display */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Uni-Assist Target Estimate
                </span>
                <h4 className="text-3xl font-black text-zinc-900 dark:text-white flex items-baseline gap-1.5">
                  {germanGrade.toFixed(1)}
                  <span className="text-sm font-medium text-zinc-500">
                    {germanGrade <= 1.5 ? "Sehr Gut (Excellent)" : germanGrade <= 2.5 ? "Gut (Good)" : "Befriedigend (Satisfactory)"}
                  </span>
                </h4>
              </div>
              <div className="p-2.5 bg-white border border-emerald-500/20 rounded-xl shadow-sm text-emerald-500">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Smart Admission Context Insight Block */}
            {germanGrade > 2.5 ? (
              // Warning box if grade is worse than 2.5
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex gap-3 items-start text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">Competitive Cutoff Advisory</p>
                  <p>
                    Your calculated score is above the strict <span className="font-semibold text-zinc-900 dark:text-white">2.5 barrier</span> enforced by high-demand NC (Numerus Clausus) Master's programs at institutions like TUM, RWTH Aachen, and Stuttgart.
                  </p>
                  <p className="text-[#ff7614] font-medium">
                    💡 Tip: Prioritize non-NC programs or universities that explicitly factor in test scores (like GRE/Gate) or interview stages to offset GPA weights.
                  </p>
                </div>
              </div>
            ) : (
              // Success notice if grade is equal to or better than 2.5
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex gap-3 items-start text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">Excellent Standing</p>
                  <p>
                    Great news! Your GPA sits safely within the <span className="font-semibold text-zinc-900 dark:text-white">≤ 2.5 profile threshold</span>. This unlocks clearance eligibility for almost all competitive technical and public business Master's streams across Germany.
                  </p>
                </div>
              </div>
            )}

          </div>
        )}
      </CardContent>
    </Card>
  );
}