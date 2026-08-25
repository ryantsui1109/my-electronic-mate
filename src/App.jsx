import WinCtrlBar from "./ui/WinCtrlBar.jsx";
import CharacterInfo from "./ui/CharacterInfo.jsx";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./styles/index.css";
import cn from "classnames";

function App() {
  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <WinCtrlBar></WinCtrlBar>
      </div>
      <div id="container">
        <Container className="w-100">
          <CharacterInfo></CharacterInfo>
        </Container>
      </div>
    </>
  );
}

export default App;
