import { LoginFailError } from "../errors/LoginFailError";
import { mapLoginUserResponseToLoginUser } from "../mappers/loginUserMapper";
import { LoginUser } from "../models/LoginUser";
import { LoginRequest } from "../models/requests/LoginRequest";
import { ApiResponse } from "../models/responses/ApiResponse";
import { LoginUserResponse } from "../models/responses/LoginUserResponse";
import { apiService } from "./ApiService";

interface LoginRequestBody {
    nomorTelepon: string;
    password: string;
}
export const login = async (loginRequest: LoginRequestBody): Promise<LoginUser> => {
    try {
        const url = "/api/v1/login";
        const data: LoginRequest = {
            nomor_telepon: loginRequest.nomorTelepon,
            password: loginRequest.password,
        };
        const response = await apiService<LoginRequest, ApiResponse<LoginUserResponse>>({
            method: "POST",
            data: data,
            url: url,
        });
        const statusCode = response.status.toString();

        if (statusCode.substr(0, 1) === "2") {
            console.log("login raw response", response);

            const apiResponseData = response.data.data;
            const loginUser: LoginUser = mapLoginUserResponseToLoginUser(apiResponseData);

            return loginUser;
        } else {
            throw new LoginFailError("login gagal");
        }
    } catch (error) {
        console.log(error?.response);
        throw new LoginFailError(error?.response?.data?.message ?? error.message ?? "login gagal");
    }
};

export const getCSRFToken = async () => {
    try {
        const url = "/sanctum/csrf-cookie";
        const response = await apiService<LoginRequest, ApiResponse<LoginUserResponse>>({
            url: url,
            method: "GET",
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            return response;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        console.log(error?.message);
        throw new Error(error?.response?.data?.message ?? error?.message);
    }
};

export const authApiService = {
    login,
    getCSRFToken,
};
