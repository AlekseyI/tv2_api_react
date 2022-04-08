import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH_LOGGED_IN, selectUser } from "../../store/userReducer";
import { AcceptRoutes } from "./routes";

const AppRoutes = () => {
  const userState = useSelector(selectUser);

  return (
    <Routes>
      {AcceptRoutes[
        userState.authenticationState === AUTH_LOGGED_IN ? "Auth" : "NotAuth"
        ].map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
