import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface MenuRow {
  id: number;
  nama: string;
  kategori: string;
  deskripsi: string;
  harga: number;
  image: string | null;
  is_available: number;
  urutan: number;
  created_at: string;
}

export async function GET() {
  try {
    const rows = await query<MenuRow>(
      "SELECT id, nama, kategori, deskripsi, harga, image, is_available, urutan, created_at FROM menu WHERE is_available = 1 ORDER BY urutan ASC, nama ASC"
    );

    return NextResponse.json({
      status: "ok",
      data: rows,
    });
  } catch (error) {
    console.error("API /menu error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
