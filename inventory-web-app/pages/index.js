import styles from "../styles/Home.module.css";
import { Button, Checkbox, Form, Image, Input, Radio, Typography } from "antd";
import {
  EyeFilled,
  EyeInvisibleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/skeleton/Title";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
    router.push("/LandingPage");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-main-color">
        <div className=" w-auto" />
        <div
          className="flex justify-center flex-col"
          style={{ width: "540px" }}
        >
          <div className="flex items-center justify-center">
            <img
              className="w-20 h-20"
              src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
            />
            <Typography.Title style={{ margin: "0px 0px 0px 16px" }}>
              StockFlow
            </Typography.Title>
          </div>
          <div className="m-[90px] b">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                style={{ marginBottom: "28px" }}
              >
                <Input placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                style={{ marginBottom: "22px" }}
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? (
                      <EyeFilled style={{ opacity: 0.85 }} />
                    ) : (
                      <EyeInvisibleFilled style={{ opacity: 0.85 }} />
                    )
                  }
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                style={{ marginBottom: "22px", fontWeight: "400" }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" size="middle" htmlType="submit" block>
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className=" w-auto" />
      </div>
    </>
  );
}
