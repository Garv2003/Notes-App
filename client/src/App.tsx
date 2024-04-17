import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
const NewNote = lazy(() => import("./pages/NewNote"));
const NoteList = lazy(() => import("./pages/NoteList"));
const NoteLayout = lazy(() => import("./layout/NoteLayout"));
const Note = lazy(() => import("./pages/Note"));
const EditNote = lazy(() => import("./pages/EditNote"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/Loader";
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
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<Loader />}>
              <SignInPage />
            </Suspense>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<Loader />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <NoteList isLoaded={isLoaded} user={user} />
            </Suspense>
          }
        />
        <Route
          path="/new"
          element={
            <Suspense fallback={<Loader />}>
              <NewNote isLoaded={isLoaded} user={user} />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<Loader />}>
              <NoteLayout user={user} isLoaded={isLoaded} />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <Note />
              </Suspense>
            }
          />

          <Route
            path="edit"
            element={
              <Suspense fallback={<Loader />}>
                <EditNote user={user} />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
