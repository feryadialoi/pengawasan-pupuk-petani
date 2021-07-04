import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import { getAuth } from "../services/AuthService";

interface PublicRouteProps extends RouteProps {
    component: React.ComponentType<RouteProps>;
}

export const PublicRoute = ({ component: Component, ...rest }: PublicRouteProps) => {
    const history = useHistory();

    return (
        <Route
            {...rest}
            render={(props) =>
                getAuth() && (history.location.pathname === "/login" || history.location.pathname === "/onboarding") ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};
