// EmployeeDetail.tsx
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Descriptions, Button } from "antd";
import { RootState } from "../redux/store";
import { fetchEmployees } from "../redux/employeeSlice";
import { BackwardOutlined } from "@ant-design/icons";

interface EmployeeDetailProps {}

const EmployeeDetail: React.FC<EmployeeDetailProps> = () => {
  //   const { employeeId } = useParams<{ employeeId: string }>();
  const location = useLocation();
  const employeeId = location.pathname.split("/").pop();

  const id = Number(employeeId);

  const employees = useSelector((state: RootState) => state.employees.data);

  const employee = useSelector((state: RootState) =>
    state.employees.data.find((emp: any) => emp.id === id)
  );

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <h2>Employee Detail</h2>
      <Descriptions title="Employee Information" bordered>
        <Descriptions.Item label="ID">{employee.id}</Descriptions.Item>
        <Descriptions.Item label="Employee Code">
          {employee.employeeCode}
        </Descriptions.Item>
        <Descriptions.Item label="Name">
          {employee.employeeName}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {employee.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
        <Descriptions.Item label="Position">
          {employee.position.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Department">
          {employee.department}
        </Descriptions.Item>
        <Descriptions.Item label="Basic Salary">
          {employee.baseSalary}
        </Descriptions.Item>
        <Descriptions.Item label="Allowance">
          {employee.allowance}
        </Descriptions.Item>
        <Descriptions.Item label="Actual Working Days">
          {employee.workdays}
        </Descriptions.Item>
        <Descriptions.Item label="Monthly Salary">
          {employee.monthSalary !== undefined
            ? employee.monthSalary
            : "Not calculated"}
        </Descriptions.Item>
        {/* Add more details as needed */}
      </Descriptions>
      <Button
        style={{ marginTop: 30 }}
        type="primary"
        onClick={() => window.history.back()}
        icon={<BackwardOutlined />}
      >
        Back
      </Button>
    </div>
  );
};

export default EmployeeDetail;
