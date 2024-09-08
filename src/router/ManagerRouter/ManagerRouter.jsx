import { Routes, Route, Navigate } from "react-router-dom";
import { LayoutSigninSignup, LayoutUser } from '../../layouts';
import { SignIn, SignUp, Characters, Location, Episode } from "../../pages";
import { useAuth } from '../../hooks';

export function ManagerRouter() {
    const { user } = useAuth();
    
    
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    
    return (
    <Routes>
        {!user ? (
            <Route path="/user/*" element={loadLayout(LayoutSigninSignup, SignIn)} />
        ) : (
            <>
                <Route path="/user/characters" element={loadLayout(LayoutUser, Characters)} />
                <Route path="/user/location" element={loadLayout(LayoutUser, Location)} />
                <Route path="/user/episode" element={loadLayout(LayoutUser, Episode)} />
            </>
        )}
        <Route path="/*" element={<Navigate to={"/user/characters"} />} />
    </Routes>
    )
}
