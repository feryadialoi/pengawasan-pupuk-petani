import { useHistory } from "react-router-dom";
import { IconFertilizer, IconKios, IconPetani, PlaceholderImage } from "../../assets/Images";
import { Body } from "../../components/Body";
import { Container } from "../../components/Container";
import { OnboardingCard } from "./components/OnboardingCard";

export const OnboardingPage = () => {
    const history = useHistory();

    return (
        <Container>
            <Body>
                <div className="flex flex-1 flex-col justify-center">
                    <div className="flex flex-col items-center mb-8">
                        {/* <div className="h-32 w-32 bg-green-500"></div> */}

                        <img src={IconFertilizer} className="h-32 w-32" />
                        <div className="text-green-600 font-medium text-2xl">PUPUK RAKYAT</div>
                    </div>
                    <div className="flex mb-8">
                        <OnboardingCard
                            image={IconPetani}
                            title="PETANI"
                            onClick={() => {
                                history.push("/login");
                            }}
                        />
                        <OnboardingCard
                            image={IconKios}
                            title="KIOS"
                            onClick={() => {
                                history.push("/login");
                            }}
                        />
                    </div>
                </div>
            </Body>
        </Container>
    );
};

export const Onboarding = {
    ComponentPage: OnboardingPage,
    routeName: "/onboarding",
};
