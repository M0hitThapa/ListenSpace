"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/hero-section";
import { useUser } from "@/user-context";
import { StreamVideo } from "@stream-io/video-react-sdk";

export default function Home() {
  const { client } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!client) {
      router.push("/");
    }
  }, [client, router]);



  return (
    <StreamVideo client={client}>
      <HeroSection />
    </StreamVideo>
  );
}       


