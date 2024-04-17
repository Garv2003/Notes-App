import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../utils/type";
import { useRecoilValue } from "recoil";
import { notesState } from "../store/state";
import toast from "react-hot-toast";

function NoteLayout() {
  const { id } = useParams();
  const notes = useRecoilValue<Note[]>(notesState);

  const note = notes.find((note) => note.id === id);

  if (note == null) {
    toast.error("Note not found");
    return <Navigate to="/" />;
  }

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}

export default NoteLayout;
