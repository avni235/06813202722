import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";
import { Grid } from "@mui/material";

interface Entry {
  url: string;
  shortcode: string;
  valid: string;
}

interface UrlFormProps {
  onAdd: (entries: Entry[]) => void;
}

export default function UrlForm({ onAdd }: UrlFormProps) {
  const [entries, setEntries] = useState<Entry[]>([{ url: "", shortcode: "", valid: "30" }]);

  // const addRow = () => {
  //   if (entries.length < 5) {
  //     setEntries([...entries, { url: "", shortcode: "", valid: "30" }]);
  //   }
  // };

  const change = (index: number, key: keyof Entry, value: string) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [key]: value };
    setEntries(updated);
  };

  const submit = () => {
    const validEntries = entries.filter((e) => e.url.match(/^https?:\/\/\S+$/));

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
        <Box key={index} mb={3}>
          <TextField
            placeholder="Enter Long Url"
            value={entry.url}
            onChange={(e) => change(index, "url", e.target.value)}
            fullWidth
            sx={{ backgroundColor: "#ddd", mb: 2 }}
          />
          <Grid container spacing={2}>
  <Grid  size={6}>
    <TextField
      placeholder="Shorten (optional)"
      value={entry.shortcode}
      onChange={(e) => change(index, "shortcode", e.target.value)}
      fullWidth
      sx={{ backgroundColor: "#ddd" }}
    />
  </Grid>
  <Grid size={6}>
    <TextField
      placeholder="Time Limit"
      type="number"
      value={entry.valid}
      onChange={(e) => change(index, "valid", e.target.value)}
      fullWidth
      sx={{ backgroundColor: "#ddd" }}
    />
  </Grid>
</Grid>
        </Box>
      ))}

      <Box display="flex" justifyContent="center" mt={2}>
  <Button
    onClick={submit}
    sx={{
      backgroundColor: "cyan",
      color: "black",
      textTransform: "none",
      "&:hover": { backgroundColor: "#00e5ff" }
    }}
  >
    Shorten
  </Button>
</Box>

    </Box>
  );
}
