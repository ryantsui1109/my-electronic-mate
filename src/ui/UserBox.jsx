import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { CloseButton } from "react-bootstrap";

function UserBox({ message, chatIndex, setChatHistory }) {
  async function handleDelete() {
    window.api.send("delete-conversation", chatIndex);
    const chatHistory = await window.historyStore.get("chats");
    setChatHistory(chatHistory);
  }

  return (
    <Container className="d-flex justify-content-end mb-3">
      <Toast className="bg-info shadow-none d-flex">
        <Toast.Body className="">{message}</Toast.Body>
        <CloseButton
          className="me-2 m-auto"
          onClick={handleDelete}
        ></CloseButton>
      </Toast>
    </Container>
  );
}

export default UserBox;
