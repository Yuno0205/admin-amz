import React, { useState } from "react";
import { Form, Input, Modal, Button, DatePicker, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addCompany } from "../../../redux/companySlice";

const AddCompanyModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(addCompany(values));
      setIsModalVisible(false);
      form.resetFields();
      notification.success({
        message: "Add company Successful",
        description: "Company has been added successfully.",
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: "16px" }}
      >
        Add Company
      </Button>
      <Modal
        title="Add Company"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: "Please input company name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Asdress"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="scale"
            label="Scale"
            rules={[{ required: true, message: "Please input the scale!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCompanyModal;
