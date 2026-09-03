import { Nav, Tab } from "react-bootstrap";
import CharacterInfo from "./CharacterInfo";
import AppConfig from "./AppConfig";
function ConfigTabs() {
  return (
    <>
      <Tab.Container defaultActiveKey="appConfig">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="appConfig">App設定</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="characterInfo">角色設定</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="appConfig">
            <AppConfig />
          </Tab.Pane>
          <Tab.Pane eventKey="characterInfo">
            <CharacterInfo />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
}

export default ConfigTabs;
