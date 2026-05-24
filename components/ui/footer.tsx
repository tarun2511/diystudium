"use client";
import Link from "next/link";
import { GraduationCap, Globe } from "lucide-react";
import { Button } from "./button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleToolClick = (toolId: string) => {
    const element = document.getElementById(toolId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              <GraduationCap className="h-6 w-6 text-[#ff7614]" />
              <span>DE-Dash</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
              Simplifying German university admissions with real-time analytics, grade calculators, and live tracking monitors.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Tools</h4>
            <button className="text-sm text-zinc-600 text-left dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors hover:cursor-pointer" onClick={() => handleToolClick("gradeCalculator")}>
              Bavarian Grade Calc
            </button>
            <button className="text-sm text-zinc-600 text-left dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors hover:cursor-pointer" onClick={() => handleToolClick("apsTrends")}>
              APS Timeline Track
            </button>
            <button className="text-sm text-zinc-600 text-left dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors hover:cursor-pointer" onClick={() => handleToolClick("uniAssistMonitor")}>
              uni-assist Monitor
            </button>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Resources</h4>
            <Link href="https://www.uni-assist.de" target="_blank" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors">Official uni-assist</Link>
            <Link href="https://www.daad.de" target="_blank" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors">DAAD Course Finder</Link>
            <Link href="/privacy" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-[#ff7614] dark:hover:text-[#ff7614] transition-colors">Privacy Policy</Link>
          </div>

          {/* Stay Updated Column */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Disclaimer</h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              DE-Dash is an independent structural analytics dashboard. We are not officially affiliated with DAAD, APS India, or uni-assist.
            </p>
          </div>

        </div>

        <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {currentYear} DE-Dash. Built with passion for international students.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {/* <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <GitHub className="h-4 w-4" />
            </Link> */}
            <Link href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Globe className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}