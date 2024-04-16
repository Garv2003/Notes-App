import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import { NoteLayout } from "./layout/NoteLayout";
import { Note } from "./pages/Note";
import { EditNote } from "./pages/EditNote";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  const SetAddUser = async () => {
    if (isLoaded && isSignedIn) {
      await axios.post(import.meta.env.VITE_API_URL + "/new_user", user);
    }
  };

  useEffect(() => {
    SetAddUser();
  }, [isLoaded, isSignedIn, user]);

  return (
    <Container>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/"
          element={<NoteList isLoaded={isLoaded} user={user} />}
        />
        <Route
          path="/new"
          element={<NewNote isLoaded={isLoaded} user={user} />}
        />
        <Route
          path="/:id"
          element={<NoteLayout user={user} isLoaded={isLoaded} />}
        >
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
