export interface SnapResult {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status?: string;
    [key: string]: unknown;
}

export interface SnapOptions {
    onSuccess?: (result: SnapResult) => void;
    onPending?: (result: SnapResult) => void;
    onError?: (result: SnapResult) => void;
    onClose?: () => void;
}

declare global {
    interface Window {
        snap: {
            pay: (snapToken: string, options?: SnapOptions) => void;
        };
    }
}

export interface TSubsResponse {
    subscriptionId: number;
    midtransOrderId: string;
    midtransTransactionId: string | null;
    status: string;
    amount: number;
    startDate: string | null;
    endDate: string | null;
    createdAt: string;
    snapToken: string;
    paymentUrl: string;
}

export { };