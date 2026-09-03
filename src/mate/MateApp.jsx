import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import st from "../../assets/saijo_takato.png";
import "../styles/mate.css";
import { Form } from "react-bootstrap";

import cn from "classnames";
import { useState, useRef, useEffect } from "react";

function MateApp() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const inputRef = useRef(null);

  const showDialog = isHovered || isFocused;

  useEffect(() => {
    function handleResult(res) {
      setAiResponse((prev) => prev + res);
    }

    function handleDialogueEnd() {
      setTimeout(() => {
        setAiResponse("");
      }, 6000);
    }

    window.api.handle("dialogue-result", handleResult);
    window.api.handle("dialogue-end", handleDialogueEnd);
    return () => {
      window.api.remove("dialogue-result", handleResult);
      window.api.remove("dialogue-end", handleDialogueEnd);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    window.dialogue.send(fd.get("prompt"));
    inputRef.current.value = "";
    inputRef.current.blur();
    setIsFocused(false);
  }

  return (
    <>
      <div
        className="position-relative d-inline-block w-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-100">
          <img src={st} className="w-100" alt="mate" />
        </div>

        {aiResponse && (
          <div
            className={cn(
              "position-absolute",
              "top-0",
              "start-0",
              "w-100",
              "bg-white",
              "p-2",
              "rounded",
              "shadow-sm",
              "z-3",
            )}
          >
            {aiResponse}
          </div>
        )}

        <div
          style={{ display: showDialog ? "block" : "none" }}
          className={cn(
            "position-absolute",
            "bottom-0",
            "start-0",
            "w-100",
            "p-2",
            "z-3",
          )}
        >
          <Form
            onSubmit={handleSubmit}
            className="bg-white p-1 rounded shadow-sm"
          >
            <Form.Control
              ref={inputRef}
              size="sm"
              type="text"
              name="prompt"
              placeholder="與桌寵對話"
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default MateApp;
