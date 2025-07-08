type Stack = "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

interface LogParams {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhdm5lZXQuZGhpbmdyYTIzNUBnbWFpbC5jb20iLCJleHAiOjE3NTE5NTUzODAsImlhdCI6MTc1MTk1NDQ4MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImM2ZDBkODFhLWJmZDktNGMxMy04OTBmLWU2MjgzMGE0NTcyOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImF2bmVldCBrYXVyIGRoaW5ncmEiLCJzdWIiOiJiNjNmYzBjOC1iYWEwLTRiOTItOWVjYS1mZGM2NmU0MTg5NTgifSwiZW1haWwiOiJhdm5lZXQuZGhpbmdyYTIzNUBnbWFpbC5jb20iLCJuYW1lIjoiYXZuZWV0IGthdXIgZGhpbmdyYSIsInJvbGxObyI6IjA2ODEzMjAyNzIyIiwiYWNjZXNzQ29kZSI6IlZQcHNtVCIsImNsaWVudElEIjoiYjYzZmMwYzgtYmFhMC00YjkyLTllY2EtZmRjNjZlNDE4OTU4IiwiY2xpZW50U2VjcmV0IjoiVVRhaHJOa1hWS3F5Z3BaUCJ9.TUyVWWe8XrZfog3fSVnGny5GG_9vDfK2G9yQBicm2f4"; 
const API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log({ stack, level, package: pkg, message }: LogParams): Promise<void> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": AUTH_TOKEN,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const text = await res.text();

    try {
      const json = JSON.parse(text);
      console.log("Log successful:", json);
    } catch {
      console.log("Log response (non-JSON):", text);
    }
  } catch (err) {
    console.error("Logging failed:", err);
  }
}
