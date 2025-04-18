import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import CreatePage from "./pages/create/CreatePage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/create" element={<Layout><CreatePage /></Layout>} />
        </Routes>
    </>
  );
}

export default App;