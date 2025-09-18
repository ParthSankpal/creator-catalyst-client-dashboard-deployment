"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCookie } from "../../utils/cookieHandler";

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const jwt = params.get("jwt");
    const name = params.get("name");
    const email = params.get("email");
    const showOnboarding = params.get("show_onboarding");

    console.log(jwt, name, email, showOnboarding);

    if (jwt) {
      // Save user session in cookies
      setCookie("jwt", jwt, { expires: 7 });
      setCookie(
        "user",
        JSON.stringify({ id: user_id, name, email }),
        { expires: 7 }
      );

      // Redirect after small delay so cookies are set
      const redirectTo =
        showOnboarding === "1" ? "/onboarding" : "/dashboard";

      router.push(redirectTo);
    }

    // ✅ stop loading after handling
    setLoading(false);
  }, [params, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Logging you in...</p>
      </div>
    );
  }

  return null;
}
