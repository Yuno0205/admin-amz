// employeeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';



interface EmployeeState {
  data: Employee[];
  searchResults: Employee[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  
}

const initialState: EmployeeState = {
  data: [],
  searchResults : [],
  loading: 'idle',
  error: null,
 
};

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:3000/employees');
  return response.data;
});



export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee: Employee) => {
  const response = await axios.post('http://localhost:3000/employees', employee);
  return response.data;
});


export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (employee: Employee) => {
  const response = await axios.put(`http://localhost:3000/employees/${employee.id}`, employee);
  return response.data;
});


export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId: number) => {
  await axios.delete(`http://localhost:3000/employees/${employeeId}`);
  return employeeId;
});

// export const updateSalary = createAsyncThunk(
//   'employees/updateSalary',
//   async ({ employeeId, newSalary }: { employeeId: number; newSalary: number }) => {
//     const response = await axios.put(`http://localhost:3000/employees/${employeeId}/salary`, {
//       luongThang: newSalary,
//     });
//     return response.data;
//   }
// );



const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    searchEmployees: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchResults = state.data.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchTerm)
      );
    },
    filterEmployeesByDepartment: (state, action) => {
      const selectedDepartment = action.payload;
      state.searchResults = state.data.filter(employee =>
        employee.department.toLowerCase() === selectedDepartment.toLowerCase()
      );
    },
    updateSalary: (state, action: PayloadAction<Employee[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const updatedEmployee = action.payload;
        const index = state.data.findIndex((employee) => employee.id === updatedEmployee.id);
        if (index !== -1) {
          state.data[index] = updatedEmployee;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const deletedEmployeeId = action.payload;
        state.data = state.data.filter((employee) => employee.id !== deletedEmployeeId);
      });
  },
  
});
export const { searchEmployees , filterEmployeesByDepartment , updateSalary} = employeeSlice.actions;

export default employeeSlice.reducer;

