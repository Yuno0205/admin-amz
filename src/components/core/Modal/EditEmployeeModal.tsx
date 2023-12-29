import { Modal, Form, Input, Button, notification, Select } from "antd";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../../redux/employeeSlice";
import {
  DollarCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";

interface EditEmployeeModalProps {
  visible: boolean;
  onCancel: () => void;
  employee: Employee | null;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  visible,
  onCancel,
  employee,
}) => {
  const dispatch = useDispatch<any>();

  const handleUpdateEmployee = (values: Employee) => {
    if (employee) {
      const updatedEmployee: Employee = { ...employee, ...values };
      dispatch(updateEmployee(updatedEmployee));
      onCancel(); // Ẩn modal sau khi cập nhật nhân viên
      notification.success({
        message: "Updated Successful",
        description: "Employee has been updated.",
      });
    }
  };

  const positionValidator = (value: any) => {
    if (!value || value.length === 0) {
      return Promise.reject("Please select at least one employee position!");
    }
    return Promise.resolve();
  };

  const validPositions = [
    "Front-end",
    "Backend",
    "Legal",
    "Designer",
    "Manager",
    "BA",
    "Other",
  ];

  return (
    <Modal
      title="Edit Employee"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="editEmployeeForm"
        onFinish={handleUpdateEmployee}
        initialValues={employee ?? {}}
      >
        <Form.Item
          label="Employee Name"
          name="employeeName"
          rules={[{ required: true, message: "Please input employee name!" }]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input phone number!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid phone number!",
            },
          ]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please select at least one employee position!",
            },
            { validator: positionValidator },
          ]}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select mode="multiple" placeholder="Select positions">
            {validPositions.map((position) => (
              <Option key={position} value={position}>
                {position}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Select style={{ width: 200 }} placeholder="Select department">
            <Option value="IT">IT</Option>
            <Option value="Design">Design</Option>
            <Option value="Legal">Legal</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Base Salary"
          name="baseSalary"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: "Please fill base salary!",
            },
          ]}
        >
          <Input
            type="number"
            prefix={<DollarCircleOutlined />}
            step={1000000}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Allowance"
          name="allowance"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: true,
              message: "Please fill allowance!",
            },
          ]}
        >
          <Input
            type="number"
            step={100000}
            prefix={<DollarCircleOutlined />}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Workdays"
          name="workdays"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          hidden
        >
          <Input type="number" value={0} min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          /
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
