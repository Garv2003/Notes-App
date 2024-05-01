import NoteForm from "../components/NoteForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tag, NoteData } from "../utils/type";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tagsState, notesState } from "../store/state";
import { useAuth } from "../context/auth";

function NewNote() {
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useRecoilState<Tag[]>(tagsState);
  // eslint-disable-next-line
  const [notes, setNotes] = useRecoilState(notesState);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: NoteData) {
    try {
      setLoading(true);
      const res = await axios.post(import.meta.env.VITE_API_URL + "/note", {
        ...data,
        userId: auth.user?.id,
      });

      notes.push(res.data.note);
      setNotes((prev) => [...prev, res.data.note]);

      setLoading(false);
      toast.success("Note created successfully!");
      navigate("..");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to create note");
      console.error(err);
    }
  }

  function onAddTag(tag: Tag) {
    setAvailableTags((prev) => [...prev, tag]);
  }

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
        loading={loading}
        user={auth.user?.id}
      />
    </>
  );
}

export default NewNote;
