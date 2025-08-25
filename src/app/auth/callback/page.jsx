"use client";

import { setCookie } from "../../../utils/cookieHandler";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "../../../api/authApi";

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = params.get("jwt");

    if (jwt) {
      setCookie("jwt", jwt, { expires: 7 });

      getUser()
        .then((res) => {
          if (res?.status === "success") {
            const user = res.data;
            setCookie("user", JSON.stringify(user), { expires: 7 });
            router.push("/dashboard");
          } else {
            console.error("Error fetching user:", res?.message);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [params, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
            Logging you in...
          </p>
        </div>
      </div>
    );
  }

  return <p className="text-center mt-10">Redirecting...</p>;
}
