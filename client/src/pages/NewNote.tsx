import { NoteForm } from "../components/NoteForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tag, NoteData, NoteListProps } from "../utils/type";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { tagsState } from "../store/state";
import Loader from "../components/Loader";

function NewNote({ user, isLoaded }: NoteListProps) {
  const navigate = useNavigate();
  const [availableTags, setAvailableTags] = useRecoilState<Tag[]>(tagsState);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return <Loader />;

  async function onSubmit(data: NoteData) {
    try {
      setLoading(true);
      await axios.post(import.meta.env.VITE_API_URL + "/note", {
        ...data,
        userId: user.id,
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
        user={user.id}
      />
    </>
  );
}

export default NewNote;
