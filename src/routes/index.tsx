import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import axios from "axios";
export const Route = createFileRoute("/")({ component: App });
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Divider, Space, Row } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import Mark from "./details";

function App() {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [postOffices, setPostOffices] = useState<any[]>([]);
  const [btndisabled, setbtndisabled] = useState(true);
  const api = "https://api.postalpincode.in/pincode/";
  const [form] = Form.useForm();
  const { Search } = Input;
  const pincode = Form.useWatch(["address", "post_office", "pincode"], form);
  var url = api + pincode;
  const { TextArea } = Input;

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
          form.setFieldsValue({
            address: {
              post_office: {
                post_office: "",
                state: "",
                district: "",
                city: "",
              },
            },
          });
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
    form.resetFields();
  };
  return (
    <div className="p-3 bg-[#eceeff] h-screen">
      <Form
        layout="inline"
        form={form}
        onFinish={onFinish}
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <Divider titlePlacement="start">Address</Divider>
        <Space>
          <Row gutter={[6, 20]}>
            <Form.Item
              label="Pincode"
              rules={[{ required: true, message: "Field can not be empty" }]}
              name={["address", "post_office", "pincode"]}
            >
              <Search
                placeholder="Pincode"
                maxLength={6}
                type="number"
                style={{ minWidth: "auto", maxWidth: "12.5rem" }}
              />
            </Form.Item>
            <Form.Item
              label="Post Office"
              rules={[{ required: true, message: "Field can not be empty" }]}
              name={["address", "post_office", "post_office"]}
            >
              <Select
                style={{ width: 140 }}
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
            <Form.Item
              label="Address"
              rules={[{ required: true, message: "Field can not be empty" }]}
              name={["address", "post_office", "address"]}
            >
              <TextArea
                style={{ height: 80, resize: "none" }}
                placeholder="Home Address"
              />
            </Form.Item>
          </Row>
        </Space>
        <Divider titlePlacement="start">Academic Details</Divider>
        <Form.Item>
          <Form.List name={["academic detail"]} initialValue={[{}]}>
            {(subFields, subOpt) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 16,
                  }}
                >
                  {subFields.map((subField, index) => (
                    <Mark
                      field={{
                        subField: subField,
                        index: index,
                        subOpt: subOpt,
                        form: { form },
                      }}
                    />
                  ))}
                  <Button type="dashed" onClick={() => subOpt.add()} block>
                    + Add More
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Divider titlePlacement="start">Submit</Divider>
        <Button htmlType="submit" className="w-full">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default App;
