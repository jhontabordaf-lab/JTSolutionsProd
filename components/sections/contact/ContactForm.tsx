"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FormState {
  nombre: string;
  email: string;
  empresa: string;
  servicio: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

type Status = "idle" | "loading" | "success" | "error";

const initialState: FormState = {
  nombre: "",
  email: "",
  empresa: "",
  servicio: "",
  mensaje: "",
};

const inputClass =
  "w-full rounded-card border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 py-3 text-sm text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:border-brand transition-colors";

const labelClass =
  "block text-sm font-medium text-light-text dark:text-dark-text mb-2";

const errorClass = "mt-1.5 text-xs text-red-500 dark:text-red-400";

export function ContactForm() {
  const t = useTranslations("contacto.form");
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.nombre.trim()) next.nombre = t("errorNombre");
    if (!form.email.trim()) {
      next.email = t("errorRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t("errorEmail");
    }
    if (!form.mensaje.trim()) next.mensaje = t("errorMensaje");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card-lg border border-brand/30 bg-brand/5 p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-card bg-brand/10 text-brand">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="font-display font-bold text-xl text-light-text dark:text-dark-text">
            {t("successTitle")}
          </p>
          <p className="mt-2 text-sm text-light-muted dark:text-dark-muted leading-relaxed">
            {t("successText")}
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-brand hover:opacity-75 transition-opacity"
        >
          {t("successReset")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            {t("nombreLabel")} <span className="text-brand">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={form.nombre}
            onChange={handleChange}
            placeholder={t("nombrePlaceholder")}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            aria-invalid={!!errors.nombre}
            className={cn(inputClass, errors.nombre && "border-red-500 dark:border-red-500")}
          />
          {errors.nombre && (
            <p id="nombre-error" className={errorClass} role="alert">
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t("emailLabel")} <span className="text-brand">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            className={cn(inputClass, errors.email && "border-red-500 dark:border-red-500")}
          />
          {errors.email && (
            <p id="email-error" className={errorClass} role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="empresa" className={labelClass}>
            {t("empresaLabel")}
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            value={form.empresa}
            onChange={handleChange}
            placeholder={t("empresaPlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="servicio" className={labelClass}>
            {t("servicioLabel")}
          </label>
          <select
            id="servicio"
            name="servicio"
            value={form.servicio}
            onChange={handleChange}
            className={cn(inputClass, "cursor-pointer")}
          >
            <option value="">{t("servicioDefault")}</option>
            <option value="ia">{t("servicioIA")}</option>
            <option value="desarrollo">{t("servicioDesarrollo")}</option>
            <option value="consultoria">{t("servicioConsultoria")}</option>
            <option value="otro">{t("servicioOtro")}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>
          {t("mensajeLabel")} <span className="text-brand">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={handleChange}
          placeholder={t("mensajePlaceholder")}
          aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
          aria-invalid={!!errors.mensaje}
          className={cn(inputClass, "resize-none", errors.mensaje && "border-red-500 dark:border-red-500")}
        />
        {errors.mensaje && (
          <p id="mensaje-error" className={errorClass} role="alert">
            {errors.mensaje}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 dark:text-red-400" role="alert">
          {t("errorGlobal")}{" "}
          <a href="mailto:hola@jtsolutions.com" className="underline">
            hola@jtsolutions.com
          </a>
          .
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-card bg-brand px-6 py-3.5 font-semibold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
