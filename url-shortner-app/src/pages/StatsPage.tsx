import { useEffect, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material"
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

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

  useEffect(() => {
    Log({
      stack: "frontend",
      level: "info",
      package: "page",
      message: "Visited stats page"
    })

    // Load data from localStorage
    const keys = Object.keys(localStorage)
    const records: ShortURLData[] = []

    keys.forEach((key) => {
      try {
        const val = localStorage.getItem(key)
        if (val?.startsWith("{")) {
          const parsed = JSON.parse(val) as ShortURLData
          records.push(parsed)
        }
      } catch (err) {
        // Ignore bad entries
      }
    })

    setUrls(records)
  }, [])

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {urls.map((url, idx) => (
        <Card key={idx} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{url.original}</Typography>
            <Typography>
              Short URL: <a href={url.short}>{url.short}</a>
            </Typography>
            <Typography>Created: {url.createdAt}</Typography>
            <Typography>Expires: {url.expiresAt}</Typography>
            <Typography>Total Clicks: {url.clicks?.length || 0}</Typography>

            {url.clicks && url.clicks.length > 0 && (
              <Table size="small" sx={{ mt: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Location</TableCell>
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
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
