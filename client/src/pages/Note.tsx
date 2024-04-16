import { Badge, Button, Col, Row, Stack, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../layout/NoteLayout";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notesState, tagsState } from "../store/state";
import toast from "react-hot-toast";
import { useState } from "react";

export function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const [notes, setNotes] = useRecoilState(notesState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [loading, setLoading] = useState(false);

  const onDelete = (id: string) => {
    try {
      setLoading(true);
      axios.delete(import.meta.env.VITE_API_URL + `/note/${id}`);
      notes.filter((note) => note.id !== id);
      const noteTags = notes.find((note) => note.id === id)?.tags;
      noteTags?.forEach((tag) => {
        if (notes.filter((note) => note.tags.includes(tag)).length === 1) {
          setTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
        }
      });
      tags.filter((tag) => noteTags?.includes(tag));
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setLoading(false);
      toast.success("Note deleted successfully");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to delete note");
      console.error(err);
    }
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            {loading ? (
              <Button variant="outline-danger" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onDelete(note.id);
                  navigate("/");
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </>
  );
}
