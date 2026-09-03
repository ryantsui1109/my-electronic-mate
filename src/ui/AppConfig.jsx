import { useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

function AppConfig() {
  const formRef = useRef(null);

  useEffect(() => {
    async function getAppConfig(params) {
      const appConfig = await window.appConfig.get();

      Object.entries(appConfig).forEach(([key, value]) => {
        formRef.current.elements[key].value = value;
      });
    }

    getAppConfig();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const fdObject = Object.fromEntries(fd.entries());
    console.log(fdObject);
    window.appConfig.set(fdObject);
  }
  return (
    <>
      <div>
        <Form ref={formRef} id="app-config" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicBaseURL">
            <Form.Label>Base URL</Form.Label>
            <Form.Control placeholder="請填寫 API 網址" name="baseURL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicApiKey">
            <Form.Label>API key</Form.Label>
            <Form.Control
              placeholder="請填寫 API key"
              type="password"
              name="apiKey"
            ></Form.Control>
            <Form.Text>透過 Electron SafeStorage 加密後儲存</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicModel">
            <Form.Label>模型</Form.Label>
            <Form.Control placeholder="請填寫模型名稱" name="model" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMaxToken">
            <Form.Label>最大 token 數量</Form.Label>
            <Form.Control placeholder="請填寫最大 token 數" name="maxToken" />
            <Form.Text>超過此上限的對話記錄將被自動裁剪</Form.Text>
          </Form.Group>
        </Form>
      </div>
      <div className="d-flex justify-content-end">
        <Button type="submit" form="app-config">
          儲存
        </Button>
      </div>
    </>
  );
}

export default AppConfig;
