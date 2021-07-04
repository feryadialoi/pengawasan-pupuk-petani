import { Transition } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "heroicons-react";
import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isIndexSignatureDeclaration } from "typescript";
import { useKelompokTaniApiService } from "../../../apis/KelompokTaniApiService";
import { usePetaniApiService } from "../../../apis/PetaniApiService";
import { usePupukApiService } from "../../../apis/PupukApiService";
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
import { PupukTersedia } from "../../../models/PupukTersedia";
import { useAuthService } from "../../../services/AuthService";
// import { KiosCekPupukDetil } from "../kioscekpupukdetil/KiosCekPupukDetil";

const KELOMPOK_TANI: KelompokTani = {
    id: 0,
    nama: "Pilih Kelompok Tani",
};

const PETANI: Petani = {
    id: 0,
    nama: "Pilih Petani",
    alamat: "",
};

interface PupukTersediaItemProps {
    pupukTersedia: PupukTersedia;
    onClick?: () => void;
}

const PupukTersediaItem: FC<PupukTersediaItemProps> = (props) => {
    return (
        <div onClick={props.onClick} className="shadow-md p-4 mb-4 flex hover:bg-gray-50">
            <img alt={props.pupukTersedia.pupuk.nama} src={props.pupukTersedia.pupuk.foto} className="h-16 w-16" />
            <div className="ml-4 flex-1">
                <div className="text-green-600">{props.pupukTersedia.pupuk.nama}</div>
                <div className="text-gray-600">{+props.pupukTersedia.pupuk.harga}</div>
            </div>
            <div className="flex items-center text-gray-600">{+props.pupukTersedia.kuotaTersedia} Kg</div>
        </div>
    );
};

export const KiosCekPupukPage = () => {
    const history = useHistory();

    // states
    const [loadingPage, isLoadingPage] = useState(true);
    const [listOfPupukTersedia, setListOfPupukTersedia] = useState<PupukTersedia[]>([]);

    const [listOfKelompokTani, setListOfKelompokTani] = useState<KelompokTani[]>([]);
    const [listOfPetani, setListOfPetani] = useState<Petani[]>([PETANI]);
    const [kelompokTani, setKelompokTani] = useState<KelompokTani>(KELOMPOK_TANI);
    const [petani, setPetani] = useState<Petani>(PETANI);

    const [loading, isLoading] = useState(false);

    // methods

    const goBack = () => {
        history.goBack();
    };

    const gotoKiosCekPupukDetilPage = (pupukId: number) => {
        // history.push(KiosCekPupukDetil.routeName + "/" + pupukId);
    };

    const handlePromiseGetListOfPupukSubsidiTersedia = (promise: PromiseSettledResult<PupukTersedia[]>) => {
        if (promise.status === "fulfilled") {
            setListOfPupukTersedia([...promise.value]);
        }
    };
    const handlePromiseGetListOfKelompokTani = (promise: PromiseSettledResult<KelompokTani[]>) => {
        if (promise.status === "fulfilled") {
            setListOfKelompokTani([KELOMPOK_TANI, ...promise.value]);
        }
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

    const initData = async (kelompokTaniId?: number, petaniId?: number) => {
        try {
            const { token } = useAuthService.getAuth()!;
            const promises = await Promise.allSettled([
                usePupukApiService.getPupukSubsidiTersedia(token, {
                    kelompokTaniId,
                    petaniId,
                }),
                useKelompokTaniApiService.getKiosListOfKelompokTani(token),
            ]);
            handlePromiseGetListOfPupukSubsidiTersedia(promises[0]);
            handlePromiseGetListOfKelompokTani(promises[1]);

            isLoadingPage(false);
        } catch (error) {
            isLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        initData();
    }, []);

    const resetFilter = async () => {
        setKelompokTani(KELOMPOK_TANI);
        setPetani(PETANI);

        isLoading(true);
        await initData(KELOMPOK_TANI.id, PETANI.id);
        isLoading(false);
    };

    const loadData = async () => {
        const kelompokTaniId = kelompokTani.id === 0 ? undefined : kelompokTani.id;
        const petaniId = petani.id === 0 ? undefined : petani.id;

        isLoading(true);
        await initData(kelompokTaniId, petaniId);
        isLoading(false);
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
            <Header title="Cek Pupuk Subsidi Tersedia" left={<ButtonBack onClick={() => goBack()} />} />
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

                        <div className="text-gray-600">Daftar Pupuk</div>
                        <List
                            data={listOfPupukTersedia}
                            render={(item, itemIndex) => (
                                <PupukTersediaItem
                                    onClick={() => gotoKiosCekPupukDetilPage(item.pupuk.id)}
                                    key={itemIndex}
                                    pupukTersedia={item}
                                />
                            )}
                        />
                    </Body>
                }
            />
        </Container>
    );
};

export const KiosCekPupuk = {
    ComponentPage: KiosCekPupukPage,
    routeName: "/kios-cek-pupuk",
};
