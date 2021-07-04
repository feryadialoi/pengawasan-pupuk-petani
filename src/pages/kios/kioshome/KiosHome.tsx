import { useHistory } from "react-router-dom";
import { Body } from "../../../components/Body";
import { ButtonLogout } from "../../../components/ButtonLogout";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { HomeCard } from "../../home/components/HomeCard";
import { KiosJualPupuk } from "../kiosjualpupuk/KiosJualPupuk";
import { KiosRiwayatJualPupuk } from "../kiosriwayatjualpupuk/KiosRiwayatJualPupuk";
import { Onboarding } from "../../onboarding/Onboarding";
import { useAuthService } from "../../../services/AuthService";
import { ButtonMenu } from "../../../components/ButtonMenu";
import { useNavbar } from "../../../components/Navbar";
import { Transition } from "@headlessui/react";
import { KiosCekPupuk } from "../kioscekpupuk/KiosCekPupuk";
import { useEffect } from "react";
import { useConfirmationBox } from "../../../components/ConfirmationBox";

export const KiosHomePage = () => {
    const history = useHistory();
    const [navbarVisible, isNavbarVisible, Navbar] = useNavbar();
    const [confirmationBoxVisible, isConfirmationBoxVisible, ConfirmationBox] = useConfirmationBox();

    const gotoKiosJualPupuk = () => {
        history.push(KiosJualPupuk.routeName);
    };

    const gotoKiosCekPupuk = () => {
        history.push(KiosCekPupuk.routeName);
    };

    const gotoKiosRiwayatJualPupuk = () => {
        history.push(KiosRiwayatJualPupuk.routeName);
    };

    const logout = () => {
        isConfirmationBoxVisible(true);
    };

    const cancelLogout = () => {
        isConfirmationBoxVisible(false);
    };

    const confirmLogout = () => {
        useAuthService.logout();
        history.push(Onboarding.routeName);
    };

    const toggleNavbar = () => {
        isNavbarVisible(!navbarVisible);
    };

    useEffect(() => {
        //
    }, []);

    return (
        <Container>
            <Transition
                appear={true}
                show={confirmationBoxVisible}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ConfirmationBox
                    title="Keluar"
                    visible={true}
                    buttonYesTitle="Keluar"
                    buttonNoTitle="Tidak"
                    onYesClick={() => confirmLogout()}
                    onNoClick={() => cancelLogout()}
                    content={<div className="text-gray-600 text-center">Anda Yakin Keluar ?</div>}
                />
            </Transition>
            <Transition
                appear={true}
                show={navbarVisible}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Navbar
                    title="Pupuk Rakyat"
                    visible={true}
                    onClickBackground={() => {
                        isNavbarVisible(false);
                    }}
                    menus={[
                        { name: "", route: "" },
                        { name: "", route: "" },
                        { name: "", route: "" },
                    ]}
                />
            </Transition>
            <Header
                title="PUPUK (KIOS)"
                left={<ButtonMenu onClick={() => toggleNavbar()} />}
                right={<ButtonLogout onClick={() => logout()} />}
            />
            <Body>
                <HomeCard title="Jual Pupuk Subsidi" onClick={() => gotoKiosJualPupuk()} />
                <HomeCard title="Cek Pupuk Subsidi Tersedia" onClick={() => gotoKiosCekPupuk()} />
                <HomeCard title="Riwayat Penjualan Pupuk Subsidi" onClick={() => gotoKiosRiwayatJualPupuk()} />
            </Body>
        </Container>
    );
};

export const KiosHome = {
    ComponentPage: KiosHomePage,
    routeName: "/",
};
