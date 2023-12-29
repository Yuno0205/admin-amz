import React, { useState } from "react";
import { AutoComplete, AutoCompleteProps, Input } from "antd";

const { Option } = AutoComplete;

const employeeData = [
  {
    employeeCode: "IMP1",
    employeeName: "Jeff Lind",
    phoneNumber: "459.279.1774",
    email: "Michelle_Hudson@yahoo.com",
    position: ["Front-end"],
    department: "IT",
    id: "1",
  },
  {
    employeeCode: "IMP2",
    employeeName: "Christopher Stoltenberg PhD",
    phoneNumber: "(661) 752-2253 x64583",
    email: "Donnell_Terry38@gmail.com",
    position: ["Designer"],
  },
];

interface EmployeeAutoCompleteProps extends AutoCompleteProps {
  employeeData: Employee[];
  onChange?: any;
}

const EmployeeAutoComplete = ({
  employeeData,
  onChange,
  ...props
}: EmployeeAutoCompleteProps) => {
  // State để lưu giá trị autocomplete
  const [value, setValue] = useState("");

  // Hàm xử lý sự kiện khi giá trị autocomplete thay đổi
  const handleSearch = (searchText: string) => {
    setValue(searchText);
  };

  // Hàm xử lý sự kiện khi một mục được chọn từ danh sách autocomplete
  const onSelect = (value: any) => {
    console.log("onSelect", value);
  };

  const handleChange = (changedValue: string) => {
    setValue(changedValue);
    if (onChange) {
      onChange(changedValue, null);
    }
  };

  return (
    <AutoComplete
      value={value}
      dataSource={employeeData.map((employee) => (
        <Option
          key={employee.id}
          value={`${employee.employeeName} - ${employee.id}`}
        >
          {employee.employeeName} - {employee.id}
        </Option>
      ))}
      onSelect={onSelect}
      onSearch={handleSearch}
      onChange={handleChange}
      {...props}
    >
      <Input.Search placeholder="Nhập tên nhân viên" />
    </AutoComplete>
  );
};

export default EmployeeAutoComplete;
