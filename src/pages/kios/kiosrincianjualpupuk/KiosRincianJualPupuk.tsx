import { Transition } from "@headlessui/react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useOTPApiService } from "../../../apis/OTPApiService";
import { useTransaksiApiService } from "../../../apis/TransaksiApiService";
import { useAlertBox } from "../../../components/AlertBox";
import { Body } from "../../../components/Body";
import { Button } from "../../../components/Button";
import { ButtonBack } from "../../../components/ButtonBack";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { InputText } from "../../../components/InputText";
import { List } from "../../../components/List";
import { Loading } from "../../../components/Loading";
import { RincianPenjualan, RincianPenjualan2 } from "../../../models/RincianPenjualan";
import { RincianPupuk, RincianPupuk2 } from "../../../models/RincianPupuk";
import { resetRincianPenjualan2Redux, setRincianPenjualan2Redux } from "../../../redux/actions/Penjualan";
import { RootState } from "../../../redux/Store";
import { useAuthService } from "../../../services/AuthService";
import { Home } from "../../home/Home";

const OTP_LENGTH = 6;

interface RincianPupukItemProps {
    rincianPupuk: RincianPupuk;
}
export const RincianPupukItem: FC<RincianPupukItemProps> = (props) => {
    return (
        <div className="border-b mb-2 flex">
            <div className="flex flex-1 flex-col">
                <div className="text-gray-600">{props.rincianPupuk.pupuk.nama}</div>
                <div className="text-gray-600">
                    {+props.rincianPupuk.pupuk.harga} x {+props.rincianPupuk.jumlah} Kg
                </div>
            </div>
            <div className="text-gray-600">{+props.rincianPupuk.total}</div>
        </div>
    );
};

export const KiosRincianJualPupukPage = () => {
    const history = useHistory();
    const [alertBoxVisible, isAlertBoxVisible, AlertBox] = useAlertBox();
    const [otp, setOtp] = useState("");
    const [requestOTPMessage, setRequestOTPMessage] = useState("");
    const [loading, isLoading] = useState(false);
    const rincianPenjualanRedux = useSelector<RootState, RincianPenjualan>((state) => state.penjualan.rincianPenjualan);

    //
    const [alertBoxTitle, setAlertBoxTitle] = useState("");
    const [autorisasiSuccess, setAutorisasiSuccess] = useState(true);
    const [autorisasiResponseMessage, setAutorisasiResponseMessage] = useState("");

    const dispatch = useDispatch();

    const goBack = () => {
        history.goBack();
    };

    const requestOTP = () => {
        isLoading(true);

        const { token } = useAuthService.getAuth()!;
        const penjualanId = rincianPenjualanRedux.id;

        useOTPApiService
            .postKiosRequestOTP(token, {
                penjualanId: penjualanId,
            })
            .then((response) => {
                console.log(response);
                setRequestOTPMessage("OTP sudah dikirim ke Petani");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                isLoading(false);
            });
    };

    const authorizeJualPupuk = () => {
        isLoading(true);

        const { token } = useAuthService.getAuth()!;
        const penjualanId = rincianPenjualanRedux.id;
        useTransaksiApiService
            .postKiosPersetujuanTransaksi(token, {
                penjualanId: penjualanId,
                otp: +otp,
            })
            .then(() => {
                isLoading(false);

                resetRincianPenjualan();

                showAlertBox("Berhasil", "Jual Pupuk Subsidi ket Petani berhasil");
                setAutorisasiSuccess(true);
            })
            .catch((error) => {
                isLoading(false);

                showAlertBox("Gagal", error?.message || "OTP Error");
                setAutorisasiSuccess(false);
            });
    };

    const showAlertBox = (title: string, message: string) => {
        setAlertBoxTitle(title);
        setAutorisasiResponseMessage(message);
        isAlertBoxVisible(true);
    };

    const handleOnChangeOTPInput = (value: string) => {
        const reg = /^(|\d)+$/;
        if (reg.test(value)) {
            setOtp(value);
        }
    };

    const resetRincianPenjualan = () => {
        dispatch(resetRincianPenjualan2Redux());
    };

    const onCloseAlertBox = () => {
        if (autorisasiSuccess) {
            gotoHome();
        } else {
            isAlertBoxVisible(false);
        }
    };

    const gotoHome = () => {
        history.push(Home.routeName);
        isAlertBoxVisible(false);
    };

    return (
        <Container>
            <Transition
                appear={true}
                show={loading}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Loading visible={true} />
            </Transition>
            <Transition
                appear={true}
                show={alertBoxVisible}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <AlertBox
                    textColor={autorisasiSuccess ? "text-gray-600" : "text-red-600"}
                    visible={true}
                    title={alertBoxTitle}
                    buttonTitle="TUTUP"
                    onClose={() => {
                        onCloseAlertBox();
                    }}
                    content={<div className="text-gray-600">{autorisasiResponseMessage}</div>}
                />
            </Transition>
            <Header title="Rincian Jual Pupuk Subsidi" left={<ButtonBack onClick={() => goBack()} />} />
            <Body>
                <div className="flex flex-col border-b pb-2 mb-4">
                    <div>
                        <div className="font-medium text-xl text-gray-600">{rincianPenjualanRedux.petani.nama}</div>
                        <div className="text-gray-600 text-sm font-medium">
                            {rincianPenjualanRedux.kelompokTani.nama}
                        </div>
                        <div className="text-gray-600 text-sm font-medium">{rincianPenjualanRedux.petani.alamat}</div>
                    </div>
                </div>
                <div className="text-gray-600 font-medium mb-2">Daftar pupuk</div>
                <div className="shadow-md p-4 mb-4">
                    <List
                        data={rincianPenjualanRedux.listRincian}
                        render={(item, itemIndex) => <RincianPupukItem key={itemIndex} rincianPupuk={item} />}
                    />
                </div>
            </Body>
            <div className="flex flex-col p-4">
                <div className="flex flex-col mb-4">
                    <Button onClick={() => requestOTP()}>REQUEST OTP</Button>
                    <div className="text-gray-600 font-medium text-center">{requestOTPMessage}</div>
                </div>
                <InputText
                    maxLength={OTP_LENGTH}
                    className="text-center text-gray-600 font-medium text-2xl"
                    noLabel
                    value={otp}
                    onChange={(event) => {
                        handleOnChangeOTPInput(event.target.value);
                    }}
                />
                <div className="text-gray-600 text-sm font-medium px-2 pb-4">
                    OTP di SMS kan ke HP Petani atau buka melalui App Petani
                </div>
                <Button disabled={otp.length !== OTP_LENGTH} onClick={() => authorizeJualPupuk()}>
                    PROSES
                </Button>
            </div>
        </Container>
    );
};

export const KiosRincianJualPupuk = {
    ComponentPage: KiosRincianJualPupukPage,
    routeName: "/kios-rincian-jual-pupuk-subsidi",
};

// {"message":"The given data was invalid.","errors":{"otp":["The otp must be 6 characters."]}}
