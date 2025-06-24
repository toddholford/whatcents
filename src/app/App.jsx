import "../App.css";
import "react-toastify/dist/ReactToastify.css";

import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../pages/MainLayout";
import { LoginPage } from "../pages/Login";
import { DashboardPage  } from "../pages/Dashboard";

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
                                    <title>Login</title>
                                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                                </Helmet>
                                <LoginPage />
                            </>
                        }
                    />
                    <Route element={<MainLayout />}>
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
                    </Route>
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

