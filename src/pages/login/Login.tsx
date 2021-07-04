import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Body } from "../../components/Body";
import { Container } from "../../components/Container";
import { useAuthService } from "../../services/AuthService";
import { authApiService } from "../../apis/AuthApiService";
import { Auth } from "../../models/Auth";
import { useAlertBox } from "../../components/AlertBox";
import { userService } from "../../services/UserService";
import { Transition } from "@headlessui/react";
import { InputText } from "../../components/InputText";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { IconFertilizer } from "../../assets/Images";

export const LoginPage = () => {
    const history = useHistory();
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [password, setPassword] = useState("");
    const [alertBoxVisible, isAlertBoxVisible, AlertBox] = useAlertBox();
    const [loginErrorMessage, setLoginErrorMessage] = useState("Network Error");
    const [disableLoginButton, isDisableLoginButton] = useState(false);
    const [loading, isLoading] = useState(false);

    const login = () => {
        if (nomorTelepon.length > 10 && password.length > 6) {
            isDisableLoginButton(true);
            isLoading(true);

            authApiService.getCSRFToken().then(() => {
                authApiService
                    .login({
                        nomorTelepon: nomorTelepon,
                        password: password,
                    })
                    .then((loginUser) => {
                        console.log("loginUser", loginUser);
                        isDisableLoginButton(false);
                        isLoading(false);

                        if (loginUser.user.role === "kios") {
                            userService.setKiosUser(loginUser.user.kios!);
                        } else if (loginUser.user.role === "petani") {
                            userService.setPetaniUser(loginUser.user.petani!);
                        }

                        const auth: Auth = { token: loginUser.token };
                        useAuthService.login(auth, loginUser.user.role);
                        gotoHome();
                    })
                    .catch((error) => {
                        isDisableLoginButton(false);
                        isLoading(false);
                        console.log(error);
                        isAlertBoxVisible(true);
                        setLoginErrorMessage(error.message ?? "Login Gagal!");
                    });
            });
        } else {
            isAlertBoxVisible(true);
            setLoginErrorMessage("Periksa Kembali Nomor Telepon dan Passowrd Anda!");
        }
    };

    const gotoHome = () => {
        history.push("/");
    };

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
                    title="Kesalahan"
                    buttonTitle="TUTUP"
                    visible={true}
                    onClose={() => {
                        isAlertBoxVisible(false);
                    }}
                    content={<div className="text-gray-600">{loginErrorMessage}</div>}
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
            <Body>
                <div className="flex flex-1 items-center justify-center">
                    <div className="max-w-xs w-full justify-center mb-16">
                        <div className="flex flex-col items-center justify-center mb-16">
                            {/* <div className="bg-green-500 w-32 h-32">logo</div> */}
                            <img src={IconFertilizer} className="w-32 h-32" />
                            <div className="text-green-600 text-center font-medium text-2xl">PUPUK RAKYAT</div>
                        </div>
                        <InputText
                            label="Nomor Telepon"
                            type="number"
                            onChange={(event) => setNomorTelepon(event.target.value)}
                        />
                        <InputText
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    console.log("hit enter");
                                    login();
                                }
                            }}
                            label="Password"
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="flex flex-col">
                            <Button disabled={disableLoginButton} className="mt-4" onClick={() => login()}>
                                MASUK
                            </Button>
                        </div>
                    </div>
                </div>
            </Body>
        </Container>
    );
};

export const Login = {
    ComponentPage: LoginPage,
    routeName: "/login",
};
