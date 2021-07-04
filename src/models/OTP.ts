import { OTPPembelian } from "./OTPPembelian";

export interface OTP {
    id: number;
    otp: number;
    pembelian: OTPPembelian;
    status: string;
}
