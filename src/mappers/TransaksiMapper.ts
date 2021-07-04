import { PersetujuanTransaksiRequest } from "../models/PersetujuanTransaksiRequest";
import { PersetujuanTransaksiRequestRequest } from "../models/requests/PersetujuanTransaksiRequestRequest";

export const mapPersetujuanTransaksiRequestToPersetujuanTransaksiRequestRequest = (
    persetujuanTransaksiRequest: PersetujuanTransaksiRequest,
): PersetujuanTransaksiRequestRequest => {
    return {
        penjualan_id: persetujuanTransaksiRequest.penjualanId,
        otp: persetujuanTransaksiRequest.otp,
    };
};
