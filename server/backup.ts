import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { logger } from "./logger";

const BACKUP_DIR = path.resolve("backups");
const MAX_BACKUPS = 7;

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${mo}-${d}-${h}${mi}${s}`;
}

export async function performBackup(): Promise<{ success: boolean; filename?: string; error?: string }> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return { success: false, error: "DATABASE_URL not set" };
  }

  ensureBackupDir();

  const timestamp = formatDate(new Date());
  const filename = `backup-${timestamp}.sql.gz`;
  const filepath = path.join(BACKUP_DIR, filename);

  try {
    execSync(`pg_dump "${dbUrl}" | gzip > "${filepath}"`, {
      timeout: 120000,
      stdio: ["pipe", "pipe", "pipe"],
    });

    const stats = fs.statSync(filepath);
    if (stats.size === 0) {
      fs.unlinkSync(filepath);
      logger.error("Backup file was empty — removing");
      return { success: false, error: "Backup produced empty file" };
    }

    logger.info({ filename, sizeBytes: stats.size }, "Database backup completed");

    await cleanOldBackups();

    return { success: true, filename };
  } catch (err: any) {
    logger.error({ err: err.message }, "Database backup failed");
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    return { success: false, error: err.message };
  }
}

async function cleanOldBackups() {
  ensureBackupDir();

  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith("backup-") && f.endsWith(".sql.gz"))
    .sort()
    .reverse();

  if (files.length > MAX_BACKUPS) {
    const toDelete = files.slice(MAX_BACKUPS);
    for (const file of toDelete) {
      const filepath = path.join(BACKUP_DIR, file);
      fs.unlinkSync(filepath);
      logger.info({ file }, "Deleted old backup");
    }
  }
}

let backupInterval: ReturnType<typeof setInterval> | null = null;

export function startBackupSchedule() {
  const DAILY_MS = 24 * 60 * 60 * 1000;

  backupInterval = setInterval(async () => {
    logger.info("Starting scheduled daily backup");
    await performBackup();
  }, DAILY_MS);

  logger.info("Backup scheduler started (daily)");
}

export function stopBackupSchedule() {
  if (backupInterval) {
    clearInterval(backupInterval);
    backupInterval = null;
  }
}
