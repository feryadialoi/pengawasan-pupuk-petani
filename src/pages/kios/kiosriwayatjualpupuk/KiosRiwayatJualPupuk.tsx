import { Transition } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useKelompokTaniApiService } from "../../../apis/KelompokTaniApiService";
import { usePenjualanApiService } from "../../../apis/PenjualanApiService";
import { usePetaniApiService } from "../../../apis/PetaniApiService";
import { Body } from "../../../components/Body";
import { Button } from "../../../components/Button";
import { ButtonBack } from "../../../components/ButtonBack";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { Container } from "../../../components/Container";
import { DropDown, DropDownItem } from "../../../components/DropDown";
import { FilterContainer } from "../../../components/FilterContainer";
import { Header } from "../../../components/Header";
import { List } from "../../../components/List";
import { Loading } from "../../../components/Loading";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { LoadingPage } from "../../../components/LoadingPage";
import { KelompokTani } from "../../../models/KelompokTani";
import { Petani } from "../../../models/Petani";
import { TransaksiPenjualan } from "../../../models/TransaksiPenjualan";
import { useAuthService } from "../../../services/AuthService";
import { KiosDetilRiwayatJualPupuk } from "../kiosdetilriwayatjualpupuk/KiosDetilRiwayatJualPupuk";

const KELOMPOK_TANI: KelompokTani = {
    id: 0,
    nama: "Pilih Kelompok Tani",
};

const PETANI: Petani = {
    id: 0,
    nama: "Pilih Petani",
    alamat: "",
};

