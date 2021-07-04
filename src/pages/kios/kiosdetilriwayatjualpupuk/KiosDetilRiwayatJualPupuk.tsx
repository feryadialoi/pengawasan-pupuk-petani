import { Transition } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { usePenjualanApiService } from "../../../apis/PenjualanApiService";
import { Body } from "../../../components/Body";
import { Button } from "../../../components/Button";
import { ButtonBack } from "../../../components/ButtonBack";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { List } from "../../../components/List";
import { Loading } from "../../../components/Loading";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { LoadingPage } from "../../../components/LoadingPage";
import { DetilTransaksiPenjualan } from "../../../models/DetilTransaksiPenjualan";
import { RincianPenjualan } from "../../../models/RincianPenjualan";
import { RincianPupuk } from "../../../models/RincianPupuk";
import { setRincianPenjualanRedux } from "../../../redux/actions/Penjualan";
import { RootState } from "../../../redux/Store";
import { useAuthService } from "../../../services/AuthService";
import { KiosRincianJualPupuk } from "../kiosrincianjualpupuk/KiosRincianJualPupuk";

interface DetilTransaksiPenjualanItemProps {
    rincianPupuk: RincianPupuk;
}

export const DetilTransaksiPenjualanItem: FC<DetilTransaksiPenjualanItemProps> = (props) => {
    return (
        <div className="mb-2 border-b pb-2">
            <div className="text-gray-600">{props.rincianPupuk.pupuk.nama}</div>
            <div className="text-gray-600">
                {+props.rincianPupuk.pupuk.harga} x {+props.rincianPupuk.jumlah} Kg
            </div>
            <div className="text-gray-600">{props.rincianPupuk.pupuk.deskripsi ?? "-"}</div>
            <div className="text-gray-600">{+props.rincianPupuk.total}</div>
        </div>
    );
};

interface KiosDetilRiwayatJualPupukPageParams {
    penjualanId: string;
}

export const KiosDetilRiwayatJualPupukPage = () => {
    const history = useHistory();
    const params = useParams<KiosDetilRiwayatJualPupukPageParams>();

    const [loadingPage, isLoadingPage] = useState(true);
    const [detilTransaksiPenjualan, setDetilTransaksiPenjualan] = useState<DetilTransaksiPenjualan>({
        petaniId: 0,
        petani: {
            id: 0,
            nama: "",
            alamat: "",
        },
        statusAuthorisasi: false,
        total: 0,
        listRincian: [],
    });
    const [loading, isLoading] = useState(false);
    const rincianPenjualanRedux = useSelector<RootState, RincianPenjualan>((state) => state.penjualan.rincianPenjualan);
    const dispatch = useDispatch();

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        const initData = () => {
            const { penjualanId } = params;
            const { token } = useAuthService.getAuth()!;
            usePenjualanApiService
                .getKiosDetilTransaksiPenjualan(token, +penjualanId, {})
                .then((response) => {
                    console.log(response);
                    setDetilTransaksiPenjualan(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    isLoadingPage(false);
                });
        };

        initData();
    }, [params]);

    const getDetailPenjualan = () => {
        isLoading(true);

        const { token } = useAuthService.getAuth()!;
        const { penjualanId } = params;
        usePenjualanApiService
            .getKiosDetilPenjualanShow(token, +penjualanId)
            .then((response) => {
                console.log(response);
                isLoading(false);
                dispatch(setRincianPenjualanRedux(response));
                gotoRincianPenjualan();
            })
            .catch((error) => {
                console.log(error);
                isLoading(false);
            });
    };

    const gotoRincianPenjualan = () => {
        history.push(KiosRincianJualPupuk.routeName);
    };

    const finishingPenjualan = () => {
        getDetailPenjualan();
    };

    console.log(detilTransaksiPenjualan);
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
            <Header title="Detil Riwayat Jual Pupuk" left={<ButtonBack onClick={() => goBack()} />} />
            <ConditionalComponent
                condition={loadingPage}
                true={
                    <LoadingPage>
                        <LoadingCirle />
                    </LoadingPage>
                }
                false={
                    <Body>
                        <div className="mb-4">
                            <div className="text-gray-600 text-2xl">{detilTransaksiPenjualan.petani.nama}</div>
                            <div className="text-gray-600">Tani Sido mulyo</div>
                            <div className="text-gray-600">{detilTransaksiPenjualan.petani.alamat}</div>
                        </div>

                        <div className="p-4 shadow-md mb-4">
                            <List
                                data={detilTransaksiPenjualan.listRincian}
                                render={(item, itemIndex) => (
                                    <DetilTransaksiPenjualanItem key={itemIndex} rincianPupuk={item} />
                                )}
                            />
                        </div>
                    </Body>
                }
            />
            <ConditionalComponent
                condition={loadingPage}
                true={<></>}
                false={
                    <div className="p-4">
                        <ConditionalComponent
                            condition={detilTransaksiPenjualan.statusAuthorisasi}
                            true={<></>}
                            false={
                                <div className="flex flex-col">
                                    <div className="mb-2 text-gray-600">
                                        <div>Belum diautorisasi</div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            finishingPenjualan();
                                        }}
                                    >
                                        Selesaikan Penjualan
                                    </Button>
                                </div>
                            }
                        />
                        <div className="flex justify-between my-4">
                            <div className="text-gray-600">Total</div>
                            <div className="text-green-600 font-medium">{+detilTransaksiPenjualan.total}</div>
                        </div>
                    </div>
                }
            />
        </Container>
    );
};

export const KiosDetilRiwayatJualPupuk = {
    ComponentPage: KiosDetilRiwayatJualPupukPage,
    routeName: "/kios-riwayat-jual-pupuk",
};
