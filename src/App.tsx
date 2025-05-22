// src\App.tsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Stats from "./pages/Stats";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex-1 items-center justify-center">
      <Header />
      <main className="flex flex-1 flex-col p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:uid" element={<Details />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
