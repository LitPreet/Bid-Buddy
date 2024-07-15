"use client";
import "@knocklabs/react/dist/index.css";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import { useSession } from "next-auth/react";

import { ReactNode } from "react";

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const session = useSession();

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
      userId={session?.data?.user?.id ?? ""}
    >
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID as string}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}