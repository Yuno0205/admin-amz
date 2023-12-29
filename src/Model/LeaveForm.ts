interface LeaveRequest {
    id: number;
    requesterName: string;
    reason: string;
    days: number;
    createdAt: Date;
    status: string;
  }