import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const directory = searchParams.get("directory");

  if (!directory) {
    return NextResponse.json(
      { error: "Directory parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Resolve the path relative to the public folder
    const publicPath = path.join(process.cwd(), "public", directory);
    const filenames = await fs.readdir(publicPath);

    // Filter for image files only and create proper web URLs
    const imageFiles = filenames
      .filter((name) => {
        const ext = path.extname(name).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .map((name) => {
        // Normalize path separators and ensure it starts with /
        const webPath = `/${directory}/${name}`.replace(/\\/g, "/");
        return webPath;
      })
      .sort(); // Sort alphabetically for consistent ordering

    return NextResponse.json({ files: imageFiles });
  } catch (err) {
    console.error("Error reading directory:", err);
    return NextResponse.json(
      { error: "Failed to read directory", files: [] },
      { status: 500 }
    );
  }
}
