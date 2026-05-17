import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key tidak dikonfigurasi" }, { status: 500 });
        }

        const { prompt, availableIngredients } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt kosong" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemInstruction = `Kamu adalah seorang Chef Catering Profesional di Indonesia yang ahli dalam menyusun resep masakan dalam skala besar. 
Tugasmu adalah menganalisis permintaan resep dari user, lalu memilih bahan baku dari DAFTAR BAHAN yang tersedia.
Jika jumlah porsi tidak disebutkan oleh user, buat default 100 porsi.

DAFTAR BAHAN YANG TERSEDIA DI GUDANG USER:
${JSON.stringify(availableIngredients, null, 2)}

Kamu HANYA BOLEH memilih bahan baku dari DAFTAR BAHAN di atas menggunakan ID bahan yang persis sama. Jika ada bahan penting yang tidak ada di daftar, kamu tetap harus menyelesaikan resep sebaik mungkin HANYA dengan bahan yang ada. Gunakan logika dan estimasi gram/liter/satuan yang akurat untuk porsi besar.

KEMBALIKAN OUTPUT STRICT JSON DENGAN FORMAT BERIKUT (TANPA MARKDOWN, TANPA PENJELASAN LAIN):
{
  "namaResep": "Nama resep catering (misal: Nasi Kotak Ayam Bakar Spesial)",
  "jumlahPorsi": 100,
  "ingredients": [
    {
      "ingredientId": "ID bahan baku dari daftar",
      "quantity": 10 // jumlah angka yang dibutuhkan (number)
    }
  ]
}`;

        const result = await model.generateContent({
            contents: [
                { role: "user", parts: [{ text: systemInstruction }] },
                { role: "user", parts: [{ text: `Permintaan Resep: ${prompt}` }] }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2, // Low temperature for more deterministic recipe calculations
            }
        });

        const responseText = result.response.text();

        try {
            const parsedRecipe = JSON.parse(responseText);
            return NextResponse.json(parsedRecipe);
        } catch (parseError) {
            console.error("Gagal parse JSON Gemini:", responseText);
            return NextResponse.json({ error: "Output AI tidak valid." }, { status: 500 });
        }

    } catch (error: unknown) {
        console.error("Gemini API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Gagal memproses permintaan AI";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
