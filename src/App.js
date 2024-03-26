import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import AddCoordinates from "./pages/AddCoordinates";
import View from "./pages/View";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add" element={<AddCoordinates />} />
            <Route path="/map/view/:_id" element={<View />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
