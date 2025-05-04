import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import NotesDashboard from "./pages/NotesDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm />} />
      <Route path="/" element={<AuthForm />} />
      <Route path="/register" element={<AuthForm />} />
      <Route element={<ProtectedRoute />}/>
      <Route path="/notes" element={<NotesDashboard />} />
    </Routes>
  );
}

export default App;