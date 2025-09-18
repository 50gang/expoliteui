'use client'

import UnAuthorizedPage from "@/components/guard/unauthorize.guard";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <UnAuthorizedPage/>
    {children}
    </>
  );
}
