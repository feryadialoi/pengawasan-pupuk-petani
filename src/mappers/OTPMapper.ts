import { OTP } from "../models/OTP";
import { RequestOTP } from "../models/RequestOTP";
import { RequestOTPRequest } from "../models/RequestOTPRequest";
import { RequestOTPRequestRequest } from "../models/requests/RequestOTPRequestRequest";
import { OTPResponse } from "../models/responses/OTPResponse";
import { RequestOTPResponse } from "../models/responses/RequestOTPResponse";
import { mapPupukResponseToPupuk } from "./PupukMapper";

export const mapRequestOTPResponseToRequestOTP = (requestOTPResponse: RequestOTPResponse): RequestOTP => {
    return {
        waktuPermintaan: requestOTPResponse.waktu_permintaan,
        waktuPermintaanUlang: requestOTPResponse.waktu_permintaan_ulang,
    };
};

export const mapRequestOTPRequestToRequestOTPRequestRequest = (
    requestOTPRequest: RequestOTPRequest,
): RequestOTPRequestRequest => {
    return {
        penjualan_id: requestOTPRequest.penjualanId,
    };
};

export const mapOTPResponseToOTP = (otpResponse: OTPResponse): OTP => {
    return {
        id: otpResponse.id,
        otp: otpResponse.otp,
        pembelian: {
            id: otpResponse.pembelian.id,
            kode: otpResponse.pembelian.kode,
            otpId: otpResponse.pembelian.otp_id,
            listRincian: otpResponse.pembelian.list_rincian.map((item) => ({
                jumlah: item.jumlah,
                pupuk: mapPupukResponseToPupuk(item.pupuk),
                pupukId: item.pupuk_id,
                total: item.total,
            })),
        },
        status: otpResponse.status,
    };
};
