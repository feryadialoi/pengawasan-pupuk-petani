import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { usePupukApiService } from "../../../apis/PupukApiService";
import { Body } from "../../../components/Body";
import { ButtonBack } from "../../../components/ButtonBack";
import { ConditionalComponent } from "../../../components/CondionalComponent";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { List } from "../../../components/List";
import { LoadingCirle } from "../../../components/LoadingCircle";
import { LoadingPage } from "../../../components/LoadingPage";
import { KuotaPupukPetani } from "../../../models/KuotaPupukPetani";
import { useAuthService } from "../../../services/AuthService";
import { userService } from "../../../services/UserService";

interface PupukTersediaItemProps {
    kuotaPupukPetani: KuotaPupukPetani;
    onClick?: () => void;
}

export const PupukTersediaItem: FC<PupukTersediaItemProps> = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={`
                shadow-md flex p-4 mb-4 hover:bg-gray-100
            `}
        >
            <img
                alt={props.kuotaPupukPetani.pupuk.nama}
                src={props.kuotaPupukPetani.pupuk.foto}
                className="w-16 h-16"
            />
            <div className="ml-2">
                <div className="text-green-600">{props.kuotaPupukPetani.pupuk.nama}</div>
                <div className="text-gray-600">{+props.kuotaPupukPetani.pupuk.harga}</div>
                <div
                    className={`
                        ${+props.kuotaPupukPetani.kuota === 0 ? "text-red" : "text-gray-600"}
                    `}
                >
                    {+props.kuotaPupukPetani.kuota} Kg
                </div>
            </div>
        </div>
    );
};
export const PetaniCekPupukSubsidiTersediaPage = () => {
    const history = useHistory();
    const [loadingPage, isLoadingPage] = useState(true);
    const [listOfPupukTersedia, setListOfPupukTersedia] = useState<KuotaPupukPetani[]>([]);

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        const initData = () => {
            const { token } = useAuthService.getAuth()!;
            const { id: petaniId } = userService.getPetaniUser();

            usePupukApiService
                .getListOfKuotaPupukPetani(token, {
                    petaniId: petaniId,
                })
                .then((response) => {
                    console.log(response);
                    setListOfPupukTersedia(response);
                    isLoadingPage(false);
                })
                .catch((error) => {
                    console.log(error);
                    isLoadingPage(false);
                })
                .finally(() => {
                    isLoadingPage(false);
                });
        };

        initData();
    }, []);

    return (
        <Container>
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
                        <List
                            data={listOfPupukTersedia}
                            render={(item, itemIndex) => <PupukTersediaItem kuotaPupukPetani={item} key={itemIndex} />}
                        />
                    </Body>
                }
            />
        </Container>
    );
};

export const PetaniCekPupukSubsidiTersedia = {
    ComponentPage: PetaniCekPupukSubsidiTersediaPage,
    routeName: "/cek-pupuk-subsidi-tersedia",
};
