import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 🧭 Import navigate
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

interface Entry {
  url: string;
  shortcode: string;
  valid: string;
}

interface UrlFormProps {
  onAdd: (entries: Entry[]) => void;
}

export default function UrlForm({ onAdd }: UrlFormProps) {
  const [entries, setEntries] = useState<Entry[]>([
    { url: "", shortcode: "", valid: "30" }
  ]);

  const navigate = useNavigate(); // 🧭 Hook for redirection

  const addRow = () => {
    if (entries.length < 5) {
      setEntries([...entries, { url: "", shortcode: "", valid: "30" }]);
    }
  };

  const change = (
    index: number,
    key: keyof Entry,
    value: string
  ) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [key]: value };
    setEntries(updated);
  };

  const submit = () => {
    const validEntries = entries.filter((e) =>
      e.url.match(/^https?:\/\/\S+$/)
    );

    Log({
      stack: "frontend",
      level: "info",
      package: "component",
      message: `Submitting ${validEntries.length} URLs`
    });

    onAdd(validEntries);
  };

  return (
    <Box>
      {entries.map((entry, index) => (
        <Box key={index} mb={2}>
          <TextField
            label="Long URL"
            value={entry.url}
            onChange={(e) => change(index, "url", e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Shortcode (opt)"
            value={entry.shortcode}
            onChange={(e) => change(index, "shortcode", e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Validity (min)"
            type="number"
            value={entry.valid}
            onChange={(e) => change(index, "valid", e.target.value)}
          />
        </Box>
      ))}

      <Button onClick={submit} variant="contained" sx={{ mr: 2 }}>
        Shorten
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/stats")}
      >
        Go to Stats Page
      </Button>
    </Box>
  );
}
