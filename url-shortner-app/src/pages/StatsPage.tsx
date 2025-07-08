import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material"
import { Log } from "../../../LoggingMiddleware/src/utils/logger";
import { useNavigate } from "react-router-dom";

interface ClickData {
  timestamp: string
  source: string
  location: string
}

interface ShortURLData {
  original: string
  short: string
  createdAt: string
  expiresAt: string
  clicks: ClickData[]
}

export default function StatsPage() {
  const [urls, setUrls] = useState<ShortURLData[]>([])
  const navigate = useNavigate();


  useEffect(() => {
  Log({
    stack: "frontend",
    level: "info",
    package: "page",
    message: "Visited stats page"
  });

  const now = new Date().getTime();
  const keys = Object.keys(localStorage);
  const records: ShortURLData[] = [];

  keys.forEach((key) => {
    try {
      if (!key.startsWith("meta-")) return; // Only pick meta entries

      const val = localStorage.getItem(key);
      if (val?.startsWith("{")) {
        const parsed = JSON.parse(val) as ShortURLData;

        // Parse expiry
        const expiryTime = new Date(parsed.expiresAt).getTime();
        if (expiryTime > now) {
          records.push(parsed); // only keep valid (non-expired) entries
        }
      }
    } catch (err) {
      // Ignore invalid JSON
    }
  });

  setUrls(records);
}, []);


  return (
    <Box p={3} maxWidth="800px" mx="auto">
  <Box display="flex" justifyContent="flex-end" mb={2}>
    <Button
      onClick={() => navigate("/")}
      sx={{
        color: "black",
        textTransform: "none",
        "&:hover": { backgroundColor: "#00e5ff" },
      }}
    >
      ← Go to Home
    </Button>
  </Box>

  <Typography variant="h5" fontWeight="bold" mb={4}>
    URL Statistics
  </Typography>


  {urls.map((url, idx) => (
    <Box
      key={idx}
      sx={{
        backgroundColor: "#ddd",
        p: 3,
        borderRadius: 1,
        mb: 4,
      }}
    >
      <Typography fontWeight="bold" gutterBottom>
        Original URL:
      </Typography>
      <Typography mb={1}>{url.original}</Typography>

      <Typography fontWeight="bold">Shorten URL:</Typography>
      <Typography mb={1}>
        <a href={url.short} target="_blank" rel="noopener noreferrer">
          {url.short}
        </a>
      </Typography>

      <Typography fontWeight="bold">Expires at:</Typography>
      <Typography mb={2}>{url.expiresAt}</Typography>

      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(url.short)
            Log({
              stack: "frontend",
              level: "info",
              package: "component",
              message: `Copied ${url.short}`,
            })
          }}
          sx={{
            backgroundColor: "cyan",
            color: "black",
            textTransform: "none",
            "&:hover": { backgroundColor: "#00e5ff" }
          }}
        >
          Copy
        </Button>
      </Box>

      {url.clicks && url.clicks.length > 0 && (
        <Box mt={3}>
          <Typography fontWeight="bold" mb={1}>
            Click Details:
          </Typography>
          <Table size="small" sx={{ backgroundColor: "#eee" }}>
            <TableHead>
              <TableRow>
                <TableCell><b>Timestamp</b></TableCell>
                <TableCell><b>Source</b></TableCell>
                <TableCell><b>Location</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {url.clicks.map((click, i) => (
                <TableRow key={i}>
                  <TableCell>{click.timestamp}</TableCell>
                  <TableCell>{click.source}</TableCell>
                  <TableCell>{click.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  ))}
</Box>

  )
}
