"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMenu(formData: FormData) {
  const nama = formData.get("nama") as string;
  const kategori = formData.get("kategori") as string || "coffee";
  const deskripsi = formData.get("deskripsi") as string;
  const harga = Number(formData.get("harga")) || 0;
  const image = formData.get("image") as string || null;
  const is_available = formData.get("is_available") === "on" ? 1 : 0;
  const urutan = Number(formData.get("urutan")) || 0;

  await query(
    "INSERT INTO menu (nama, kategori, deskripsi, harga, image, is_available, urutan) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nama, kategori, deskripsi, harga, image, is_available, urutan]
  );

  revalidatePath("/admin/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function updateMenu(id: number, formData: FormData) {
  const nama = formData.get("nama") as string;
  const kategori = formData.get("kategori") as string || "coffee";
  const deskripsi = formData.get("deskripsi") as string;
  const harga = Number(formData.get("harga")) || 0;
  const image = formData.get("image") as string || null;
  const is_available = formData.get("is_available") === "on" ? 1 : 0;
  const urutan = Number(formData.get("urutan")) || 0;

  await query(
    "UPDATE menu SET nama = ?, kategori = ?, deskripsi = ?, harga = ?, image = ?, is_available = ?, urutan = ? WHERE id = ?",
    [nama, kategori, deskripsi, harga, image, is_available, urutan, id]
  );

  revalidatePath("/admin/menu");
  revalidatePath("/");
  redirect("/admin/menu");
}

export async function deleteMenu(id: number) {
  await query("DELETE FROM menu WHERE id = ?", [id]);
  revalidatePath("/admin/menu");
  revalidatePath("/");
}

export async function toggleAvailableMenu(id: number, currentStatus: number) {
  await query("UPDATE menu SET is_available = ? WHERE id = ?", [currentStatus === 1 ? 0 : 1, id]);
  revalidatePath("/admin/menu");
  revalidatePath("/");
}
