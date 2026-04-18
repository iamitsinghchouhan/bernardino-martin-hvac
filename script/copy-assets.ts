import { mkdir, readdir, copyFile } from "fs/promises";
import path from "path";

const videoSources = [
  path.resolve("public", "videos"),
  path.resolve("attached_assets", "generated_videos"),
];

const videoDestination = path.resolve("dist", "public", "videos");

async function copyMp4Files(sourceDir: string, destinationDir: string) {
  let entries: string[] = [];

  try {
    entries = await readdir(sourceDir);
  } catch {
    return;
  }

  await mkdir(destinationDir, { recursive: true });

  for (const entry of entries) {
    if (!entry.toLowerCase().endsWith(".mp4")) continue;

    const sourcePath = path.join(sourceDir, entry);
    const destinationPath = path.join(destinationDir, entry);
    await copyFile(sourcePath, destinationPath);
  }
}

async function copyAssets() {
  for (const sourceDir of videoSources) {
    await copyMp4Files(sourceDir, videoDestination);
  }
}

copyAssets().catch((error) => {
  console.error("Failed to copy video assets", error);
  process.exit(1);
});
