import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Toast } from "react-bootstrap";

function AssistantBox({ message }) {
  return (
    <>
      <Container className="d-flex mb-3">
        <Toast className="shadow-none">
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Container>
    </>
  );
}

export default AssistantBox;
