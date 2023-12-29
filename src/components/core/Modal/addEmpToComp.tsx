import React, { useEffect } from "react";
import { Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchEmployees } from "../../../redux/employeeSlice";
const { Option } = Select;

interface AddEmplToCompModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddEmployee: (employeeId: number) => void;
}

const AddEmplToCompModal: React.FC<AddEmplToCompModalProps> = ({
  visible,
  onCancel,
  onAddEmployee,
}) => {
  const employeeData = useSelector((state: RootState) => state.employees.data);
  const companies = useSelector((state: RootState) => state.company.data);
  const dispatch = useDispatch<any>();

  const handleAddEmployee = (value: number) => {
    onAddEmployee(value);
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const allEmployeeIds = companies.flatMap((company) =>
    company.employees?.map((employee) => employee.id)
  );

  const filteredEmployees = employeeData.filter((employee) => {
    const employeeId = employee.id;
    return !allEmployeeIds.includes(employeeId);
  });

  return (
    <Modal
      title="Add Employee to Company"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Select
        style={{ width: 300 }}
        placeholder="Select an employee"
        onChange={handleAddEmployee}
      >
        {filteredEmployees.map((employee) => (
          <Option key={employee.id} value={employee.id}>
            {employee.employeeName + " - " + employee.employeeCode}
          </Option>
        ))}
      </Select>
    </Modal>
  );
};

export default AddEmplToCompModal;
