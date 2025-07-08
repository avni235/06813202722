import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UrlForm from "../components/UrlForm";
import UrlCard from "../components/UrlCard";
import { useState } from "react";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

interface Shorted {
  original: string;
  short: string;
  expires: string;
}

export default function ShortenerPage() {
  const [results, set] = useState<Shorted[]>([]);
  const navigate = useNavigate();

  const handleAdd = async (_entries: any[]) => {
    const res: Shorted[] = [];

    _entries.forEach((e) => {
      const shortcode = e.shortcode || Math.random().toString(36).substr(2, 5);
      const shortUrl = `${window.location.origin}/${shortcode}`;
      const expiresAt = new Date(Date.now() + (parseInt(e.valid) || 30) * 60000);
      const createdAt = new Date();

      localStorage.setItem(shortcode, e.url);
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

    set(res);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#e0e0e0", color: "black" , marginBottom: "20px"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            SHORTEN
          </Typography>
          <Button onClick={() => navigate("/stats")} sx={{ color: "black", textTransform: "none" }}>
            Check Stats
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <UrlForm onAdd={handleAdd} />
        <Box mt={4}>
          {results.map((r, i) => (
            <UrlCard key={i} {...r} />
          ))}
        </Box>
      </Box>
    </>
  );
}
