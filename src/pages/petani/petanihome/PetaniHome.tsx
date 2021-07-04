import { useHistory } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { Body } from "../../../components/Body";
import { ButtonLogout } from "../../../components/ButtonLogout";
import { ButtonMenu } from "../../../components/ButtonMenu";
import { useConfirmationBox } from "../../../components/ConfirmationBox";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { useNavbar } from "../../../components/Navbar";
import { useAuthService } from "../../../services/AuthService";
import { HomeCard } from "../../home/components/HomeCard";
import { Onboarding } from "../../onboarding/Onboarding";
import { PetaniCekPupukSubsidiTersedia } from "../petanicekpupuksubsiditersedia/PetaniCekPupukSubsidiTersedia";
import { PetaniOTPMasuk } from "../petaniotpmasuk/PetaniOTPMasuk";
import { PetaniRiwayatBeliPupukSubsidi } from "../petaniriwayatbelipupuksubsidi/PetaniriwayatBeliPupukSubsidi";

export const PetaniHomePage = () => {
    const history = useHistory();

    const [navbarVisible, isNavbarVisible, Navbar] = useNavbar();
    const [confirmationBoxVisible, isConfirmationBoxVisible, ConfirmationBox] = useConfirmationBox();

    const gotoPetaniCekPupukTersedia = () => {
        history.push(PetaniCekPupukSubsidiTersedia.routeName);
    };

    const gotoPetaniOTPMasuk = () => {
        history.push(PetaniOTPMasuk.routeName);
    };

    const gotoPetaniRiwayatBeliPupuk = () => {
        history.push(PetaniRiwayatBeliPupukSubsidi.routeName);
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
                title="PUPUK (PETANI)"
                left={<ButtonMenu onClick={() => toggleNavbar()} />}
                right={<ButtonLogout onClick={() => logout()} />}
            />

            <Body>
                <HomeCard title="Cek Pupuk Subsidi Tersedia" onClick={() => gotoPetaniCekPupukTersedia()} />
                <HomeCard title="OTP Masuk" onClick={() => gotoPetaniOTPMasuk()} />
                <HomeCard title="Riwayat Pembelian Pupuk Subsidi" onClick={() => gotoPetaniRiwayatBeliPupuk()} />
            </Body>
        </Container>
    );
};

export const PetaniHome = {
    ComponentPage: PetaniHomePage,
    routeName: "/",
};
