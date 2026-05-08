// Server Component — NO 'use client' here.
// GitHub is an async RSC; all interactive client sections are in PageClient.
import { Suspense } from "react";
import { PageClient } from "@/components/PageClient";
import { GitHub } from "@/components/sections/GitHub";

export default function Home() {
  return (
    <PageClient
      githubSection={
        <Suspense
          fallback={
            <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-24 mb-10">
              <div className="h-[300px] rounded-2xl bg-white/30 animate-pulse" />
            </section>
          }
        >
          <GitHub username="aryaniitian" />
        </Suspense>
      }
    />
  );
}
