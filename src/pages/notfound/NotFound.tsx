import { Body } from "../../components/Body";
import { Container } from "../../components/Container";

export const NotFoundPage = () => {
    return (
        <Container>
            <Body>
                <div>Halaman tidak ditemukan</div>
            </Body>
        </Container>
    );
};

export const NotFound = {
    ComponentPage: NotFoundPage,
    routeName: "/page-not-found",
};
