import { UnauthorizedError } from "../errors/UnauthorizedError";
import {
    mapOTPResponseToOTP,
    mapRequestOTPRequestToRequestOTPRequestRequest,
    mapRequestOTPResponseToRequestOTP,
} from "../mappers/OTPMapper";
import { RequestOTP } from "../models/RequestOTP";
import { RequestOTPRequestRequest } from "../models/requests/RequestOTPRequestRequest";
import { RequestOTPResponse } from "../models/responses/RequestOTPResponse";
import { apiService } from "./ApiService";
import { RequestOTPRequest } from "../models/RequestOTPRequest";
import { ApiResponse } from "../models/responses/ApiResponse";
import { url } from "inspector";
import { OTPResponse } from "../models/responses/OTPResponse";
import { OTP } from "../models/OTP";

// KIOS
export const postKiosRequestOTP = async (token: string, requestOTPRequest: RequestOTPRequest): Promise<RequestOTP> => {
    try {
        const url = "/api/v1/otp";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const data = mapRequestOTPRequestToRequestOTPRequestRequest(requestOTPRequest);
        const response = await apiService<RequestOTPRequestRequest, ApiResponse<RequestOTPResponse>>({
            url: url,
            method: "POST",
            headers: headers,
            data: data,
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            return mapRequestOTPResponseToRequestOTP(apiResponseData);
        } else {
            throw new Error("another errorss");
        }
    } catch (error) {
        throw new Error(error);
    }
};

// PETANI
export const getPetaniListOfOTP = async (token: string): Promise<OTP[]> => {
    try {
        const url = "/api/v1/otp";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const response = await apiService<any, ApiResponse<OTPResponse[]>>({
            url: url,
            method: "GET",
            headers: headers,
        });

        console.log(response);
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            const listOfOtp = apiResponseData.map((item) => mapOTPResponseToOTP(item));

            return listOfOtp;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        console.log(error.message);
        throw new Error(error?.response?.data?.message ?? error?.message ?? error);
    }
};

export const useOTPApiService = {
    postKiosRequestOTP,
    getPetaniListOfOTP,
};
