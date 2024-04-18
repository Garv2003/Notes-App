import { Link } from "react-router-dom";
import { SimplifiedNote } from "../utils/type";
import { Card, Stack, Badge } from "react-bootstrap";
import styles from "../styles/NoteList.module.css";

function NoteCard({ id, title, content, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          <p className="text-truncate mb-0 text-muted fs-6 w-100 d-block">
            {content}
          </p>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
