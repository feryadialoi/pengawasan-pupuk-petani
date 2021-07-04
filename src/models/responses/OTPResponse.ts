import { OTPPembelianResponse } from "./OTPPembelianResponse";

export interface OTPResponse {
    id: number;
    otp: number;
    pembelian: OTPPembelianResponse;
    status: string;
}
