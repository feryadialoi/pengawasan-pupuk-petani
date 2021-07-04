import { ReactNode } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { Role } from "../models/Role";
import { Onboarding } from "../pages/onboarding/Onboarding";
import { getAuth, getRole } from "../services/AuthService";

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteProps>;
    roles?: Role[];
}

export const PrivateRoute = ({ component: Component, roles, ...rest }: PrivateRouteProps) => {
    const getRouteComponent = (props: RouteComponentProps<any, any, any>): ReactNode => {
        const auth = getAuth();
        if (auth) {
            if (roles) {
                const role = getRole();
                if (roles.includes(role!)) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/" />;
                }
            } else {
                return <Component {...props} />;
            }
        } else {
            return <Redirect to={Onboarding.routeName} />;
        }
    };

    return <Route {...rest} render={(props) => getRouteComponent(props)} />;
};
