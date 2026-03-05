import type { Request, Response } from "express";
import { pool } from "../db";

export async function healthCheck(_req: Request, res: Response) {
  let dbStatus = "disconnected";
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }

  const uptimeSeconds = process.uptime();
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  const uptime = `${hours}h ${minutes}m ${seconds}s`;

  res.json({
    status: dbStatus === "connected" ? "ok" : "degraded",
    uptime,
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
}
