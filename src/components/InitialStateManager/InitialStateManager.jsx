"use client";

import { addAuthHeaderToAxios } from "../../utils/apiClient";
import { getUser } from "../../api/authApi";
import { setUser } from "../../store/slices/userSlice";
import { getCookie } from "../../utils/cookieHandler";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const InitialStateManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user); // read from Redux
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

    const init = async () => {
      try {
        // ✅ First check cookies (fast, no API)
        const jwt = getCookie("jwt");
        const storedUser = getCookie("user");

        if (jwt) {
          addAuthHeaderToAxios(`Bearer ${jwt}`);
        }

        if (user) {
          // already in Redux → skip
          setChecked(true);
          return;
        }

        if (jwt && storedUser) {
          // If cookies exist, hydrate Redux
          dispatch(setUser({ user: JSON.parse(storedUser), token: jwt }));
          setChecked(true);
          return;
        }

        // 🚨 If no local user → hit API once (to verify session if needed)
        const data = await getUser();
        if (data?.user) {
          dispatch(setUser({ user: data.user, token: data.token }));
        } else if (!publicPages.includes(pathname)) {
          router.push("/login");
        }
      } catch {
        if (!publicPages.includes(pathname)) {
          router.push("/login");
        }
      } finally {
        setChecked(true);
      }
    };

    init();
  }, [pathname, router, dispatch, user]);

  if (!checked) return null;

  return null;
};

export default InitialStateManager;
