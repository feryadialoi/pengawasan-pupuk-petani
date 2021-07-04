import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { usePembelianApiService } from "../../../apis/PembelianApiService";
import { usePupukApiService } from "../../../apis/PupukApiService";
import { Body } from "../../../components/Body";
import { ButtonBack } from "../../../components/ButtonBack";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { List } from "../../../components/List";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { LoadingPage } from "../../../components/LoadingPage";
import { Pembelian } from "../../../models/Pembelian";
import { useAuthService } from "../../../services/AuthService";

interface PembelianItemProps {
    pembelian: Pembelian;
}

export const PembelianItem: FC<PembelianItemProps> = (props) => {
    return (
        <div className="shadow-md mb-4 p-2">
            <div className="flex justify-between">
                <div className="text-green-600">{props.pembelian.kode}</div>
                <div className="text-gray-600 text-sm">{props.pembelian.tanggal}</div>
            </div>
            <div className="text-gray-600 font-medium">{props.pembelian.petani.nama}</div>
            <div className="text-gray-600 text-sm">{props.pembelian.kios.nama}</div>
            <div className="text-gray-600 text-sm">{props.pembelian.kios.alamat}</div>
            <div className="text-gray-600">{props.pembelian.status}</div>
        </div>
    );
};

export const PetaniRiwayatBeliPupukSubsidiPage = () => {
    const history = useHistory();
    const [loadingPage, isLoadingPage] = useState(true);
    const [listOfPembelian, setListOfPembelian] = useState<Pembelian[]>([]);

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        const initData = () => {
            const { token } = useAuthService.getAuth()!;

            usePembelianApiService
                .getPetaniListOfPembelianPupuk(token)
                .then((response) => {
                    console.log(response);
                    setListOfPembelian(response);
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
            <Header title="Riwayat Beli Pupuk Subsidi" left={<ButtonBack onClick={() => goBack()} />} />
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
                            data={listOfPembelian}
                            render={(item, itemIndex) => <PembelianItem pembelian={item} key={itemIndex} />}
                        />
                    </Body>
                }
            />
        </Container>
    );
};

export const PetaniRiwayatBeliPupukSubsidi = {
    ComponentPage: PetaniRiwayatBeliPupukSubsidiPage,
    routeName: "/riwayat-beli-pupuk-subsidi",
};
