const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcode data API
const employees = [
  {
    id: 1,
    employeeCode: "NV001",
    employeeName: "Nhật Hào",
    phoneNumber: "0344661257",
    email: "hao@example.com",
    position: ["Front-end"],
    department: "IT",
    baseSalary: 8000000,
    allowance: 0,
    workdays: 0,
    monthSalary: undefined,
  },
  {
    id: 2,
    employeeCode: "NV002",
    employeeName: "Thuận An",
    phoneNumber: "0367890123",
    email: "thuanan@example.com",
    position: ["Back-end"],
    department: "IT",
    baseSalary: 9000000,
    allowance: 1000000,
    workdays: 20,
    monthSalary: undefined,
  },
  {
    id: 3,
    employeeCode: "NV003",
    employeeName: "Hồng Nhung",
    phoneNumber: "0987654321",
    email: "nhung@example.com",
    position: ["Designer"],
    department: "Design",
    baseSalary: 8500000,
    allowance: 500000,
    workdays: 22,
    monthSalary: undefined,
  },
  {
    id: 4,
    employeeCode: "NV004",
    employeeName: "Minh Tuấn",
    phoneNumber: "0903123456",
    email: "tuan@example.com",
    position: ["Front-end", "Backend"],
    department: "IT",
    baseSalary: 10000000,
    allowance: 800000,
    workdays: 25,
    monthSalary: undefined,
  },
  {
    id: 5,
    employeeCode: "NV005",
    employeeName: "Phương Thảo",
    phoneNumber: "0978123456",
    email: "thaophuong@example.com",
    position: ["Tester"],
    department: "IT",
    baseSalary: 8500000,
    allowance: 700000,
    workdays: 18,
    monthSalary: undefined,
  },
  {
    id: 6,
    employeeCode: "NV006",
    employeeName: "Duy Hải",
    phoneNumber: "0956789012",
    email: "duyhai@example.com",
    position: ["Legal"],
    department: "Legal",
    baseSalary: 9500000,
    allowance: 1200000,
    workdays: 23,
    monthSalary: undefined,
  },
  {
    id: 7,
    employeeCode: "NV007",
    employeeName: "Thị Hương",
    phoneNumber: "0918234567",
    email: "huong@example.com",
    position: ["BA"],
    department: "Marketing",
    baseSalary: 8000000,
    allowance: 0,
    workdays: 20,
    monthSalary: undefined,
  },
  {
    id: 8,
    employeeCode: "NV008",
    employeeName: "Quốc Anh",
    phoneNumber: "0987654321",
    email: "quocanh@example.com",
    position: ["Back-end"],
    department: "IT",
    baseSalary: 9000000,
    allowance: 1000000,
    workdays: 22,
    monthSalary: undefined,
  },
  {
    id: 9,
    employeeCode: "NV009",
    employeeName: "Hồng Quân",
    phoneNumber: "0967890123",
    email: "quan@example.com",
    position: ["Manager"],
    department: "Other",
    baseSalary: 10000000,
    allowance: 800000,
    workdays: 25,
    monthSalary: undefined,
  },
  {
    id: 10,
    employeeCode: "NV010",
    employeeName: "Thị Lan",
    phoneNumber: "0943123456",
    email: "lan@example.com",
    position: ["Designer"],
    department: "Design",
    baseSalary: 8500000,
    allowance: 500000,
    workdays: 18,
    monthSalary: undefined,
  },
];

const users = [
  {
    email: "username@gmail.com",
    password: "password1",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/119.jpg",
    username: "fullname 1",
    role: "user",
    id: "1",
  },
  {
    email: "admin@gmail.com",
    password: "admin",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/974.jpg",
    username: "Admin Antd",
    role: "admin",
    id: "2",
  },
];

// Company
const companies = [
  {
    id: 1,
    name: "ABC Company",
    address: "123 Main Street, City",
    scale: "Large",
    employees: [],
  },
  {
    id: 2,
    name: "Amazing Tech",
    address: "345 Main Street, City",
    scale: "Large",
    employees: [],
  },
];

