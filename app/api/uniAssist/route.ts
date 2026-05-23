// src/app/api/uni-assist/route.ts
import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache data for exactly 24 hours so we don't spam their server

export async function GET() {
  try {
    const response = await fetch("https://www.uni-assist.de/en/how-to-apply/plan-your-application/deadlines-processing-time/", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    
    const html = await response.text();

    // Defensive default fallbacks matching their standard benchmarks
    let data = [
      { id: "asia-oceania", name: "Asia, North America & Oceania", minWeeks: 5, maxWeeks: 6 },
      { id: "cee-turkey", name: "Central & Eastern Europe, Turkey", minWeeks: 4, maxWeeks: 5 },
      { id: "we-latam", name: "Western Europe & Latin America", minWeeks: 4, maxWeeks: 5 },
      { id: "africa-me", name: "Africa, Middle East & Iran", minWeeks: 4, maxWeeks: 5 }
    ];

    // Regular expressions looking exactly for their updated text structure: "X-Y weeks"
    const regexes = {
      "asia-oceania": /Asia, North America and Oceania:\s*(\d+)-(\d+)\s*weeks/i,
      "cee-turkey": /Central and Eastern Europe, Turkey:\s*(\d+)-(\d+)\s*weeks/i,
      "we-latam": /Western Europe and Latin America:\s*(\d+)-(\d+)\s*weeks/i,
      "africa-me": /Africa, Middle East and Iran:\s*(\d+)-(\d+)\s*weeks/i
    };

    // Parse out the numbers directly from the live HTML content text safely
    Object.entries(regexes).forEach(([id, regex]) => {
      const match = html.match(regex);
      if (match) {
        const item = data.find(r => r.id === id);
        if (item) {
          item.minWeeks = parseInt(match[1], 10);
          item.maxWeeks = parseInt(match[2], 10);
        }
      }
    });

    return NextResponse.json({ success: true, regions: data });
  } catch (error) {
    // If uni-assist goes down or changes layout entirely, fail gracefully with base backups
    return NextResponse.json({ success: false, error: "Using baseline backups" }, { status: 200 });
  }
}