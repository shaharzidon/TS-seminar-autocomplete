function getEmployeeDetails(employee) {
    console.log("Employee Name:", employee.name);
    console.log("Employee Department:", employee.department);
}

const employee = {
    name: "John",
    departmnt: "Engineering", // Notice the typo here
};

getEmployeeDetails(employee);
