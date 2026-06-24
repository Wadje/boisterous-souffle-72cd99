"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Building2, Info, Lock, User } from "lucide-react";
import { saveProfile } from "./actions";

type ProfileData = {
  billingType: string;
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  district: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  tcNo: string | null;
  taxOffice: string | null;
  taxNo: string | null;
  companyName: string | null;
};

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-line bg-ink-2/60 px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted-2 focus:border-violet"
      />
      {hint && <span className="mt-1 block text-xs text-muted-2">{hint}</span>}
    </label>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-gradient-to-r from-violet-deep to-violet px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_12px_36px_-10px_rgba(124,58,237,0.9)] disabled:opacity-60"
    >
      {pending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
    </button>
  );
}

export function AccountForm({
  profile,
  email,
}: {
  profile: ProfileData;
  email: string | null;
}) {
  const [billingType, setBillingType] = useState(profile.billingType || "bireysel");
  const corporate = billingType === "kurumsal";

  return (
    <form action={saveProfile} className="space-y-10">
      <div className="flex items-start gap-3 rounded-2xl border border-violet/30 bg-violet/10 p-4 text-sm text-paper/90">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
        <span>
          Ödeme sağlayıcımız Garanti BBVA ve fatura (E-Arşiv / E-Fatura) yükümlülükleri için
          kullanılır. Verileriniz güvende ve yalnızca bu amaçla işlenir.
        </span>
      </div>

      {/* Fatura Tipi */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-2">Fatura Tipi</h3>
        <p className="mt-1 text-sm text-muted">
          Bireysel: E-Arşiv · Kurumsal (VKN): E-Fatura.
        </p>
        <input type="hidden" name="billingType" value={billingType} />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TypeCard
            active={!corporate}
            onClick={() => setBillingType("bireysel")}
            Icon={User}
            title="Bireysel (E-Arşiv)"
          />
          <TypeCard
            active={corporate}
            onClick={() => setBillingType("kurumsal")}
            Icon={Building2}
            title="Kurumsal (E-Fatura)"
          />
        </div>
      </div>

      {/* Kişisel Bilgiler */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-2">
          Kişisel Bilgiler
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Ad" name="firstName" defaultValue={profile.firstName} placeholder="Ad" />
          <Field label="Soyad" name="lastName" defaultValue={profile.lastName} placeholder="Soyad" />
        </div>
        <label className="mt-4 block">
          <span className="text-sm text-muted">E-Posta</span>
          <div className="relative mt-1.5">
            <input
              value={email ?? ""}
              disabled
              className="w-full rounded-xl border border-line bg-ink-2/40 px-4 py-3 text-sm text-muted outline-none"
            />
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11px] text-muted">
              <Lock className="h-3 w-3" /> Discord&apos;dan bağlı
            </span>
          </div>
        </label>
      </div>

      {/* Fatura Adresi */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-2">
          Fatura Adresi
        </h3>
        <div className="space-y-4">
          <Field label="Adres (Sokak, Bina No)" name="address1" defaultValue={profile.address1} />
          <Field label="Adres devamı" name="address2" defaultValue={profile.address2} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="İlçe" name="district" defaultValue={profile.district} />
            <Field label="Şehir" name="city" defaultValue={profile.city} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Posta kodu" name="postalCode" defaultValue={profile.postalCode} />
            <Field label="Ülke" name="country" defaultValue={profile.country} placeholder="Türkiye" />
          </div>
        </div>
      </div>

      {/* Kimlik / Vergi */}
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-2">
          Kimlik / Vergi Numarası
        </h3>
        {corporate ? (
          <div className="space-y-4">
            <Field label="Şirket Adı" name="companyName" defaultValue={profile.companyName} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Vergi Dairesi" name="taxOffice" defaultValue={profile.taxOffice} />
              <Field label="Vergi No (VKN)" name="taxNo" defaultValue={profile.taxNo} />
            </div>
          </div>
        ) : (
          <Field
            label="TC Kimlik No (11 hane)"
            name="tcNo"
            defaultValue={profile.tcNo}
            hint="Bireysel fatura için TC girebilirsiniz (opsiyonel)."
          />
        )}
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </form>
  );
}

function TypeCard({
  active,
  onClick,
  Icon,
  title,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof User;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
        active
          ? "border-violet bg-violet/10"
          : "border-line bg-ink-2/50 hover:border-line-bright"
      }`}
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          active ? "bg-violet text-white" : "bg-surface text-muted"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className={`font-medium ${active ? "text-paper" : "text-muted"}`}>{title}</span>
    </button>
  );
}
