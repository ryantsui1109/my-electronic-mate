import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import st from "../../assets/saijo_takato.png";
import "../styles/mate.css";
import { Form } from "react-bootstrap";

import cn from "classnames";
import { useState } from "react";

function MateApp() {
  const [showDialog, setShowDialog] = useState(false);
  function handleMouseEnter() {
    setShowDialog(true);
  }
  function handleMouseLeave() {
    setShowDialog(false);
  }
  return (
    <>
      <div onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        <div
          className="w-100"
          
        >
          <img src={st} className="w-100"></img>
        </div>
        <div
          style={{ display: showDialog ? "" : "none" }}
          className={cn("container", "bg-white", "p-2", "rounded")}
        >
          <Form.Control
            size="sm"
            type="text"
            placeholder="與桌寵對話"
          ></Form.Control>
        </div>
      </div>
    </>
  );
}

export default MateApp;
