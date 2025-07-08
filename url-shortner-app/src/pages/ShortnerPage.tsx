import { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlCard from "../components/UrlCard";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

interface Shorted { original:string; short:string; expires:string; }

export default function ShortenerPage(){
  const [results, set] = useState<Shorted[]>([])

  const handleAdd = async (_entries: any[]) => {
  const res: Shorted[] = [];

  _entries.forEach((e) => {
    const shortcode = e.shortcode || Math.random().toString(36).substr(2, 5);
    const shortUrl = `${window.location.origin}/${shortcode}`;
    const expiresAt = new Date(Date.now() + (parseInt(e.valid) || 30) * 60000);
    const createdAt = new Date();

    // Save for redirection
    localStorage.setItem(shortcode, e.url); // optional, but helpful fallback

    // Save metadata
    const meta = {
      original: e.url,
      short: shortUrl,
      shortCode: shortcode,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      clicks: []
    };
    localStorage.setItem(`meta-${shortcode}`, JSON.stringify(meta));

    res.push({
      original: e.url,
      short: shortUrl,
      expires: expiresAt.toLocaleString()
    });

    Log({
      stack: "frontend",
      level: "info",
      package: "api",
      message: `Created short URL ${shortUrl} -> ${e.url}`
    });
  });

  set(res); // ✅ Show cards
};


  return (
    <div>
      <UrlForm onAdd={handleAdd}/>
      {results.map((r,i)=><UrlCard key={i} {...r}/>)}
    </div>
  )
}
