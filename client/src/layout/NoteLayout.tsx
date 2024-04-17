import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Loader from "../components/Loader";
import { NoteListProps, Note } from "../utils/type";
import { useRecoilValue } from "recoil";
import { notesState } from "../store/state";

function NoteLayout({ isLoaded, user }: NoteListProps) {
  const { id } = useParams();
  const notes = useRecoilValue<Note[]>(notesState);

  if (!isLoaded) return <Loader />;

  if (!user) return <Navigate to="/sign-in" replace />;

  const note = notes.find((note) => note.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}

export default NoteLayout;
