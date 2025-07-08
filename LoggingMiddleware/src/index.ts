import { Log } from "./utils/logger";

Log({
  stack: "frontend",
  level: "info",
  package: "component",
  message: "Login component loaded successfully"
});

Log({
  stack: "frontend",
  level: "error",
  package: "api",
  message: "Failed to fetch user profile data"
});
