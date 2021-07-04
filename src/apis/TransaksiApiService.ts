import { UnauthorizedError } from "../errors/UnauthorizedError";
import { PersetujuanTransaksiRequestRequest } from "../models/requests/PersetujuanTransaksiRequestRequest";
import { ApiResponse } from "../models/responses/ApiResponse";
import { apiService } from "./ApiService";
import { PersetujuanTransaksiRequest } from "../models/PersetujuanTransaksiRequest";
import { mapPersetujuanTransaksiRequestToPersetujuanTransaksiRequestRequest } from "../mappers/TransaksiMapper";

interface OTPResponseErrors {
    otp: string[];
}

export const postKiosPersetujuanTransaksi = async (
    token: string,
    persetujuanTransaksiRequest: PersetujuanTransaksiRequest,
): Promise<any> => {
    try {
        const url = "/api/v1/persetujuan-transaksi";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const data: PersetujuanTransaksiRequestRequest = mapPersetujuanTransaksiRequestToPersetujuanTransaksiRequestRequest(
            persetujuanTransaksiRequest,
        );
        const response = await apiService<any, ApiResponse<any>>({
            url: url,
            headers: headers,
            method: "POST",
            data: data,
        });

        console.log(response.data);
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            return response.data.data;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        console.log("error", error);
        if (error?.response && error?.response?.status === 422) {
            const errors: OTPResponseErrors = error?.response?.data?.errors;
            throw new Error(errors.otp[0] ?? "OTP Error");
        } else {
            throw new Error(error?.response?.data?.data ?? error?.message ?? error);
        }
    }
};

export const useTransaksiApiService = {
    postKiosPersetujuanTransaksi,
};

// {"message":"The given data was invalid.","errors":{"otp":["The otp must be 6 characters."]}}
