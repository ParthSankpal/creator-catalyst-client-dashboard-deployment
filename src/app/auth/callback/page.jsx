"use client";

import { getUser } from "../../../api/authApi";
import { setCookie } from "../../../utils/cookieHandler";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addAuthHeaderToAxios } from "../../../utils/apiClient";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = params.get("jwt");
    const showOnboarding = params.get("show_onboarding");

    console.log(jwt, showOnboarding, "/onboarding");


    const handleLogin = async () => {
      if (jwt) {
        setLoading(true);
        setCookie("jwt", jwt, { expires: 7 });
        addAuthHeaderToAxios(`Bearer ${jwt}`);

        try {
          const res = await getUser();
          const userData = res?.data;

          if (userData) {
            setCookie(
              "user",
              JSON.stringify({
                id: userData.id,
                name: userData.user_name || userData.channel_name,
                email: userData.user_email,
                avatar: userData.profile_avatar
              }),
              { expires: 7 }
            );
          }
          const redirectTo =
            showOnboarding == 1 ? "/onboarding" : "/dashboard";
          console.log(redirectTo);

          router.push(redirectTo);

        } catch (err) {
          if (err.response?.status === 401) {
            console.error("Unauthorized: JWT invalid or expired");
          } else {
            console.error("Network/CORS error:", err);
          }
        } finally {
          setLoading(false);
        }
      } else {
        router.push("/login");
      }
    };

    handleLogin();
  }, [params, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-[#222222]">
      {loading && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-700 dark:text-gray-200 text-lg">
            Logging you in...
          </p>
        </div>
      )}
    </div>
  );
}
