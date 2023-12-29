import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchCompanies } from "../../redux/companySlice";
import { fetchEmployees } from "../../redux/employeeSlice";
import { Button, Select, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getPositionColor } from "../../components/core/EmployeeTable";

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
    render: (text: any, record: Employee) => (
      <Button icon={<EyeOutlined />}>View</Button>
    ),
  },
];

const EmployeeOwner = () => {
  const companies = useSelector((state: RootState) => state.company.data);
  const employeeData = useSelector((state: RootState) => state.employees.data);
  const dispatch = useDispatch<any>();

  const [selectedCompanyId, setSelectedCompanyId] = useState<
    number | undefined
  >(undefined);

  const handleCompanyChange = (value: number | undefined) => {
    setSelectedCompanyId(value);
  };

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const allEmployeeIds = companies.flatMap((company) =>
    company.employees?.map((employee) => employee.id)
  );

  const data = employeeData.filter((employee) =>
    allEmployeeIds.includes(employee.id)
  );

  const filteredEmployees = selectedCompanyId
    ? data.filter((employee) =>
        companies
          .find((company) => company.id === selectedCompanyId)
          ?.employees?.some((e) => e.id === employee.id)
      )
    : data;

  return (
    <>
      <Select
        style={{ marginBottom: 30 }}
        placeholder="Select a company"
        onChange={handleCompanyChange}
        value={selectedCompanyId}
      >
        <Select.Option key={0} value={null}>
          All Companies
        </Select.Option>
        {companies?.map((company) => (
          <Select.Option key={company.id} value={company.id}>
            {company.name}
          </Select.Option>
        ))}
      </Select>
      <Table columns={columns} dataSource={filteredEmployees} />
    </>
  );
};

export default EmployeeOwner;
