import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = (redirectTo = "/auth/login") => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);

  return { isAuthenticated: !!Cookies.get("token") };
};
