"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "../../utils/cookieHandler"; 

export default function AuthCallback() {
  const params = useSearchParams();
  const router = useRouter();

  
  useEffect(() => {
    const jwt = params.get("jwt");
    const user_id = params.get("user_id");
    const name = params.get("name");
    const email = params.get("email");
    
    console.log(jwt, user_id,name,email);
    if (jwt) {
      setCookie("jwt", jwt, { expires: 7 });
      setCookie("user", JSON.stringify({ id: user_id, name, email }), { expires: 7 });

      router.push("/dashboard");
    }
  }, [params, router]);

  return <p>Logging you in...</p>;
}
