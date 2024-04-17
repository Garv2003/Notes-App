import NoteForm from "../components/NoteForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tag, NoteData } from "../utils/type";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tagsState } from "../store/state";
import { useAuth } from "../context/auth";

function NewNote() {
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useRecoilState<Tag[]>(tagsState);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: NoteData) {
    try {
      setLoading(true);
      await axios.post(import.meta.env.VITE_API_URL + "/note", {
        ...data,
        userId: auth.user?.id,
      });
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
