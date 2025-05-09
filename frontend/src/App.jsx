import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import NotesDashboard from "./pages/NotesDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/notes" element={<ProtectedRoute />}>
          <Route index element={<NotesDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;