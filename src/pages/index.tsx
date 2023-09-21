import CommandMenu from "@/components/command-menu";
import Textarea from "@/components/textarea";
import { useCurrentThought } from "@/store";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const Thoughts = dynamic(() => import("@/components/thoughts"), {
  ssr: false,
});

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <Head>
        <title>Reflect</title>
      </Head>
      <main className="min-h-screen bg-background">
        <CommandMenu />
        <div className="container max-w-2xl mx-auto py-6 px-2 space-y-6">
          <Textarea value={value} setValue={setValue} />
          {/* <TextToSpeech /> */}
          <Thoughts />
        </div>
      </main>
    </>
  );
}