interface DatePickerProps {
    label?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const DatePicker: FC<DatePickerProps> = (props) => {
    return (
        <div className="flex flex-col">
            <label className="text-gray-600 font-medium">{props.label ?? "Date Picker"}</label>
            <input
                type="date"
                value={props.value}
                onChange={props.onChange}
                className={`appearance-none
                focus:ring-green-300
                focus:ring
                outline-none
                bg-white px-2 w-full border-2 
                text-gray-600
                border-green-500 rounded-md h-10`}
            />
        </div>
    );
};

interface TransaksiPenjualanItemProps {
    transaksiPenjualan: TransaksiPenjualan;
    onClick?: () => void;
}

export const TransaksiPenjualanItem: FC<TransaksiPenjualanItemProps> = (props) => {
    return (
        <div className="shadow-md mb-4 p-2" onClick={props.onClick}>
            <div className="flex justify-between">
                <div className="text-green-600">{props.transaksiPenjualan.kode}</div>
                <div className="text-gray-600 text-sm">{props.transaksiPenjualan.tanggal}</div>
            </div>
            <div className="text-gray-600">{props.transaksiPenjualan.petani.nama}</div>
            <div className="text-gray-600">{props.transaksiPenjualan.petani.kelompokTani.nama}</div>
        </div>
    );
};

export const KiosRiwayatJualPupukPage = () => {
    const history = useHistory();

    const [listOfTransaksiPenjualan, setListOfTransaksiPenjualan] = useState<TransaksiPenjualan[]>([]);
    const [loadingPage, isLoadingPage] = useState(true);
    const [loading, isLoading] = useState(false);

    // state for filter
    const [listOfKelompokTani, setListOfKelompokTani] = useState<KelompokTani[]>([]);
    const [listOfPetani, setListOfPetani] = useState<Petani[]>([PETANI]);
    const [kelompokTani, setKelompokTani] = useState<KelompokTani>(KELOMPOK_TANI);
    const [petani, setPetani] = useState<Petani>(PETANI);

    const goBack = () => {
        history.goBack();
    };

    const gotoDetilRiwayatJualPupuk = (transaksiPenjualanId: number) => {
        history.push(KiosDetilRiwayatJualPupuk.routeName + "/" + transaksiPenjualanId);
    };

    const handleOnChangeDropDownKelompokTani = (value: string) => {
        const poktan = listOfKelompokTani.filter((item) => item.id === +value)[0];
        setKelompokTani(poktan);
        console.log(poktan);
        getListOfPetani(poktan.id);
    };

    const handleOnChangeDropDownPetani = (value: string) => {
        const tani = listOfPetani.filter((item) => item.id === +value)[0];
        setPetani(tani);
    };

    const getListOfPetani = (kelompokTaniId: number) => {
        const { token } = useAuthService.getAuth()!;
        isLoading(true);
        usePetaniApiService
            .getKiosListOfPetani(token, {
                kelompokTaniId: kelompokTaniId,
            })
            .then((response) => {
                setListOfPetani([PETANI, ...response]);
                isLoading(false);
            })
            .catch((error) => {
                console.log(error);
                isLoading(false);
            });
    };

    const handlePromiseGetListOfKelompokTani = (promise: PromiseSettledResult<KelompokTani[]>) => {
        if (promise.status === "fulfilled") {
            setListOfKelompokTani([KELOMPOK_TANI, ...promise.value]);
        }
    };

    const handlePromiseGetListOfTransaksiPenjualan = (promise: PromiseSettledResult<TransaksiPenjualan[]>) => {
        if (promise.status === "fulfilled") {
            setListOfTransaksiPenjualan([...promise.value]);
        }
    };

    const initData = async (
        tanggalAwal?: string,
        tanggalAkhir?: string,
        kelompokTaniId?: number,
        petaniId?: number,
    ) => {
        try {
            const { token } = useAuthService.getAuth()!;
            const promises = await Promise.allSettled([
                usePenjualanApiService.getKiosListOfTransaksiPenjualan(token, {
                    tanggalAwal,
                    tanggalAkhir,
                    kelompokTaniId,
                    petaniId,
                }),
                useKelompokTaniApiService.getKiosListOfKelompokTani(token),
            ]);
            handlePromiseGetListOfTransaksiPenjualan(promises[0]);
            handlePromiseGetListOfKelompokTani(promises[1]);

            isLoadingPage(false);
        } catch (error) {
            console.log(error);
            isLoadingPage(false);
        }
    };

    useEffect(() => {
        initData();
    }, []);

    const resetFilter = async () => {
        setKelompokTani(KELOMPOK_TANI);
        setPetani(PETANI);

        isLoading(true);
        await initData();
        isLoading(false);
    };

    const loadData = async () => {
        const _tanggalAwal = tanggalAwal == "" ? undefined : tanggalAwal;
        const _tanggalAkhir = tanggalAkhir == "" ? undefined : tanggalAkhir;
        const kelompokTaniId = kelompokTani.id === 0 ? undefined : kelompokTani.id;
        const petaniId = petani.id === 0 ? undefined : petani.id;

        isLoading(true);
        await initData(_tanggalAwal, _tanggalAkhir, kelompokTaniId, petaniId);
        isLoading(false);
    };

    const [tanggalAwal, setTanggalAwal] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");

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
            <Header title="Riwayat Jual Pupuk Subsidi" left={<ButtonBack onClick={() => goBack()} />} />

            <ConditionalComponent
                condition={loadingPage}
                true={
                    <LoadingPage>
                        <LoadingCirle />
                    </LoadingPage>
                }
                false={
                    <Body>
                        <FilterContainer>
                            <div className="px-4 pb-4 pt-2">
                                <div className="mb-2">
                                    <DatePicker
                                        value={tanggalAwal}
                                        onChange={(event) => {
                                            setTanggalAwal(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <DatePicker
                                        value={tanggalAkhir}
                                        onChange={(event) => {
                                            setTanggalAkhir(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <DropDown
                                        value={kelompokTani.id.toString()}
                                        onChange={(event) => handleOnChangeDropDownKelompokTani(event.target.value)}
                                        label="Kelompok Tani"
                                        data={listOfKelompokTani}
                                        option={(item, itemIndex) => (
                                            <DropDownItem disabled={item.id === 0} value={item.id} key={itemIndex}>
                                                {item.nama}
                                            </DropDownItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <DropDown
                                        value={petani.id.toString()}
                                        onChange={(event) => handleOnChangeDropDownPetani(event.target.value)}
                                        label="Petani"
                                        data={listOfPetani}
                                        option={(item, itemIndex) => (
                                            <DropDownItem disabled={item.id === 0} value={item.id} key={itemIndex}>
                                                {item.nama}
                                            </DropDownItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Button className="mr-2" light onClick={() => resetFilter()}>
                                        Reset
                                    </Button>
                                    <Button onClick={() => loadData()}>Load Data</Button>
                                </div>
                            </div>
                        </FilterContainer>
                        <List
                            data={listOfTransaksiPenjualan}
                            render={(item, itemIndex) => (
                                <TransaksiPenjualanItem
                                    transaksiPenjualan={item}
                                    key={itemIndex}
                                    onClick={() => {
                                        gotoDetilRiwayatJualPupuk(item.id);
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

export const KiosRiwayatJualPupuk = {
    ComponentPage: KiosRiwayatJualPupukPage,
    routeName: "/kios-riwayat-jual-pupuk",
};
