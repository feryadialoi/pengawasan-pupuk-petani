import { LoginUser } from "../models/LoginUser";
import { LoginUserResponse } from "../models/responses/LoginUserResponse";

export const mapLoginUserResponseToLoginUser = (loginUserResponse: LoginUserResponse): LoginUser => {
    return {
        user: {
            role: loginUserResponse.user.role,
            kios: loginUserResponse.user.kios
                ? {
                      kodeKios: loginUserResponse.user.kios.kode_kios,
                      nama: loginUserResponse.user.kios.nama,
                  }
                : undefined,
            petani: loginUserResponse.user.petani
                ? {
                      id: loginUserResponse.user.petani?.id,
                      nama: loginUserResponse.user.petani?.nama,
                      ktp: loginUserResponse.user.petani?.nama,
                      tempatLahir: loginUserResponse.user.petani?.nama,
                      tanggalLahir: loginUserResponse.user.petani?.nama,
                      namaIbuKandung: loginUserResponse.user.petani?.nama,
                      alamat: loginUserResponse.user.petani?.nama,
                      subsektor: {
                          nama: loginUserResponse.user.petani?.subsektor.nama,
                      },
                  }
                : undefined,
        },
        token: loginUserResponse.token,
    };
};
