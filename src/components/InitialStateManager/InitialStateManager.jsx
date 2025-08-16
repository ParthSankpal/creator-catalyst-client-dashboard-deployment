"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/api/authApi"; 
// import { useAppDispatch } from "@/store/hooks";
// import { setUser } from "@/store/slices/userSlice";

const InitialStateManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const publicPages = [
      "/privacy-policy",
      "/terms-conditions",
      "/recover-password",
      "/recover-password/[token]",
      "/signup",
      "/login",
    ];

    (async () => {
      try {
        const data = await getUser(); // calls backend -> reads session cookie
        if (data?.user) {
          // ✅ User is logged in
          // dispatch(setUser(data.user));
        } else {
          // ❌ No valid session
          if (!publicPages.includes(pathname)) {
            router.push("/login");
          }
        }
      } catch {
        // ❌ getUser failed
        if (!publicPages.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setChecked(true);
      }
    })();
  }, [pathname, router]);

  // Optional: return null until checked
  if (!checked) return null;

  return null;
};

export default InitialStateManager;
