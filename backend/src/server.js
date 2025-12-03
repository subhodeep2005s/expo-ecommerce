import express from "express";
import { ENV } from "./config/env.js";
import path from "path";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

const __dirname = path.resolve();
app.use(clerkMiddleware());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json("OK");
});
// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(
        ` 🚀  Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`
      );
    });
  } catch (error) {
    console.error(`💥💥 Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
