"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Product } from "@/app/api/checkout/purchase/details/route";

interface orderPreview {
  productList: Product[];
  total: number;
}

export default function Home() {
  return <div>Hi!</div>;
}
