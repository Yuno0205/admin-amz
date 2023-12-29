import React, { useState } from "react";
import { Input, Space, Typography } from "antd";
import {
  DollarCircleOutlined,
  PercentageOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import SalaryAdmin from "../../components/SalaryManagement";

const { Title, Text } = Typography;

const SalaryManagement = () => {
  const [baseSalary, setBaseSalary] = useState(8000000);
  const [allowance, setAllowance] = useState(0);
  const [actualWorkingDays, setActualWorkingDays] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);
  // const dispatch = useDispatch<any>();

  const calculateSalary = () => {
    const salary = Math.round(
      ((baseSalary + allowance) / 26) * actualWorkingDays
    );
    const formattedSalary = new Intl.NumberFormat("en-US").format(salary);
    return formattedSalary;
  };

  const formatNumber = (value: any) => {
    // Sử dụng Intl.NumberFormat để định dạng số
    const formattedValue = new Intl.NumberFormat("en-US").format(value);
    return formattedValue;
  };

  return (
    <div>
      {user?.role == "admin" ? (
        <SalaryAdmin />
      ) : (
        <div>
          <Title level={2}>Salary Management</Title>
          <Space direction="vertical" style={{ marginBottom: "16px" }}>
            <Space align="center">
              <DollarCircleOutlined style={{ fontSize: "24px" }} />
              <span style={{ fontSize: "16px" }}>Base Salary(VND):</span>

              <Title level={2}>{formatNumber(8000000)}</Title>
            </Space>
            <Space align="center">
              <PlusCircleOutlined style={{ fontSize: "24px" }} />
              <span style={{ fontSize: "16px" }}>Allowance:</span>
              <Input
                type="number"
                suffix="VND"
                value={allowance}
                onChange={(e) => setAllowance(Number(e.target.value))}
                min={0}
                step={1}
              />
            </Space>
            <Space align="center">
              <CalendarOutlined style={{ fontSize: "24px" }} />
              <span style={{ fontSize: "16px" }}>Actual Working Days</span>
              <Input
                defaultValue={26}
                type="number"
                suffix="Days"
                value={actualWorkingDays}
                onChange={(e) => setActualWorkingDays(Number(e.target.value))}
                min={0}
                step={1}
              />
            </Space>
          </Space>
          <Title level={3}>Total Monthly Salary:</Title>
          <Text type="success" style={{ fontSize: "24px" }}>
            {calculateSalary()} VND
          </Text>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;
