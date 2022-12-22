import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import NewPlaces from "../src/places/pages/NewPlaces";
import React, { Suspense } from "react";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/Hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const NewPlaces = React.lazy(() => import("./places/pages/NewPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));

export default function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/:userId/places" element={<UserPlaces />} />

        <Route path="/places/new" element={<NewPlaces />} />

        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/" element={<Users />} />

        <Route path="/auth" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />

        <Route path="/:userId/places" element={<UserPlaces />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/*" element={<Navigate replace to="/auth" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
