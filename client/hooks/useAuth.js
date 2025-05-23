"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ServerUrl } from "@/lib/urls";
import { getUserClient } from "@/lib/clientAuth";

/**
 * Custom React hook to enforce user authentication on client-side pages.
 * On mount, checks if a user is logged in via cookies; if not, redirects
 * the browser to the Google OAuth endpoint for login.
 *
 * @function useAuth
 * @returns {void}
 */
export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Retrieve the current user. Redirect if not authenticated
    getUserClient().then((user) => {
      if (!user) {
        router.push(`${ServerUrl}/auth/google`);
      }
    });
  }, [router]); // Dependency ensures router.push is available
}
