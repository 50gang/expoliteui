"use client";

import React from "react";

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>; // ✅
}


// export default function QueryProvider({ children }: { children: React.ReactNode }) {
//   const [queryClient] = React.useState(() => new QueryClient());
//   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>; // ✅
// }
// No extra {} around children
// This ensures that the children are passed directly to the QueryClientProvider without unnecessary wrapping.