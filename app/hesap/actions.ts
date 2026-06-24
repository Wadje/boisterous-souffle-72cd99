"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getSession } from "@/lib/session";

function str(v: FormDataEntryValue | null): string | null {
  const s = (v ?? "").toString().trim();
  return s.length ? s : null;
}

export async function saveProfile(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const data = {
    billingType: str(formData.get("billingType")) ?? "bireysel",
    firstName: str(formData.get("firstName")),
    lastName: str(formData.get("lastName")),
    address1: str(formData.get("address1")),
    address2: str(formData.get("address2")),
    district: str(formData.get("district")),
    city: str(formData.get("city")),
    postalCode: str(formData.get("postalCode")),
    country: str(formData.get("country")),
    tcNo: str(formData.get("tcNo")),
    taxOffice: str(formData.get("taxOffice")),
    taxNo: str(formData.get("taxNo")),
    companyName: str(formData.get("companyName")),
  };

  await prisma.profile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...data },
    update: data,
  });

  revalidatePath("/hesap");
}

export async function requestTransfer(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  const targetDiscordId = str(formData.get("targetDiscordId"));
  if (!targetDiscordId) return;

  await prisma.transfer.create({
    data: { userId: user.id, targetDiscordId },
  });

  revalidatePath("/hesap");
}

export async function deleteAccount() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris");

  await prisma.user.delete({ where: { id: user.id } });
  const session = await getSession();
  session.destroy();
  redirect("/");
}
