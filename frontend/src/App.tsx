import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { HomePage } from "./pages/home";
import Layout from "./interfaces/Layout";
import { AuthContextType } from "./contexts/@types";
import { useAuth } from "./contexts/AuthContext";
import { ProducersPage } from "./pages/producers";
import { UsersPage } from "./pages/users";

function App() {
  const { isAuthenticated } = useAuth() as AuthContextType;
  const { pathname } = useLocation();

  if (pathname === "/login" && isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      {/* Rotas protegidas */}
      {isAuthenticated && (
        <>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/producers" element={<ProducersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
