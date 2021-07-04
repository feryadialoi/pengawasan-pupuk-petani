import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Body } from "../../../components/Body";
import { Button } from "../../../components/Button";
import { ButtonBack } from "../../../components/ButtonBack";
import { Container } from "../../../components/Container";
import { DropDown, DropDownItem } from "../../../components/DropDown";
import { Header } from "../../../components/Header";
import { InputText } from "../../../components/InputText";
import { List } from "../../../components/List";
import { useModalBox } from "../../../components/ModalBox";
import { KelompokTani } from "../../../models/KelompokTani";
import { KeranjangPupuk } from "../../../models/KeranjangPupuk";
import { Petani } from "../../../models/Petani";
import { KiosRincianJualPupuk } from "../kiosrincianjualpupuk/KiosRincianJualPupuk";
import { usePetaniApiService } from "../../../apis/PetaniApiService";
import { useKelompokTaniApiService } from "../../../apis/KelompokTaniApiService";
import { useAuthService } from "../../../services/AuthService";
import { usePupukApiService } from "../../../apis/PupukApiService";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { useToast } from "../../../components/Toast";
import { useDispatch } from "react-redux";
import { AddedToKeranjangPupuk } from "../../../models/AddedToKeranjangPupuk";
import { Transition } from "@headlessui/react";
import { KuotaPupukPetani } from "../../../models/KuotaPupukPetani";
import { Loading } from "../../../components/Loading";
import { LoadingPage } from "../../../components/LoadingPage";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { usePenjualanApiService } from "../../../apis/PenjualanApiService";
import { PenjualanPupukRequest } from "../../../models/PenjualanPupukRequest";
import { useAlertBox } from "../../../components/AlertBox";
import { setRincianPenjualan2Redux, setRincianPenjualanRedux } from "../../../redux/actions/Penjualan";
import { KuotaPupukPetaniItem } from "./components/KuotaPupukPetaniItem";
import { KeranjangPupukItem } from "./components/KeranjangPupukItem";

interface KeranjangPupukWithError extends KeranjangPupuk {
    error?: boolean;
}

