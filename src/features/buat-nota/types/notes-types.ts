
export type PostType = {
    namaClient: string;
    noWaClient: string;
    namaAcara: string;
    tanggalAcara: string;
    pajakPersen: number;
    biayaPengantaran?: number;
    items: itemsType[];
}

type itemsType = {
    recipeId: number;
    jumlahPorsi: number;
}