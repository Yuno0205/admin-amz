import React, { useState } from "react";
import { Form, Input, Modal, Button, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addLeaveRequest } from "../../../redux/leaveSlice";

const AddLeaveModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      dispatch(addLeaveRequest(values));
      setIsModalVisible(false);
      form.resetFields();
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
        Add Leave
      </Button>
      <Modal
        title="Add Leave Request"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="requesterName"
            label="Requester Name"
            rules={[
              { required: true, message: "Please input requester name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: "Please input the reason!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="days"
            label="Number of Days"
            rules={[
              { required: true, message: "Please input the number of days!" },
              {
                validator: (_, value) => {
                  if (value && parseInt(value, 10) >= 1) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Please enter a valid number greater than or equal to 1!"
                    )
                  );
                },
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="Start Date"
            rules={[
              { required: true, message: "Please select the start date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddLeaveModal;
