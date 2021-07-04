import axios, { AxiosResponse } from "axios";

const baseURL = "https://pps.turbin.id";

interface ApiServiceConfig<RequestBody, QueryString> {
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    headers?: { [key: string]: string };
    data?: RequestBody;
    url: string;
    params?: QueryString;
}

export const apiService = <RequestBody, ResponseBody, QueryString = any>(
    config: ApiServiceConfig<RequestBody, QueryString>
) => {
    const { url, data, headers, method, params } = config;
    return axios.request<RequestBody, AxiosResponse<ResponseBody>>({
        baseURL: baseURL,
        url: url,
        data: data,
        method: method,
        headers: headers,
        params: params,
    });
};
