"use client";

import {useRef} from "react";
import ProgressBar from "@/components/ui/progressBar";
import Tools from "@/components/ui/Tools";
import UniFinder from "./uniFinder";


export default function DashboardClient() {
    const apsRef = useRef<HTMLDivElement>(null);

    const scrollToAPS = () => {
        apsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
        <ProgressBar onApsClick={scrollToAPS} />
        <UniFinder />
        <Tools apsRef={apsRef} />
        </>
    );
}