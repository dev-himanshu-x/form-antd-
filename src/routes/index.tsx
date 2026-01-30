import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import axios from "axios";

export const Route = createFileRoute("/")({ component: App });

import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Divider, Space, InputNumber } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { CloseOutlined } from "@ant-design/icons";

function App() {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [postOffices, setPostOffices] = useState<any[]>([]);
  const [btndisabled, setbtndisabled] = useState(true);

  const api = "https://api.postalpincode.in/pincode/";
  const [form] = Form.useForm();
  const { Search } = Input;
  const pincode = Form.useWatch(["address", "post_office", "pincode"], form);
  const marks = Form.useWatch(["academic detail", 0, "marks"], form);
  var url = api + pincode;

  useEffect(() => {
    if (pincode && pincode.length === 6) {
      axios.get(url).then((response) => {
        if (response.data[0].PostOffice.length > 0) {
          setPostOffices(response.data[0].PostOffice);
          setOptions(
            response.data[0].PostOffice.map((po: any) => ({
              value: po.Name,
            })),
          );
          setbtndisabled(false);
        }
      });
    }
  }, [pincode]);

  const change = (value: string) => {
    const selected = postOffices.find((po) => po.Name === value);
    if (selected) {
      form.setFieldsValue({
        address: {
          post_office: {
            state: selected.State,
            district: selected.District,
            city: selected.Region,
          },
        },
      });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="p-3">
      <Form layout="inline" form={form} onFinish={onFinish}>
        <Divider titlePlacement="start">Address</Divider>

        <Space>
          <Form.Item
            label="Pincode"
            rules={[{ required: true }]}
            name={["address", "post_office", "pincode"]}
          >
            <Search placeholder="Pincode" maxLength={6} type="number" />
          </Form.Item>

          <Form.Item
            label="Post Office"
            rules={[{ required: true }]}
            name={["address", "post_office", "post_office"]}
          >
            <Select
              placeholder="Post Office"
              options={options}
              disabled={btndisabled}
              onChange={change}
            />
          </Form.Item>

          <Form.Item label="State" name={["address", "post_office", "state"]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="District"
            name={["address", "post_office", "district"]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="City" name={["address", "post_office", "city"]}>
            <Input disabled />
          </Form.Item>
        </Space>

        <Form.Item
          label="Address"
          rules={[{ required: true }]}
          name={["address", "post_office", "address"]}
        >
          <Input />
        </Form.Item>

        <Divider titlePlacement="start">Academic Details</Divider>

        <Form.Item>
          <Form.List name={["academic detail"]} initialValue={[{}]}>
            {(subFields, subOpt) => (
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
              >
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item
                      label="Board"
                      rules={[{ required: true }]}
                      name={[subField.name, "Board"]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Marks Type"
                      rules={[{ required: true }]}
                      name={[subField.name, "marks"]}
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
                        rules={[{ required: true }]}
                        name={[subField.name, "CGPA"]}
                      >
                        <InputNumber max={10} min={0} />
                      </Form.Item>
                    ) : marks === "Percentage" ? (
                      <Form.Item
                        label="Percentage"
                        rules={[{ required: true }]}
                        name={[subField.name, "Percentage"]}
                      >
                        <InputNumber max={100} min={0} />
                      </Form.Item>
                    ) : null}

                    {subField.name !== 0 && (
                      <Button onClick={() => subOpt.remove(subField.name)}>
                        <CloseOutlined />
                      </Button>
                    )}
                  </Space>
                ))}

                <Button type="dashed" onClick={() => subOpt.add()} block>
                  + Add More
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        <Button htmlType="submit" className="w-full">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
