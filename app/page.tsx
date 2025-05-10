"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "@/app/api/checkout/purchase/details/route";

import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // replace() navigates without adding a new entry to the history stack
    router.replace("/purchase");
    // if you want the user to be able to click “Back” and return here, use push() instead:
    // router.push('/another-page')
  }, [router]);

  // You can render nothing, a spinner, or an SEO-friendly message
  return null;
}