// Leave Request
const leaveRequests = [
  {
    id: 1,
    requesterName: "John Doe",
    reason: "Personal reasons",
    days: 3,
    createdAt: new Date(),
    status: "Pending",
  },
  {
    id: 2,
    requesterName: "Jane Doe",
    reason: "Family vacation",
    days: 5,
    createdAt: new Date(),
    status: "Approved",
  },
];

// Routes
// Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Get employee by ID
app.get("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.post("/employees", (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = (employees.length + 1).toString(); // Tạo ID mới
  employees.push(newEmployee);
  res.json(newEmployee);
});

// Sửa thông tin nhân viên
app.put("/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const updatedEmployee = req.body;

  const index = employees.findIndex((e) => e.id === employeeId);

  console.log(index);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedEmployee };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: "Employee not found!" });
  }
});

// Xóa nhân viên
app.delete("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const index = employees.findIndex((e) => e.id === employeeId);
  if (index !== -1) {
    const deletedEmployee = employees.splice(index, 1)[0];
    res.json(deletedEmployee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.put("/employees/:id/salary", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const newSalary = req.body.monthSalary;

  // Tìm nhân viên trong mảng
  const employee = employees.find((emp) => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  // Cập nhật lương
  employee.monthSalary = newSalary;

  res.json({ message: "Salary updated successfully", employee: employee });
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Route để lấy danh sách đơn xin nghỉ phép
app.get("/leave-requests", (req, res) => {
  res.json(leaveRequests);
});

// Route để thêm đơn xin nghỉ phép mới
app.post("/leave-requests", (req, res) => {
  const { requesterName, reason, days } = req.body;
  const newRequest = {
    id: leaveRequests.length + 1,
    requesterName,
    reason,
    days,
    createdAt: new Date(),
    status: "Pending",
  };
  leaveRequests.push(newRequest);
  res.json(newRequest);
});

// Route để cập nhật trạng thái đơn xin nghỉ phép
app.put("/leave-requests/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const { status } = req.body;
  const requestIndex = leaveRequests.findIndex(
    (request) => request.id === requestId
  );

  if (requestIndex !== -1) {
    leaveRequests[requestIndex].status = status;
    res.json(leaveRequests[requestIndex]);
  } else {
    res.status(404).json({ error: "Leave request not found" });
  }
});

// Route để xóa đơn xin nghỉ phép
app.delete("/leave-requests/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const requestIndex = leaveRequests.findIndex(
    (request) => request.id === requestId
  );

  if (requestIndex !== -1) {
    const deletedRequest = leaveRequests.splice(requestIndex, 1)[0];
    res.json(deletedRequest);
  } else {
    res.status(404).json({ error: "Leave request not found" });
  }
});

app.get("/companies", (req, res) => {
  res.json(companies);
});

app.post("/companies", (req, res) => {
  const newCompany = {
    id: companies.length + 1,
    ...req.body,
  };

  companies.push(newCompany);
  res.json(newCompany);
});

// API cập nhật thông tin công ty
app.put("/companies/:id", (req, res) => {
  const companyId = parseInt(req.params.id);
  const updatedCompany = req.body;

  companies = companies.map((company) =>
    company.id === companyId ? { ...company, ...updatedCompany } : company
  );

  res.json(updatedCompany);
});

// API xóa công ty
app.delete("/companies/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const requestIndex = companies.findIndex(
    (request) => request.id === requestId
  );

  if (requestIndex !== -1) {
    const deletedRequest = companies.splice(requestIndex, 1)[0];
    res.json(deletedRequest);
  } else {
    res.status(404).json({ error: "Leave request not found" });
  }
});

app.post("/companies/:companyId/employees", (req, res) => {
  const companyId = parseInt(req.params.companyId, 10);
  const { employeeId } = req.body;

  const companyIndex = companies.findIndex(
    (company) => company.id === companyId
  );

  if (companyIndex !== -1) {
    companies[companyIndex].employees.push({ id: employeeId });

    res.json(companies[companyIndex]);
  } else {
    res.status(404).json({ error: "Company not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
