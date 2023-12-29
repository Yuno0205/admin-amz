import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Table, Tag, Space, Flex } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  approveLeaveRequest,
  declineLeaveRequest,
  fetchLeaveRequests,
} from "../../../redux/leaveSlice";
import { RootState } from "../../../redux/store";
import AddLeaveModal from "../Modal/addLeaveModal";
import { format } from "date-fns";
import Step from "../Step";

const LeaveForm = () => {
  const loading = useSelector((state: RootState) => state.leave.loading);
  const leaveData = useSelector((state: RootState) => state.leave.data);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchLeaveRequests());
  }, [dispatch]);

  const handleApprove = (requestId: number) => {
    dispatch(approveLeaveRequest(requestId));
  };

  const handleDecline = (requestId: number) => {
    dispatch(declineLeaveRequest(requestId));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Requester Name",
      dataIndex: "requesterName",
      key: "requesterName",
    },
    {
      title: "Number of Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>{format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: LeaveRequest) =>
        user?.role == "admin" ? (
          <Space size="middle">
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleApprove(record.id)}
              disabled={record.status !== "Pending"}
            >
              Accept
            </Button>
            <Button
              icon={<CloseOutlined />}
              danger
              onClick={() => handleDecline(record.id)}
              disabled={record.status !== "Pending"}
            >
              Decline
            </Button>
          </Space>
        ) : (
          <Button ghost disabled>
            Not allowed
          </Button>
        ),
    },
  ];

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "pending":
        return "gold";
      case "approved":
        return "green";
      case "declined":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div>
      <Flex style={{ marginLeft: 40 }}>
        <AddLeaveModal />
      </Flex>
      <Table
        loading={loading === "pending"}
        style={{ margin: "20px" }}
        dataSource={leaveData}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <Step status={record.status} />,
        }}
      />
    </div>
  );
};

export default LeaveForm;
