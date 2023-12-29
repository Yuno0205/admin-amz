import React, { useEffect } from "react";
import { Table, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/store";
import { fetchEmployees, updateSalary } from "../../redux/employeeSlice";

const SalaryAdmin = () => {
  const employees = useSelector((state: RootState) => state.employees.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
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
    },
    {
      title: "Base Salary",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (text: number) => formatCurrency(text),
    },
    {
      title: "Allowance",
      dataIndex: "allowance",
      key: "allowance",
      render: (text: number, record: Employee) => (
        <Input
          type="number"
          min={0}
          value={text}
          onChange={(e) =>
            handleUpdateEmployeeField(
              record,
              "allowance",
              parseFloat(e.target.value) || 0
            )
          }
        />
      ),
    },
    {
      title: "Actual Working Days",
      dataIndex: "workdays",
      key: "workdays",
      render: (text: number, record: Employee) => (
        <Input
          type="number"
          value={text}
          min={0}
          onChange={(e) =>
            handleUpdateEmployeeField(
              record,
              "workdays",
              parseFloat(e.target.value) || 0
            )
          }
        />
      ),
    },
    {
      title: "Monthly Salary",

      dataIndex: "monthSalary",
      key: "monthSalary",
      render: (text: number | undefined, record: Employee) =>
        formatCurrency(calculateMonthlySalary(record)),
    },
  ];

  const handleUpdateEmployeeField = (
    record: Employee,
    field: string,
    value: number
  ) => {
    const updatedRecord = { ...record, [field]: value };

    dispatch(
      updateSalary(updateEmployeeAndCalculateSalary(employees, updatedRecord))
    );
  };

  const calculateMonthlySalary = (record: Employee): number => {
    const { baseSalary, allowance, workdays } = record;

    const monthlySalary = (baseSalary / 26) * workdays + allowance;

    console.log(monthlySalary, monthlySalary, allowance, workdays);

    return monthlySalary;
  };

  const updateEmployeeAndCalculateSalary = (
    data: Employee[],
    updatedRecord: Employee
  ): Employee[] => {
    return data.map((item) =>
      item.employeeCode === updatedRecord.employeeCode
        ? {
            ...item,
            ...updatedRecord,
            monthSalary: calculateMonthlySalary(updatedRecord),
          }
        : item
    );
  };

  return (
    <div>
      <h1>Employee Salary Management</h1>
      <Table dataSource={employees} columns={columns} />
    </div>
  );
};

export default SalaryAdmin;
