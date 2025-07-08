import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

export default function RedirectHandler() {
  const { shortcode } = useParams<{ shortcode: string }>();

  useEffect(() => {
    if (!shortcode) return;

    const longUrl = localStorage.getItem(shortcode);

    if (longUrl) {
      Log({
        stack: "frontend",
        level: "info",
        package: "utils",
        message: `Redirected ${shortcode} to ${longUrl}`
      });
      window.location.replace(longUrl); // ✅ force redirect outside SPA
    } else {
      Log({
        stack: "frontend",
        level: "error",
        package: "utils",
        message: `No mapping found for ${shortcode}`
      });
      // Redirect back to home or error page
      window.location.replace("/");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
}
