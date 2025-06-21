import fs from "fs/promises";
import path from "path";

export default async function generateReportJSON(data, filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
