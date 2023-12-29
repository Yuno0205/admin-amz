import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  notification,
} from "antd";
import {
  addEmployeeToCompany,
  deleteCompany,
  fetchCompanies,
} from "../../redux/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddCompanyModal from "../../components/core/Modal/addCompanyModal";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import AddEmplToCompModal from "../../components/core/Modal/addEmpToComp";
import EmployeeAutoComplete from "../../components/AutoComplete";

const CompanyTable = () => {
  const loading = useSelector((state: RootState) => state.company.loading);
  const data = useSelector((state: RootState) => state.company.data);
  const user = useSelector((state: RootState) => state.auth.user);
  const employees = useSelector((state: RootState) => state.employees.data);
  const dispatch = useDispatch<any>();

  const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  const handleDelete = (id: number) => {
    dispatch(deleteCompany(id))
      .then(() => {
        notification.success({
          message: "Delete Successful",
          description: "Company has been deleted successfully.",
        });
      })
      .catch((error: any) => {
        console.error("Error deleting company:", error);
        notification.error({
          message: "Delete Failed",
          description: "An error occurred while deleting the company.",
        });
      });
  };

  const handleAddEmployee = (companyId: number) => {
    setSelectedCompanyId(companyId);
    setEmployeeModalVisible(true);
  };

  const handleEmployeeModalCancel = () => {
    setEmployeeModalVisible(false);
    setSelectedCompanyId(null);
  };

  const handleAddEmployeeToCompany = (employeeId: number) => {
    if (selectedCompanyId !== null) {
      dispatch(
        addEmployeeToCompany({ companyId: selectedCompanyId, employeeId })
      );
      setEmployeeModalVisible(false);
      setSelectedCompanyId(null);
      notification.success({
        message: "Successfully !",
        description: "Employee has been added successfully.",
      });
    }
  };

  const companyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Scale",
      dataIndex: "scale",
      key: "scale",
    },
    {
      title: "Add New Employee",
      key: "addnew",
      render: (text: any, record: any) =>
        user?.role == "admin" ? (
          <Button type="primary" onClick={() => handleAddEmployee(record.id)}>
            Add Employee
          </Button>
        ) : (
          <Button disabled>Not allown</Button>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) =>
        user?.role === "admin" ? (
          <Space size="middle">
            <Button icon={<EyeOutlined />}>View</Button>
            <Button icon={<EditOutlined />} href="#">
              Edit
            </Button>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this company?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Button icon={<EyeOutlined />}>View</Button>
        ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <div>
      <AddCompanyModal />
      <Table
        loading={loading === "pending"}
        columns={companyColumns}
        dataSource={data}
      />
      <AddEmplToCompModal
        visible={employeeModalVisible}
        onCancel={handleEmployeeModalCancel}
        onAddEmployee={handleAddEmployeeToCompany}
      />
    </div>
  );
};

export default CompanyTable;
