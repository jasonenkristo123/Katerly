

type TGetProfile = {
    profileId: number;
    namaUsaha: string;
    namaPemilik:string;
    provinsi: string;
    noWhatsapp:string;
    email: string;
    alamat: string;
    logoPath: string;
    marginDefault: number;
    matauang: string;
    pajakDefault: number;
    biayaPengantaranDefault: number;
    updatedAt: string;
    premium: boolean;
    createdAt: string;
}

type TPostProfile = Omit<TGetProfile, 'profileId' | 'logoPath' | 'updatedAt'>

export type OptionalPostProfile = Partial<TPostProfile>;
export type OptionalProfile = Partial<TGetProfile>;

