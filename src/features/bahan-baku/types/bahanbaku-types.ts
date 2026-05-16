

export interface TResponseAllIngridients {
    ingredientId?: number;
    id?: number;
    nama: string;
    satuan: string;
    price: number;
    hargaPerSatuan: number;
    hargaSebelumnya: number | null;
    trendPersen: number | null;
    createdAt: string;
    updatedAt: string;
}

export type TPostIngridients = Pick<TResponseAllIngridients, 'nama' | 'satuan' | 'hargaPerSatuan'>;
export type TPutIngridients = Pick<TResponseAllIngridients, 'ingredientId' | 'nama' | 'satuan' | 'hargaPerSatuan'>;
export type TDeleteIngridients = Pick<TResponseAllIngridients, 'ingredientId'>;
