// src\App.tsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:uid" element={<Details />} />
        </Routes>
      </main>
    </>
  );
}
