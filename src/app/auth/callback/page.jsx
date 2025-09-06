"use client";

import { getUser } from "../../../api/authApi";
import { setCookie } from "../../../utils/cookieHandler";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addAuthHeaderToAxios } from "../../../utils/apiClient";

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = params.get("jwt");
    const user_id = params.get("user_id");
    const name = params.get("name");
    const email = params.get("email");

    console.log(jwt, user_id, name, email);

    const handleLogin = async () => {
      if (jwt) {
        // Save cookies
        setCookie("jwt", jwt, { expires: 7 });
        setCookie(
          "user",
          JSON.stringify({ id: user_id, name, email }),
          { expires: 7 }
        );

        // Set axios auth header
        addAuthHeaderToAxios(`Bearer ${jwt}`);

        // Fetch user data from backend
        try {
          const data = await getUser();
          console.log("Fetched user:", data);
          router.push("/dashboard");
        } catch (err) {
          if (err.response?.status === 401) {
            console.error("Unauthorized: JWT invalid or expired");
          } else {
            console.error("Network/CORS error:", err);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    handleLogin();
  }, [params, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#222222]">
      {loading && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-gray-700 dark:text-gray-200 text-lg">Logging you in...</p>
        </>
      )}
    </div>
  );
}
