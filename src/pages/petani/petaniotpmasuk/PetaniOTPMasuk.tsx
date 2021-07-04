import { Transition } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useOTPApiService } from "../../../apis/OTPApiService";
import { Body } from "../../../components/Body";
import { ButtonBack } from "../../../components/ButtonBack";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { List } from "../../../components/List";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { LoadingPage } from "../../../components/LoadingPage";
import { useModalBox } from "../../../components/ModalBox";
import { OTP } from "../../../models/OTP";
import { PembelianPupuk } from "../../../models/PembelianPupuk";
import { useAuthService } from "../../../services/AuthService";

interface OTPMasukItemProps {
    otp: OTP;
    onClick?: () => void;
}

export const OTPMasukItem: FC<OTPMasukItemProps> = (props) => {
    return (
        <div onClick={props.onClick} className="shadow-md flex flex-col mb-4 p-2 hover:bg-gray-50">
            <div className="flex justify-between items-center">
                <div className="text-gray-600">OTP</div>
                <div className="text-green-600 font-medium text-lg">{props.otp.otp}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-gray-600">Kode Transaksi</div>
                <div className="text-gray-600 font-medium">{props.otp.pembelian.kode}</div>
            </div>
            <div className="text-gray-600">{props.otp.pembelian.listRincian.length} Barang</div>
            <div className="text-right text-green-600">{props.otp.status}</div>
        </div>
    );
};

interface RincianItemProps {
    rincian: PembelianPupuk;
}

export const RincianItem: FC<RincianItemProps> = (props) => {
    return (
        <div className="shadow-md flex  mb-4 p-2">
            <img alt={props.rincian.pupuk.nama} src={props.rincian.pupuk.foto} className="w-16 h-16" />
            <div className="ml-2">
                <div className="text-green-600">{props.rincian.pupuk.nama} </div>
                <div className="text-gray-600">{props.rincian.pupuk.harga} </div>
                <div className="text-gray-600">{props.rincian.pupuk.deskripsi} </div>
                <div className="text-gray-600">
                    {props.rincian.pupuk.harga} x {props.rincian.jumlah} Kg
                </div>
                <div className="text-gray-600">{props.rincian.total} </div>
            </div>
        </div>
    );
};

export const PetaniOTPMasukPage = () => {
    const history = useHistory();
    const [loadingPage, isLoadingPage] = useState(true);
    const [listOfOtp, setListOfOtp] = useState<OTP[]>([]);
    const [listOfRincian, setListOfRincian] = useState<PembelianPupuk[]>([]);

    const [modalBoxPupukVisible, isModalBoxPupukVisible, ModalBox] = useModalBox();

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        const initData = () => {
            const { token } = useAuthService.getAuth()!;
            useOTPApiService
                .getPetaniListOfOTP(token)
                .then((response) => {
                    console.log(response);
                    setListOfOtp(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    isLoadingPage(false);
                });
        };

        initData();
    }, []);

    return (
        <Container>
            <Transition
                appear={true}
                show={modalBoxPupukVisible}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ModalBox
                    title="Daftar Pupuk Dibeli"
                    visible={true}
                    onClose={() => isModalBoxPupukVisible(false)}
                    content={
                        <List
                            data={listOfRincian}
                            render={(item, itemIndex) => <RincianItem rincian={item} key={itemIndex} />}
                        />
                    }
                />
            </Transition>
            <Header title="OTP Masuk" left={<ButtonBack onClick={() => goBack()} />} />
            <ConditionalComponent
                condition={loadingPage}
                true={
                    <LoadingPage>
                        <LoadingCirle />
                    </LoadingPage>
                }
                false={
                    <Body>
                        <List
                            data={listOfOtp}
                            render={(item, itemIndex) => (
                                <OTPMasukItem
                                    otp={item}
                                    key={itemIndex}
                                    onClick={() => {
                                        console.log(item.pembelian.listRincian);
                                        setListOfRincian(item.pembelian.listRincian);
                                        isModalBoxPupukVisible(true);
                                    }}
                                />
                            )}
                        />
                    </Body>
                }
            />
        </Container>
    );
};

export const PetaniOTPMasuk = {
    ComponentPage: PetaniOTPMasukPage,
    routeName: "/otp",
};
