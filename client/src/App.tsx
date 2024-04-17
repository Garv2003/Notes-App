import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NoteList from "./pages/NoteList";
import NewNote from "./pages/NewNote";
import NoteLayout from "./layout/NoteLayout";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute>
              <NewNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <NoteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
