"use client";

import React from "react";
import {
  ClipboardClock,
  Dock,
  FileCheck,
  ScrollText,
  TicketsPlane,
  University,
  WalletCards,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = [
  {
    icon: FileCheck,
    text: "Prepare documents",
    completed: true,
  },
  {
    icon: Dock,
    text: "Apply for APS",
    completed: true,
  },
  {
    icon: ScrollText,
    text: "Shortlist universities",
    completed: true,
  },
  {
    icon: University,
    text: "Receive admits",
    completed: true,
  },
  {
    icon: ClipboardClock,
    text: "Book visa slot",
    completed: false,
  },
  {
    icon: WalletCards,
    text: "Receive visa",
    completed: false,
  },
  {
    icon: TicketsPlane,
    text: "Fly to Germany",
    completed: false,
  },
];

interface progressBarProps {
    onApsClick: () => void;
    scrollToUniFinder: () => void;
};

export default function ProgressBar({onApsClick, scrollToUniFinder}: progressBarProps) {
  const handleOnClick = (stepText: string) => {
    if (stepText === "Apply for APS") {
      onApsClick();
    } else if (stepText === "Shortlist universities") {
      scrollToUniFinder();
    }
  };
  return (
    <>
      <div className="flex flex-col items-center text-center mt-20">
        <h1 className="text-4xl">
          Your complete Germany study journey — made simple.
        </h1>
        <p className="text-center mt-5 text-2xl text-gray-600">
          Your self-serve roadmap to studying in Germany
        </p>
      </div>

      <TooltipProvider>
        <div className="steps mt-30 mb-15 flex items-center justify-center flex-wrap">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-30 h-30 border-5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg
                      ${
                        step.completed
                          ? "border-[#ff7614]"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleOnClick(step.text)}
                    >
                      <Icon size={50} />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="top">
                    <p>{step.text}</p>
                  </TooltipContent>
                </Tooltip>

                {index !== steps.length - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      step.completed ? "bg-[#ff7614]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </TooltipProvider>

      <p className="text-center text-md text-gray-600 italic">
        Track your progress through each step — sign up to save your journey
      </p>
    </>
  );
}