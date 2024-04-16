import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import Loader from "../components/Loader";
import { Tag, NoteListProps, Note } from "../utils/type";
import EditTagsModal from "../components/EditTagsModal";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import Navbar from "../layout/Navbar";
import { useRecoilState } from "recoil";
import { notesState, tagsState } from "../store/state";
import toast from "react-hot-toast";

function NoteList({ isLoaded, user }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);
  const [notes, setNotes] = useRecoilState<Note[]>(notesState);
  const [availableTags, setAvailableTags] = useRecoilState<Tag[]>(tagsState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags?.length === 0 ||
          selectedTags?.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }

    fetchData();
  }, [isLoaded, user]);

  const onDeleteTag = async (id: string) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + `/tag/${id}`);
      setAvailableTags((prev) => prev.filter((tag) => tag.id !== id));
      toast.success("Tag deleted successfully");
    } catch (err) {
      toast.error("Failed to delete tag");
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!isLoaded) {
        return;
      }
      const [notesRes, tagsRes] = await Promise.all([
        axios.get(import.meta.env.VITE_API_URL + `/notes/user/${user.id}`),
        axios.get(import.meta.env.VITE_API_URL + `/tags/user/${user.id}`),
      ]);
      setNotes(notesRes.data);
      setAvailableTags(tagsRes.data);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  if (loading || !isLoaded) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="alert alert-danger fs-4">
          Error loading notes. Please try again.
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                        userId: user.id,
                      };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes?.length === 0 && (
          <div
            className="fs-1 d-flex justify-content-center flex-column align-items-center container"
            style={{
              minHeight: "60vh",
            }}
          >
            No Notes
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
          </div>
        )}
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  );
}

export default NoteList;
