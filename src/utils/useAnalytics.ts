import { useEffect } from "react";

export function useAnalytics(path: string) {
  useEffect(() => {
    fetch("/api/analytics", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    }).then(() => console.log("Log complete"));
  }, []);
}
