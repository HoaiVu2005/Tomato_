import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import NotPage from "./pages/NotPage";

function App() {
  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
