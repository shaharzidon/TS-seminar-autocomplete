type Employee = {
  name: string;
  department: string;
};

function getEmployeeDetails(employee: Employee) {
  console.log("Employee Name:", employee.name);
  console.log("Employee Department:", employee.department);
}

const employee: Employee = {
  name: "John",
  departmnt: "Engineering", // TypeScript will flag this as an error
};

getEmployeeDetails(employee);
