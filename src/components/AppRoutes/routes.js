import AccountPage from "../../pages/account";
import Login from "../../pages/login";
import { Navigate } from "react-router-dom";
import ChannelPage from "../../pages/channel";
import ChannelsPage from "../../pages/channels";
import MoviesPage from "../../pages/movies";
import MoviePage from "../../pages/movie";
import SettingsPage from "../../pages/settings";

export const AcceptRoutes = {
  Auth: [
    { exact: true, path: "/account", element: <AccountPage /> },
    {
      exact: true,
      path: "/login",
      element: <Navigate replace to="/channels" />
    },
    { exact: true, path: "/channels/:id", element: <ChannelPage /> },
    { exact: true, path: "/channels", element: <ChannelsPage /> },
    { exact: true, path: "/movies/:id", element: <MoviePage /> },
    { exact: true, path: "/movies", element: <MoviesPage /> },
    { exact: true, path: "/settings", element: <SettingsPage /> },
    { exact: true, path: "/", element: <Navigate replace to="/channels" /> }
  ],
  NotAuth: [
    { exact: true, path: "/login", element: <Login /> },
    { exact: true, path: "/", element: <Navigate replace to="/login" /> }
  ]
};
