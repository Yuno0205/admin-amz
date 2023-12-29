
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



interface LeaveState {
  data: LeaveRequest[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeaveState = {
  data: [],
  loading: 'idle',
  error: null,
};

// Thunk để lấy danh sách đơn xin nghỉ phép từ server
export const fetchLeaveRequests = createAsyncThunk('leave/fetchLeaveRequests', async () => {
  const response = await axios.get('http://localhost:3000/leave-requests');
  return response.data;
});

// Thunk để thêm đơn xin nghỉ phép mới
export const addLeaveRequest = createAsyncThunk('leave/addLeaveRequest', async (newRequest: LeaveRequest) => {
  const response = await axios.post('http://localhost:3000/leave-requests', newRequest);
  return response.data;
});

export const approveLeaveRequest = createAsyncThunk(
  'leave/approveLeaveRequest',
  async (requestId: number) => {
    const response = await axios.put(`http://localhost:3000/leave-requests/${requestId}`, { status: 'Approved' });
    return response.data;
  }
);

export const declineLeaveRequest = createAsyncThunk(
  'leave/declineLeaveRequest',
  async (requestId: number) => {
    const response = await axios.put(`http://localhost:3000/leave-requests/${requestId}`, { status: 'Declined' });
    return response.data;
  }
);

// Thunk để xóa đơn xin nghỉ phép
export const deleteLeaveRequest = createAsyncThunk('leave/deleteLeaveRequest', async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/leave-requests/${id}`);
  return response.data;
});

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addLeaveRequest.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(approveLeaveRequest.fulfilled, (state, action) => {
        const updatedLeaveRequest = action.payload;
        const index = state.data.findIndex((request) => request.id === updatedLeaveRequest.id);
        if (index !== -1) {
          state.data[index] = updatedLeaveRequest;
        }
      })
      .addCase(declineLeaveRequest.fulfilled, (state, action) => {
        const updatedLeaveRequest = action.payload;
        const index = state.data.findIndex((request) => request.id === updatedLeaveRequest.id);
        if (index !== -1) {
          state.data[index] = updatedLeaveRequest;
        }
      })
      .addCase(deleteLeaveRequest.fulfilled, (state, action) => {
        const deletedRequestId = action.payload.id;
        state.data = state.data.filter((request) => request.id !== deletedRequestId);
      });
  },
});

export default leaveSlice.reducer;

