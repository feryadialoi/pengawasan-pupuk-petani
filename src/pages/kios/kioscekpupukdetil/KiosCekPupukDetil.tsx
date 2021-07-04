import { useHistory, useParams } from "react-router-dom";
import { Body } from "../../../components/Body";
import { ButtonBack } from "../../../components/ButtonBack";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { Pupuk } from "../../../models/Pupuk";

const listOfPupukTersedia: Pupuk[] = [
    { id: 1, nama: "Pupuk fosfat 1", foto: "/", deskripsi: "Detil Pupuk fosfat", harga: 100000 },
    { id: 2, nama: "Pupuk fosfat 1", foto: "/", deskripsi: "Detil Pupuk fosfat", harga: 100000 },
    { id: 3, nama: "Pupuk fosfat 1", foto: "/", deskripsi: "Detil Pupuk fosfat", harga: 100000 },
];

interface KiosCekPupukDetilPageParams {
    pupukId: string;
}

export const KiosCekPupukDetilPage = () => {
    const history = useHistory();
    const params = useParams<KiosCekPupukDetilPageParams>();
    console.log(params);

    const goBack = () => {
        history.goBack();
    };

    return (
        <Container>
            <Header title="Detil Pupuk Subsidi" left={<ButtonBack onClick={() => goBack()} />} />
            <Body>
                <div>{listOfPupukTersedia.filter((item) => item.id === +params.pupukId)[0].nama}</div>
                <div>{listOfPupukTersedia.filter((item) => item.id === +params.pupukId)[0].harga}</div>
                <div>{listOfPupukTersedia.filter((item) => item.id === +params.pupukId)[0].deskripsi}</div>

                <div>
                    <div>Tersedia .....</div>
                </div>
            </Body>
        </Container>
    );
};

export const KiosCekPupukDetil = {
    ComponentPage: KiosCekPupukDetilPage,
    routeName: "/kios-cek-pupuk",
};
