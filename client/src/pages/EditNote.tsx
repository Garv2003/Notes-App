import NoteForm from "../components/NoteForm";
import { useNote } from "../layout/NoteLayout";
import { NoteData, Tag, NoteListProps } from "../utils/type";
import Navbar from "../layout/Navbar";
import { tagsState } from "../store/state";
import { useRecoilState } from "recoil";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EditNote({ user }: NoteListProps) {
  const note = useNote();
  const [availableTags, setAvailableTags] = useRecoilState<Tag[]>(tagsState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (id: string, data: NoteData) => {
    try {
      setLoading(true);
      await axios.patch(import.meta.env.VITE_API_URL + `/note/${id}`, data);
      toast.success("Note updated successfully");
      setLoading(false);
      navigate(`/${id}`);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to update note");
      console.error(err);
    }
  };

  const onAddTag = async (tag: Tag) => {
    try {
      const newTag = await axios.post(
        import.meta.env.VITE_API_URL + `/tag`,
        tag
      );
      setAvailableTags((prev) => [...prev, newTag.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        content={note.content}
        tags={note.tags}
        onSubmit={(data: NoteData) => {
          onSubmit(note.id, data);
        }}
        onAddTag={onAddTag}
        availableTags={availableTags}
        loading={loading}
        user={user.id}
      />
    </>
  );
}

export default EditNote;
