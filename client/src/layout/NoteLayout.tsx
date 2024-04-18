import {
  useNavigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../utils/type";
import { notesState } from "../store/state";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";

function NoteLayout() {
  const { id } = useParams();
  const [notes, setNotesState] = useRecoilState<Note[]>(notesState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | undefined>(() =>
    notes.find((n) => n.id === id)
  );

  useEffect(() => {
    if (note) {
      setLoading(false);
      return;
    }

    async function fetchNote() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/note/" + id
        );
        setNotesState((prev) => [...prev, res.data.note]);
        setNote(res.data.note);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch note");
        navigate("..");
        console.error(err);
        setLoading(false);
      }
    }

    fetchNote();
  }, [id, note]);

  if (loading) {
    return <Loader />;
  }

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}

export default NoteLayout;
