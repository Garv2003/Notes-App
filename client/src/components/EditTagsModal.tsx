import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { EditTagsModalProps } from "../utils/type";

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags?.length === 0 && (
              <div className="d-flex justify-between-center align-items-center container">
                No Tags
              </div>
            )}
            {availableTags?.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} readOnly />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagsModal;
