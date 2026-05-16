import { z } from "zod";

export const onboardingSchema = z.object({
  namaUsaha: z.string().min(1, "Nama usaha wajib diisi"),
  provinsi: z.string().min(1, "Provinsi wajib diisi"),
  noWhatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
  email: z.string().email("Format email salah"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  marginDefault: z.number(),
  matauang: z.string(),
  pajakDefault: z.number(),
  biayaPengantaranDefault: z.number()
});

export type OnboardingData = z.infer<typeof onboardingSchema>;