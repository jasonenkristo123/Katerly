import { useQuery } from "@tanstack/react-query";
import { getHistoryInvoice, getHistoryInvoiceById } from "../service/history-api";


export const useGetHistoryInvoice = () => {
    return useQuery({
        queryKey: ["history-invoice"],
        queryFn: () => getHistoryInvoice(),
    });
}

export const useGetHistoryInvoiceByKeyword = (keyword: string) => {
    return useQuery({
        queryKey: ["history-invoice", keyword],
        queryFn: () => getHistoryInvoiceById(keyword),
        enabled: !!keyword,
    });
}
