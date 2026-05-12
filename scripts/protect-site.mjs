#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const siteDir = "_book";
const protectedDir = "_book_protected";

function loadPasswordFromDotEnv() {
  if (process.env.STATICRYPT_PASSWORD || !existsSync(".env")) {
    return;
  }

  const line = readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .find((entry) => /^\s*STATICRYPT_PASSWORD\s*=/.test(entry));

  if (!line) {
    return;
  }

  process.env.STATICRYPT_PASSWORD = line
    .replace(/^\s*STATICRYPT_PASSWORD\s*=\s*/, "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage:
  STATICRYPT_PASSWORD="use-a-long-password" npm run protect
  STATICRYPT_PASSWORD="use-a-long-password" npm run build:protected

Encrypts ${siteDir} into ${protectedDir}.`);
  process.exit(0);
}

loadPasswordFromDotEnv();

if (!process.env.STATICRYPT_PASSWORD) {
  console.error("Set STATICRYPT_PASSWORD before running this script.");
  process.exit(1);
}

if (!existsSync(siteDir)) {
  console.error(`Cannot find ${siteDir}. Run "npm run render" first.`);
  process.exit(1);
}

const siteEntries = readdirSync(siteDir)
  .filter((entry) => !entry.startsWith("."))
  .map((entry) => join(siteDir, entry));

if (siteEntries.length === 0) {
  console.error(`${siteDir} is empty. Run "npm run render" first.`);
  process.exit(1);
}

rmSync(protectedDir, { recursive: true, force: true });
mkdirSync(protectedDir, { recursive: true });

const staticrypt = process.platform === "win32" ? "staticrypt.cmd" : "staticrypt";
const result = spawnSync(
  staticrypt,
  [
    ...siteEntries,
    "--recursive",
    "--directory",
    protectedDir,
    "--config",
    ".staticrypt.json",
    "--template-title",
    "BYU CE Assessment Manual",
    "--template-instructions",
    "Enter the site password to view the assessment manual."
  ],
  { stdio: "inherit" }
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

// Quarto's search index contains page text and is not HTML, so Staticrypt copies
// it without encryption. Remove it defensively from protected builds.
rmSync(join(protectedDir, "search.json"), { force: true });

process.exit(0);
