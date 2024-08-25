import "../App.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LandingPage} from "../pages/Landing";
import { LoginPage } from "../pages/Login";
import { DashboardPage } from "../pages/Dashboard";
import {Helmet, HelmetProvider} from "react-helmet-async";

export const App = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Helmet>
                                    <title>Whatcents</title>
                                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                                </Helmet>
                                <LandingPage />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                <Helmet>
                                    <title>Login</title>
                                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                                </Helmet>
                                <LoginPage />
                            </>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <>
                                <Helmet>
                                    <title>Whatcents - Dashboard</title>
                                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                                </Helmet>
                                <DashboardPage />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};
