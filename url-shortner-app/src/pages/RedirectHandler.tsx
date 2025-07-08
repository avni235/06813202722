import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

export default function RedirectHandler() {
  const { shortcode } = useParams<{ shortcode: string }>();

  useEffect(() => {
    if (!shortcode) return;

    const metaString = localStorage.getItem(`meta-${shortcode}`);

    if (metaString) {
      try {
        const meta = JSON.parse(metaString);
        const longUrl = meta.original;

        if (!longUrl) {
          Log({
            stack: "frontend",
            level: "error",
            package: "utils",
            message: `No long URL found in metadata for ${shortcode}`
          });
          return;
        }

        // Track click
        const click = {
          timestamp: new Date().toLocaleString(),
          source: document.referrer || "Direct",
          location: "India"
        };

        meta.clicks = meta.clicks || [];
        meta.clicks.push(click);
        localStorage.setItem(`meta-${shortcode}`, JSON.stringify(meta));

        Log({
          stack: "frontend",
          level: "info",
          package: "utils",
          message: `Redirecting ${shortcode} to ${longUrl}`
        });

        window.location.replace(longUrl);
      } catch (err) {
        Log({
          stack: "frontend",
          level: "error",
          package: "utils",
          message: `Failed to parse metadata for ${shortcode}`
        });
      }
    } else {
      Log({
        stack: "frontend",
        level: "error",
        package: "utils",
        message: `No meta found for shortcode: ${shortcode}`
      });
    }
  }, [shortcode]);

  return <div>Redirecting to your destination...</div>;
}
