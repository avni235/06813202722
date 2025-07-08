import { Card, CardContent, Typography, Button } from "@mui/material";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

interface UrlCardProps {
  original: string;
  short: string;
  expires: string;
}

export default function UrlCard({ original, short, expires }: UrlCardProps) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography>Original: {original}</Typography>
        <Typography>
          Shortened: <a href={short} target="_blank" rel="noopener noreferrer">{short}</a>
        </Typography>
        <Typography>Expires at: {expires}</Typography>

        <Button
          variant="outlined"
          onClick={() => {
            navigator.clipboard.writeText(short)
            Log({
              stack: "frontend",
              level: "info",
              package: "component",
              message: `Copied ${short}`,
            })
          }}
        >
          Copy
        </Button>
      </CardContent>
    </Card>
  )
}
