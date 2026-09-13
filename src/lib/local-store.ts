import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  source: string;
  created_at: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "inquiries.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]\n", "utf8");
  }
}

export async function saveLocalInquiry(
  inquiry: Omit<Inquiry, "id">,
): Promise<Inquiry | null> {
  try {
    await ensureStore();
    const raw = await readFile(dataFile, "utf8");
    const list = JSON.parse(raw) as Inquiry[];
    const row: Inquiry = {
      id: crypto.randomUUID(),
      ...inquiry,
    };
    list.unshift(row);
    await writeFile(dataFile, `${JSON.stringify(list, null, 2)}\n`, "utf8");
    return row;
  } catch (error) {
    console.error(
      "Local inquiry save failed:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export async function countLocalInquiries() {
  try {
    await ensureStore();
    const raw = await readFile(dataFile, "utf8");
    return (JSON.parse(raw) as Inquiry[]).length;
  } catch {
    return 0;
  }
}
