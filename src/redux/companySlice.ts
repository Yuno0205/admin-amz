// companySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CompanyState {
  data: 
     Company[];
    
  
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  }

  interface AddEmployeeToCompanyPayload {
    companyId: number;
    employee: Employee; 
  }




const initialState: CompanyState = {
  data: []   ,
  loading: 'idle',
  error: null,
};

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
    const response = await axios.get('http://localhost:3000/companies');
    return response.data;
  });
  
  export const addCompany = createAsyncThunk('companies/addCompany', async (company: Company) => {
    const response = await axios.post('http://localhost:3000/companies', company);
    return response.data;
  });

  export const updateCompany = createAsyncThunk('companies/updateCompany', async (company: Company) => {
    const response = await axios.put(`http://localhost:3000/companies/${company.id}`, company);
    return response.data;
  });
  
  export const deleteCompany = createAsyncThunk('companies/deleteCompany', async (companyId: number) => {
    await axios.delete(`http://localhost:3000/companies/${companyId}`);
    return companyId;
  });

  
  
  export const addEmployeeToCompany = createAsyncThunk(
    'companies/addEmployeeToCompany',
    async ({ companyId, employeeId }: { companyId: number; employeeId: number }) => {
      const response = await axios.post(`http://localhost:3000/companies/${companyId}/employees`, { employeeId });
      return response.data;
    }
  );

  

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload;
        const index = state.data.findIndex((company) => company.id === updatedCompany.id);
        if (index !== -1) {
          state.data[index] = updatedCompany;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        const deletedCompanyId = action.payload;
        state.data = state.data.filter((company) => company.id !== deletedCompanyId);
      })
      .addCase(addEmployeeToCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload;
        const index = state.data.findIndex((company) => company.id === updatedCompany.id);
        if (index !== -1) {
          state.data[index] = updatedCompany;
        }
      });
  },
});

export default companySlice.reducer;
