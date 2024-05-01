import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./pages/NoteList";
import NewNote from "./pages/NewNote";
import NoteLayout from "./layout/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./layout/ProtectedRoute";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<NoteList />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/:id" element={<NoteLayout />}>
            <Route index element={<Note />} />
            <Route path="edit" element={<EditNote />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
