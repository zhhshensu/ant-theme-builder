import React, { useEffect } from "react"; // 修改为 useEffect
import moment from "moment";
import { Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Select, Switch, Radio, Button, Upload, DatePicker, Progress, Input } from "antd";
import PreviewWrapper from "../PreviewWrapper";
import "./style.less";

const FormItem = Form.Item;
const { Option } = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ExampleForm = (props) => {
  const { size, disabled, menuTheme, onMenuThemeChange } = props;

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const handleMenuThemeChange = (value) => {
    typeof onMenuThemeChange === "function" && onMenuThemeChange(value);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const renderForm = () => {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form form="form" name="example-form" className="example-form" colon={false} onSubmit={handleSubmit}>
        {/* <FormItem {...formItemLayout} label="Menu Theme" name="MenuTheme">
          <Select
            size={size}
            disabled={disabled}
            style={{ width: 300 }}
            onChange={handleMenuThemeChange}
          >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Select[multiple]" name="colors">
          <Select
            size={size}
            disabled={disabled}
            mode="multiple"
            placeholder="Please select favourite colors"
            style={{ width: 300 }}
          >
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </FormItem>
        <FormItem {...formItemLayout} label="Switch" name="switch">
          <Switch size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="名称" name="Name">
          <Input size={size} disabled={disabled} placeholder="Name" style={{ width: 300 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="Radio.Group" name="RadioGroup">
          <RadioGroup size={size} disabled={disabled}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="Radio.Button" name="RadioButton">
          <RadioGroup size={size} disabled={disabled}>
            <RadioButton value="a">item 1</RadioButton>
            <RadioButton value="b">item 2</RadioButton>
            <RadioButton value="c">item 3</RadioButton>
          </RadioGroup>
        </FormItem>
        <FormItem
          style={{ marginTop: 30 }}
          wrapperCol={{ span: 12, offset: formItemLayout.labelCol.span }}
          name="progress"
        >
          <Progress percent={60} size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="Date" name="date">
          <DatePicker size={size} disabled={disabled} />
        </FormItem>
        <FormItem {...formItemLayout} label="Upload" name="file">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button size={size} disabled={disabled}>
              <UploadOutlined /> Click to upload
            </Button>

            <a href="#" style={{ marginLeft: 20 }}>
              上传文件
            </a>
          </Upload>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: formItemLayout.labelCol.span }}>
          <Button size={size} disabled={disabled} style={{ marginRight: 10 }}>
            Reset
          </Button>
          <Button size={size} disabled={disabled} type="default" style={{ marginRight: 10 }}>
            Cancel
          </Button>
          <Button size={size} disabled={disabled} type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem> */}
      </Form>
    );
  };

  return (
    <PreviewWrapper id="Form" title="Form">
      <div className="components">
        <div className="component-row">{renderForm()}</div>
      </div>
    </PreviewWrapper>
  );
};

export default ExampleForm;
