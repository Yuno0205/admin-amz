import {
  Button,
  Dropdown,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
  notification,
} from "antd";
import EmployeeTable from "../../components/core/EmployeeTable";

import { useEffect, useState } from "react";
import {
  addEmployee,
  fetchEmployees,
  filterEmployeesByDepartment,
  searchEmployees,
  updateEmployee,
} from "../../redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Option } from "antd/es/mentions";
import SearchComponent from "../../components/core/Search";
import { RootState } from "../../redux/store";
import {
  DollarCircleOutlined,
  EuroCircleOutlined,
  IdcardOutlined,
  MailOutlined,
  MoneyCollectOutlined,
  MoneyCollectTwoTone,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const validPositions = [
  "Front-end",
  "Backend",
  "Legal",
  "Designer",
  "Manager",
  "Other",
  "BA",
];

const UsersPage = () => {
  const dispatch = useDispatch<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [form] = Form.useForm();

  // Filter
  const { data, searchResults } = useSelector(
    (state: RootState) => state.employees
  );
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const employeesToDisplay =
    searchResults.length > 0
      ? searchResults.filter((employee) =>
          selectedDepartment
            ? employee.department.toLowerCase() ===
              selectedDepartment.toLowerCase()
            : true
        )
      : data.filter((employee) =>
          selectedDepartment
            ? employee.department.toLowerCase() ===
              selectedDepartment.toLowerCase()
            : true
        );

  const handleDepartmentChange = (selectedDepartment: any) => {
    setSelectedDepartment(selectedDepartment);
    dispatch(filterEmployeesByDepartment(selectedDepartment));
  };

  const showModal = (employee: Employee | null) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
    form.setFieldsValue(employee);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const allowance = parseFloat(values.allownance);
        const baseSalary = parseFloat(values.baseSalary);

        const workdays = values.workdays || 0;

        const employeeData: Employee = {
          ...selectedEmployee,
          ...values,
          allownance: allowance,
          baseSalary: baseSalary,
          workdays: workdays,
        };

        dispatch(addEmployee(employeeData));

        setIsModalVisible(false);
        form.resetFields();
        notification.success({
          message: "Delete Successful",
          description: "Employee has been deleted successfully.",
        });
      })
      .catch((errorInfo) => {
        console.log("Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const positionValidator = (value: any) => {
    if (!value || value.length === 0) {
      return Promise.reject("Please select at least one employee position!");
    }
    return Promise.resolve();
  };

  return (
    <Flex style={{ width: "100%", backgroundColor: "white" }}>
      <Flex vertical flex={1}>
        <Flex
          style={{ margin: "25px 0", padding: "0 20px" }}
          justify="space-between"
        >
          <Flex gap={20}>
            <div style={{ width: 300 }}>
              <SearchComponent />
            </div>

            <Select
              style={{ width: 200 }}
              placeholder="Select department"
              onChange={handleDepartmentChange}
            >
              <Option value="">All</Option>
              <Option value="IT">IT</Option>
              <Option value="Design">Design</Option>
              <Option value="Legal">Legal</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Flex>
          <Button type="primary" onClick={() => showModal(null)}>
            Add Employee
          </Button>
          <Modal
            title={"Add Employee"}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form} name="employeeForm">
              <Form.Item
                label="Employee Code"
                name="employeeCode"
                rules={[
                  { required: true, message: "Please input employee code!" },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input prefix={<IdcardOutlined />} />
              </Form.Item>

              <Form.Item
                label="Employee Name"
                name="employeeName"
                rules={[
                  { required: true, message: "Please input employee name!" },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please select at least one employee department!",
                  },
                ]}
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
                name="allownance"
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
            </Form>
          </Modal>
        </Flex>
        <EmployeeTable employeesToDisplay={employeesToDisplay} />
      </Flex>
    </Flex>
  );
};

export default UsersPage;