export const KiosJualPupukPage = () => {
    const history = useHistory();

    // custom hooks of component
    const [toastVisible, toastMessage, showToast, Toast] = useToast();
    const [modalBoxPupukVisible, isModalBoxPupukVisible, ModalBox] = useModalBox();
    const [alertBoxVisible, isAlertBoxVisible, AlertBox] = useAlertBox();

    // states
    const [kelompokTani, setKelompokTani] = useState<KelompokTani>({ id: 0, nama: "Pilih Kelompok Tani" });
    const [petani, setPetani] = useState<Petani>({ id: 0, nama: "Pilih Petani", alamat: "" });
    const [listOfKeranjangPupuk, setListOfKeranjangPupuk] = useState<KeranjangPupukWithError[]>([]);
    const [listOfKelompokTani, setListOfKelompokTani] = useState<KelompokTani[]>([]);
    const [listOfPetani, setListOfPetani] = useState<Petani[]>([{ alamat: "", id: 0, nama: "Pilih Petani" }]);
    const [masterListOfKuotaPupukPetani, setMasterListOfKuotaPupukPetani] = useState<KuotaPupukPetani[]>([]);
    const [listOfKuotaPupukPetani, setListOfKuotaPupukPetani] = useState<KuotaPupukPetani[]>([]);
    const [keywordPupuk, setKeywordPupuk] = useState("");
    const [loading, isLoading] = useState(false);
    const [loadingPage, isLoadingPage] = useState(true);

    // redux
    const dispatch = useDispatch();

    // methods
    const goBack = () => {
        history.goBack();
    };

    const addPupukToLisftOfKeranjangPupuk = (kuotaPupukPetani: KuotaPupukPetani) => {
        const keranjangPupuk = listOfKeranjangPupuk.filter(
            (item) => item.kuotaPupukPetani.pupuk.id === kuotaPupukPetani.pupuk.id,
        )[0];

        if (keranjangPupuk) {
            showToast("Sudah ada");
        } else {
            // listOfKeranjangPupuk.push({ jumlah: +kuotaPupukPetani.kuota, kuotaPupukPetani });
            listOfKeranjangPupuk.push({ jumlah: 0, kuotaPupukPetani });
            setListOfKeranjangPupuk([...listOfKeranjangPupuk]);
            showToast("Ditambahkan");
        }
    };

    const checkApplyErrorToKeranjangPupuk = () => {
        const _listOfKeranjangPupuk = listOfKeranjangPupuk.map((item) => ({
            ...item,
            error: item.jumlah === 0,
        }));
        setListOfKeranjangPupuk([..._listOfKeranjangPupuk]);

        return _listOfKeranjangPupuk.some((item) => item.error);
    };

    const processJualPupuk = () => {
        const check = checkApplyErrorToKeranjangPupuk();

        if (check) {
            submitRequestPenjualan();
        }
    };

    const submitRequestPenjualan = () => {
        isLoading(true);

        const { token } = useAuthService.getAuth()!;
        const petaniId = petani.id;
        const kelompokTaniId = kelompokTani.id;
        const listPupuk: PenjualanPupukRequest[] = listOfKeranjangPupuk.map((item) => ({
            jumlah: item.jumlah,
            pupukId: item.kuotaPupukPetani.pupukId,
        }));
        usePenjualanApiService
            .postKiosPenjualan(token, {
                petaniId: petaniId,
                kelompokTaniId: kelompokTaniId,
                listPupuk: listPupuk,
            })
            .then((response) => {
                isLoading(false);
                console.log(response);
                dispatch(setRincianPenjualanRedux(response));
                resetStateAfterProcessPenjualan();
                gotoKiosRincianJualPupukSubsidi();
            })
            .catch((error) => {
                isLoading(false);
                console.log(error);
            });
    };

    const resetStateAfterProcessPenjualan = () => {
        resetPetani();
        resetListOfPetani();
        resetListOfKeranjangPupuk();
    };

    const gotoKiosRincianJualPupukSubsidi = () => {
        history.push(KiosRincianJualPupuk.routeName);
    };

    const openModalListOfPupuk = () => {
        setListOfKuotaPupukPetani(masterListOfKuotaPupukPetani);
        isModalBoxPupukVisible(true);
    };

    const filterListOfKuotaPupukPetani = () => {
        const listOfKuotaPupukPetani = masterListOfKuotaPupukPetani.filter((item) =>
            item.pupuk.nama.toLowerCase().includes(keywordPupuk.toLowerCase()),
        );
        if (keywordPupuk === "") {
            setListOfKuotaPupukPetani([...masterListOfKuotaPupukPetani]);
        }
        setListOfKuotaPupukPetani([...listOfKuotaPupukPetani]);
    };

    const handleGetListOfKelompokTani = (promise: PromiseSettledResult<KelompokTani[]>) => {
        if (promise.status === "fulfilled") {
            setListOfKelompokTani([{ id: 0, nama: "Pilih Kelompok Tani" }, ...promise.value]);
        } else {
            console.log(promise.reason);
        }
    };

    const getKiosListOfPetani = (kelompokTaniId: number) => {
        const { token } = useAuthService.getAuth()!;
        isLoading(true);
        usePetaniApiService
            .getKiosListOfPetani(token, {
                kelompokTaniId: kelompokTaniId,
            })
            .then((response) => {
                const _listOfPetani: Petani[] = [
                    {
                        id: 0,
                        nama: "Pilih Petani",
                        alamat: "",
                    },
                    ...response,
                ];
                setListOfPetani([..._listOfPetani]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                isLoading(false);
            });
    };

    const getListOfKuotaPupukPetani = (petaniId: number) => {
        const { token } = useAuthService.getAuth()!;
        isLoading(true);
        usePupukApiService
            .getListOfKuotaPupukPetani(token, { petaniId: petaniId })
            .then((response) => {
                console.log("kuota pupuk petani", response);
                setMasterListOfKuotaPupukPetani(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                isLoading(false);
            });
    };

    const handleOnChangeDropDownKelompokTani = (value: string) => {
        const poktan = listOfKelompokTani.filter((item) => item.id === +value)[0];
        setKelompokTani(poktan);
        resetListOfPetani();
        resetPetani();
        resetListOfKeranjangPupuk();
        getKiosListOfPetani(poktan.id);
    };

    const handleOnChangeDropDownPetani = (value: string) => {
        const tani = listOfPetani.filter((item) => item.id === +value)[0];
        setPetani(tani);
        getListOfKuotaPupukPetani(tani.id);
        resetListOfKeranjangPupuk();
    };

    const resetPetani = () => {
        setPetani({ id: 0, nama: "Pilih Petani", alamat: "" });
    };

    const resetListOfPetani = () => {
        setListOfPetani([{ id: 0, nama: "Pilih Petani", alamat: "" }]);
    };

    const resetListOfKeranjangPupuk = () => {
        setListOfKeranjangPupuk([]);
    };

    const disableAddPupukButton = () => {
        if (petani.id === 0 || petani.nama === "") {
            return true;
        } else {
            return false;
        }
    };

    const disableProcessButton = () => {
        if (kelompokTani.id === 0 || petani.id === 0 || listOfKeranjangPupuk.length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleOnChangeOfKeranjangPupukItem = (item: KeranjangPupuk, itemIndex: number, value: string) => {
        const tempValue = item.jumlah;

        if (+value > item.kuotaPupukPetani.kuota) {
            item.jumlah = tempValue;
        } else {
            item.jumlah = +value;
        }

        listOfKeranjangPupuk[itemIndex] = item;
        setListOfKeranjangPupuk([...listOfKeranjangPupuk]);
    };

    const handleRemoveOfKeranjangPupukItem = (itemIndex: number) => {
        console.log("delete");
        listOfKeranjangPupuk.splice(itemIndex, 1);
        setListOfKeranjangPupuk([...listOfKeranjangPupuk]);
    };

    useEffect(() => {
        const initData = () => {
            const { token } = useAuthService.getAuth()!;

            Promise.allSettled([
                // list of data fetching
                useKelompokTaniApiService.getKiosListOfKelompokTani(token),
            ])
                .then((promises) => {
                    console.log(promises);
                    const [
                        //
                        promiseListOfKelompokTani,
                    ] = promises;

                    handleGetListOfKelompokTani(promiseListOfKelompokTani);
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
                show={alertBoxVisible}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <AlertBox
                    visible={true}
                    title="Jual Pupuk Sukses"
                    buttonTitle="TUTUP"
                    onClose={() => isAlertBoxVisible(false)}
                    content={<div className="text-gray-600">Jual Pupuk Subsidi ke Petani A berhasil</div>}
                />
            </Transition>
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
            <Toast message={toastMessage} visible={toastVisible} />
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
                    title="Tambah Pupuk"
                    visible={true}
                    onClose={() => isModalBoxPupukVisible(false)}
                    content={
                        <div>
                            <InputText
                                onKeyUp={() => filterListOfKuotaPupukPetani()}
                                label="Cari Pupuk"
                                value={keywordPupuk}
                                onChange={(event) => {
                                    setKeywordPupuk(event.target.value);
                                    filterListOfKuotaPupukPetani();
                                }}
                            />
                            <ConditionalComponent
                                condition={listOfKuotaPupukPetani.length > 0}
                                true={
                                    <List
                                        data={listOfKuotaPupukPetani}
                                        render={(item, itemIndex) => (
                                            <KuotaPupukPetaniItem
                                                onClick={() => addPupukToLisftOfKeranjangPupuk(item)}
                                                key={itemIndex}
                                                kuotaPupukPetani={item}
                                            />
                                        )}
                                    />
                                }
                                false={
                                    <div className="p-4">
                                        <div className="text-gray-600 font-medium text-center">Belum ada pupuk</div>
                                    </div>
                                }
                            />
                        </div>
                    }
                />
            </Transition>
            <Header title="Jual Pupuk Subsidi" left={<ButtonBack onClick={() => goBack()} />} />
            <Body>
                <ConditionalComponent
                    condition={loadingPage}
                    true={
                        <LoadingPage>
                            <LoadingCirle />
                        </LoadingPage>
                    }
                    false={
                        <div className="flex flex-col flex-1">
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
                            <div className="flex justify-end mt-4">
                                <Button disabled={disableAddPupukButton()} onClick={() => openModalListOfPupuk()}>
                                    Tambah Pupuk
                                </Button>
                            </div>
                            <div className="flex mt-2 mb-2">
                                <div className="flex-1 text-gray-600">Pupuk</div>
                                <div className="text-gray-600">Kg</div>
                            </div>
                            <ConditionalComponent
                                condition={listOfKeranjangPupuk.length > 0}
                                true={
                                    <List
                                        data={listOfKeranjangPupuk}
                                        render={(item, itemIndex) => (
                                            <KeranjangPupukItem
                                                min={0}
                                                max={item.kuotaPupukPetani.kuota}
                                                error={item.error}
                                                key={itemIndex}
                                                keranjangPupuk={item}
                                                onRemove={() => handleRemoveOfKeranjangPupukItem(itemIndex)}
                                                onChange={(event) =>
                                                    handleOnChangeOfKeranjangPupukItem(
                                                        item,
                                                        itemIndex,
                                                        event.target.value,
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                }
                                false={
                                    <div className="p-4">
                                        <div className="text-gray-600  text-center">Belum ada pupuk</div>
                                    </div>
                                }
                            />
                        </div>
                    }
                />
            </Body>
            <ConditionalComponent
                condition={!loadingPage}
                true={
                    <div className="flex flex-col p-4 shadow-2xl">
                        <Button disabled={disableProcessButton()} onClick={() => processJualPupuk()}>
                            <div className="flex justify-center items-center">PROSES</div>
                        </Button>
                    </div>
                }
                false={<></>}
            />
        </Container>
    );
};

export const KiosJualPupuk = {
    ComponentPage: KiosJualPupukPage,
    routeName: "/kios-jual-pupuk",
};
