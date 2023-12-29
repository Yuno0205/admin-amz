import { Card, Col, Flex, Row, Statistic } from "antd";
import { useSelector } from "react-redux";

import Page403 from "../Error/403";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BankOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import LeaveForm from "../../components/core/LeaveRequests";
import Chart from "../../components/Chart";
import { RootState } from "../../redux/store";

const AdminPage = () => {
  const user = useSelector((state: any) => state.auth.user);
  const companies = useSelector((state: RootState) => state.company.data);
  const employees = useSelector((state: RootState) => state.employees.data);

  return (
    <>
      {user && user.role == "admin" ? (
        <>
          <Flex style={{ width: "100%" }} gap={15}>
            <Card style={{ width: "25%" }} bordered={false}>
              <Statistic
                title="Companies"
                value={companies.length}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<BankOutlined />}
              />
            </Card>

            <Card style={{ width: "25%" }} bordered={false}>
              <Statistic
                title="Employees"
                value={employees.length}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<UsergroupAddOutlined />}
              />
            </Card>
            <Card style={{ width: "25%" }} bordered={false}>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>

            <Card style={{ width: "25%" }} bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Flex>

          <Flex style={{ padding: 20, marginTop: 60 }}>
            <LeaveForm />
          </Flex>

          <Flex style={{ padding: 20 }}>
            <Flex flex={2}>
              <Chart />
            </Flex>
          </Flex>
        </>
      ) : (
        <Page403 />
      )}
    </>
  );
};

export default AdminPage;
