"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import CrmDashboardClient from "@/components/crm/CrmDashboardClient";
import { firebaseAuth } from "@/lib/firebase/client";

export default function CrmPage() {
  const router = useRouter();

  useEffect(() => {
    if (!firebaseAuth) return;
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) router.push("/crm/login");
    });
    return () => unsub();
  }, [router]);

  return <CrmDashboardClient />;
}

