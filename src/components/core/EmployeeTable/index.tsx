import {
  Table,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Button,
  Popconfirm,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { deleteEmployee, fetchEmployees } from "../../../redux/employeeSlice";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditEmployeeModal from "../Modal/EditEmployeeModal";
import { Link } from "react-router-dom";

export const getPositionColor = (position: string) => {
  const positionColors: Record<string, string> = {
    "Front-end": "geekblue",
    Designer: "volcano",
    "Back-end": "gold",
    Legal: "red",
    Tester: "green",
    BA: "purple",
    Developer: "cyan",
    Other: "black",
    Manager: "indigo",
  };

  return positionColors[position] || "default";
};

const EmployeeTable = ({ employeesToDisplay }: any) => {
  const dispatch = useDispatch<any>();

  const loading = useSelector((state: RootState) => state.employees.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const showEditModal = (employee: Employee) => {
    if (employee) {
      setEditModalVisible(true);
      setSelectedEmployee(employee);
    } else {
      console.log("Không select được employee");
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedEmployee(null);
  };

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      sorter: (a: any, b: any) => a.employeeName.localeCompare(b.employeeName),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: string[]) => (
        <>
          {position.map((pos) => (
            <Tag color={getPositionColor(pos)} key={pos}>
              {pos}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Employee) =>
        user?.role === "admin" ? (
          <Space size="middle">
            <Link to={`${record.id}`}>
              <Button icon={<EyeOutlined />}>View</Button>
            </Link>
            <Button
              icon={<EditOutlined />}
              onClick={() => showEditModal(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this employee?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteEmployee(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Link to={`${record.id}`}>
            <Button icon={<EyeOutlined />}>View</Button>
          </Link>
        ),
    },
  ];

  const handleDeleteEmployee = (id: number) => {
    dispatch(deleteEmployee(id))
      .then(() => {
        notification.success({
          message: "Delete Successful",
          description: "Employee has been deleted successfully.",
        });
      })
      .catch((error: any) => {
        console.error("Error deleting employee:", error);
        notification.error({
          message: "Delete Failed",
          description: "An error occurred while deleting the employee.",
        });
      });
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const reversedEmployees = employeesToDisplay.slice().reverse();

  return (
    <>
      <Table
        columns={columns}
        dataSource={reversedEmployees}
        loading={loading === "pending"}
      />
      <EditEmployeeModal
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        employee={selectedEmployee}
      />
    </>
  );
};

export default EmployeeTable;
