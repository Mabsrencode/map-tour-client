import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import AddCoordinates from "./pages/AddCoordinates";
import View from "./pages/View";
import { UserProvider } from "./context/useContext";
import SignInAdmin from "./pages/SignInAdmin";
import AdminDashboardCreate from "./pages/AdminDashboardCreate";
import AdminView from "./pages/AdminView";
import EditCoordinates from "./pages/EditCoordinates";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<UserProvider />}>
              <Route
                path="/admin-create-account"
                element={<AdminDashboardCreate />}
              />
              <Route path="/map/admin/view/:_id" element={<AdminView />} />
              <Route path="/map/edit/:_id" element={<EditCoordinates />} />
              <Route path="/dashboard" element={<AddCoordinates />} />
            </Route>
            <Route path="/sign-in-as-admin" element={<SignInAdmin />} />
            <Route path="/map/view/:_id" element={<View />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
