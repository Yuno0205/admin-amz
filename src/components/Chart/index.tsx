import { Line } from "@ant-design/charts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchEmployees } from "../../redux/employeeSlice";

const Chart = () => {
  const dataEmp = useSelector((state: RootState) => state.employees.data);
  const dispatch = useDispatch<any>();

  const data = dataEmp.map((dataa) => ({
    code: dataa.employeeName,
    salary: dataa.baseSalary,
  }));

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const config = {
    data,

    xField: "code",
    yField: "salary",
  };

  return <Line {...config} />;
};
export default Chart;
