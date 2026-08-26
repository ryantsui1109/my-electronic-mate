import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import st from "../../assets/saijo_takato.png";
import "../styles/mate.css";

import cn from "classnames";

function MateApp() {
  return (
    <div className="w-100">
      <img src={st} className="w-100"></img>
    </div>
  );
}

export default MateApp;
