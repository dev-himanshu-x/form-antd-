import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { useState } from "react";
import { Button, Form, Input, Select, Divider, Space, Row } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import Mark from "./details";
import type { GetProps } from "antd";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Data />
    </QueryClientProvider>
  );
}

function Data() {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [postOffices, setPostOffices] = useState<any[]>([]);
  const [btndisabled, setbtndisabled] = useState(true);
  const [pin, setPin] = useState("");

  const api = "https://api.postalpincode.in/pincode/";
  const url = api + pin;

  const [form] = Form.useForm();
  const { Search, TextArea } = Input;

  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps["onSearch"] = (value) => setPin(value);

  const { data } = useQuery({
    queryKey: ["pincode", pin],
    queryFn: () => fetch(url).then((res) => res.json()),
    enabled: pin.length === 6,
  });

  if (data && data[0].PostOffice.length > 0) {
    setPostOffices(data[0].PostOffice);
    setOptions(
      data[0].PostOffice.map((po: any) => ({
        value: po.Name,
      })),
    );
    setbtndisabled(false);
    setPin("");
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
                onSearch={onSearch}
                placeholder="Pincode"
                maxLength={6}
                type="number"
                style={{ maxWidth: "12.5rem" }}
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
            {(subFields, subOpt) => (
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
              >
                {subFields.map((subField, index) => (
                  <Mark
                    key={index}
                    field={{
                      subField,
                      index,
                      subOpt,
                      form: { form },
                    }}
                  />
                ))}
                <Button type="dashed" onClick={() => subOpt.add()} block>
                  + Add More
                </Button>
              </div>
            )}
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
