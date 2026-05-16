

export interface DashboardMenuPalingUntung {
    namaResep: string;
    totalPorsi: number;
    totalPendapatan: number;
    totalHpp: number;
    profit: number;
    marginPersen: number;
}

export interface DashboardMenuTerakhir {
    namaResep: string;
    totalPorsi: number;
}

export interface DashboardNotaTerbaru {
    nomorInvoice: string;
    namaClient: string;
    totalHargaJual: number;
    marginAktual: number;
    status: string;
    tanggal: string;
}

export interface DashboardKeuntunganBulanIni {
    tanggal: string;
    keuntungan: number;
}

export interface DashboardData {
    totalPendapatan: number;
    totalKeuntungan: number;
    marginRataRata: number;
    totalNota: number;
    pendapatanChangePercent: number;
    keuntunganChangePercent: number;
    marginChangePercent: number;
    notaChangePercent: number;
    keuntunganBulanIni: DashboardKeuntunganBulanIni[];
    menuPalingUntung: DashboardMenuPalingUntung[];
    menuTerakhir: DashboardMenuTerakhir[];
    notaTerbaru: DashboardNotaTerbaru[];
}

export interface DashboardApiResponse {
    success: boolean;
    message: string;
    data: DashboardData;
}

export interface MonthOption {
    label: string;
    month: number;
    year: number;
}
