import { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Home } from "./pages/home/Home";
import { KiosCekPupuk } from "./pages/kios/kioscekpupuk/KiosCekPupuk";
import { KiosCekPupukDetil } from "./pages/kios/kioscekpupukdetil/KiosCekPupukDetil";
import { KiosDetilRiwayatJualPupuk } from "./pages/kios/kiosdetilriwayatjualpupuk/KiosDetilRiwayatJualPupuk";
import { KiosJualPupuk } from "./pages/kios/kiosjualpupuk/KiosJualPupuk";
import { KiosRincianJualPupuk } from "./pages/kios/kiosrincianjualpupuk/KiosRincianJualPupuk";
import { KiosRiwayatJualPupuk } from "./pages/kios/kiosriwayatjualpupuk/KiosRiwayatJualPupuk";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/notfound/NotFound";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { PetaniCekPupukSubsidiTersedia } from "./pages/petani/petanicekpupuksubsiditersedia/PetaniCekPupukSubsidiTersedia";
import { PetaniOTPMasuk } from "./pages/petani/petaniotpmasuk/PetaniOTPMasuk";
import { PetaniRiwayatBeliPupukSubsidi } from "./pages/petani/petaniriwayatbelipupuksubsidi/PetaniriwayatBeliPupukSubsidi";

const App = () => {
    return (
        <HashRouter basename="/">
            <Switch>
                <PublicRoute path={Login.routeName} exact component={Login.ComponentPage} />
                <PublicRoute path={Onboarding.routeName} exact component={Onboarding.ComponentPage} />

                {/* KIOS & PETANI */}
                <PrivateRoute path={Home.routeName} exact roles={["kios", "petani"]} component={Home.ComponentPage} />

                {/* KIOS */}
                <PrivateRoute
                    path={KiosJualPupuk.routeName}
                    exact
                    roles={["kios"]}
                    component={KiosJualPupuk.ComponentPage}
                />
                <PrivateRoute
                    path={KiosCekPupuk.routeName}
                    exact
                    roles={["kios"]}
                    component={KiosCekPupuk.ComponentPage}
                />
                <PrivateRoute
                    path={KiosRiwayatJualPupuk.routeName}
                    exact
                    roles={["kios"]}
                    component={KiosRiwayatJualPupuk.ComponentPage}
                />
                <PrivateRoute
                    path={KiosRincianJualPupuk.routeName}
                    exact
                    roles={["kios"]}
                    component={KiosRincianJualPupuk.ComponentPage}
                />
                <PrivateRoute
                    path={KiosCekPupukDetil.routeName + "/:pupukId"}
                    exact
                    roles={["kios"]}
                    component={KiosCekPupukDetil.ComponentPage}
                />
                <PrivateRoute
                    path={KiosDetilRiwayatJualPupuk.routeName + "/:penjualanId"}
                    exact
                    roles={["kios"]}
                    component={KiosDetilRiwayatJualPupuk.ComponentPage}
                />

                {/* PETANI */}
                <PrivateRoute
                    path={PetaniCekPupukSubsidiTersedia.routeName}
                    exact
                    roles={["petani"]}
                    component={PetaniCekPupukSubsidiTersedia.ComponentPage}
                />
                <PrivateRoute
                    path={PetaniOTPMasuk.routeName}
                    exact
                    roles={["petani"]}
                    component={PetaniOTPMasuk.ComponentPage}
                />
                <PrivateRoute
                    path={PetaniRiwayatBeliPupukSubsidi.routeName}
                    exact
                    roles={["petani"]}
                    component={PetaniRiwayatBeliPupukSubsidi.ComponentPage}
                />
                <Route component={NotFound.ComponentPage} />
            </Switch>
        </HashRouter>
    );
};

export default App;
