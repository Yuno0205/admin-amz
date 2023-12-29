// interface Employee {
//     id: number;
//     employeeCode: string;
//     employeeName: string;
//     phoneNumber: string;
//     email: string;
//     position: string[];
//     department: string;
//   }

  interface Employee {
    id: number;
    employeeCode: string;
    employeeName: string;
    phoneNumber: string;
    email: string;
    position: string[];
    department: string;
    baseSalary: number;
    allowance: number;
    workdays: number;
    monthSalary?: number | undefined;
  }