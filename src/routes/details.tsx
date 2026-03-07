import { Button, Form, Input, Select, Space, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function Mark({ field }: any) {
  const marks = Form.useWatch(
    ["academic detail", field.subField.name, "marks"],
    field.form,
  );

  return (
    <Space key={field.subField.key}>
      <Form.Item
        label="Board"
        rules={[{ required: true, message: "Field can not be empty" }]}
        name={[field.subField.name, "Board"]}
      >
        <Input placeholder="Boards" type="text" />
      </Form.Item>

      <Form.Item
        label="Marks Type"
        rules={[{ required: true, message: "Field can not be empty" }]}
        name={[field.subField.name, "marks"]}
      >
        <Select
          placeholder="Marks Type"
          options={[
            { value: "CGPA", label: "CGPA" },
            { value: "Percentage", label: "Percentage" },
          ]}
        />
      </Form.Item>

      {marks === "CGPA" ? (
        <Form.Item
          label="CGPA"
          rules={[{ required: true, message: " Cgpa is required" }]}
          name={[field.subField.name, "CGPA"]}
        >
          <InputNumber max={10} min={0} />
        </Form.Item>
      ) : marks === "Percentage" ? (
        <Form.Item
          label="Percentage"
          rules={[{ required: true, message: "Percentage is required" }]}
          name={[field.subField.name, "Percentage"]}
        >
          <InputNumber max={100} min={0} />
        </Form.Item>
      ) : null}

      {field.subField.name !== 0 && (
        <Button onClick={() => field.subOpt.remove(field.subField.name)}>
          <CloseOutlined />
        </Button>
      )}
    </Space>
  );
}

export default Mark;
