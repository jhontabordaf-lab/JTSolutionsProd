import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  nombre: string;
  email: string;
  empresa?: string;
  servicio?: string;
  mensaje: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "jhon.taborda.f@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    if (!body.nombre?.trim() || !body.email?.trim() || !body.mensaje?.trim()) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Email inválido." },
        { status: 400 }
      );
    }

    const serviceMap: Record<string, string> = {
      ia: "IA Aplicada",
      desarrollo: "Desarrollo",
      consultoria: "Consultoría",
      otro: "Otro / No estoy seguro",
    };

    const { error } = await resend.emails.send({
      from: `JTSolutions Contacto <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: body.email,
      subject: `Nuevo mensaje de ${body.nombre}${body.empresa ? ` — ${body.empresa}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#fff;color:#0a0a0f">
          <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #e5e7eb">
            <span style="display:inline-block;background:#2563FF;color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:6px">JTSolutions</span>
            <span style="display:inline-block;margin-left:10px;font-size:12px;color:#6b7280">Nuevo mensaje de contacto</span>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280;width:110px">Nombre</td>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px;font-weight:600">${body.nombre}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280">Email</td>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px"><a href="mailto:${body.email}" style="color:#2563FF;text-decoration:none">${body.email}</a></td>
            </tr>
            ${body.empresa ? `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280">Empresa</td>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px">${body.empresa}</td>
            </tr>` : ""}
            ${body.servicio ? `
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280">Servicio</td>
              <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-size:14px">${serviceMap[body.servicio] ?? body.servicio}</td>
            </tr>` : ""}
          </table>

          <div style="background:#f9fafb;border-radius:10px;padding:16px 20px;margin-bottom:24px">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b7280">Mensaje</p>
            <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap">${body.mensaje}</p>
          </div>

          <a href="mailto:${body.email}" style="display:inline-block;background:#2563FF;color:#fff;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none">Responder a ${body.nombre}</a>

          <p style="margin-top:32px;font-size:11px;color:#9ca3af">Este mensaje fue enviado desde el formulario de contacto de jtsolutions.com</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return NextResponse.json(
        { error: "Error al enviar. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error interno. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
