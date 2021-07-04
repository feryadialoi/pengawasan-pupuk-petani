import { getRole } from "../../services/AuthService";
import { Redirect } from "react-router-dom";
import { Onboarding } from "../onboarding/Onboarding";
import { KiosHome } from "../kios/kioshome/KiosHome";
import { PetaniHome } from "../petani/petanihome/PetaniHome";

export const HomePage = () => {
    switch (getRole()) {
        case null:
            return <Redirect to={Onboarding.routeName} />;
        case "kios":
            return <KiosHome.ComponentPage />;
        case "petani":
            return <PetaniHome.ComponentPage />;
        default:
            return <Redirect to={Onboarding.routeName} />;
    }
};

export const Home = {
    ComponentPage: HomePage,
    routeName: "/",
};
