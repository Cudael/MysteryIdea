import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const health: {
    status: string;
    timestamp: string;
    database: string;
    version: string;
  } = {
    status: "ok",
    timestamp: new Date().toISOString(),
    database: "unknown",
    version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || "dev",
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.database = "connected";
  } catch {
    health.status = "degraded";
    health.database = "disconnected";
  }

  const statusCode = health.status === "ok" ? 200 : 503;
  return NextResponse.json(health, { status: statusCode });
}
