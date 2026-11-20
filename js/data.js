
let employees = [];

let savedEmployees = localStorage.getItem("employees");

if (savedEmployees) {
    try {
        employees = JSON.parse(savedEmployees);

        if (!Array.isArray(employees)) {
            employees = [];
        }
    } catch (error) {
        employees = [];
    }
} else {
    employees = [
        {
            id: 101,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            phone: "9876543210",
            company: "Google",
            department: "IT",
            designation: "Developer",
            location: "Bangalore",
            status: "Active",
            userType: "Employee"
        },
        {
            id: 102,
            name: "Priya Singh",
            email: "priya@gmail.com",
            phone: "9876543211",
            company: "Microsoft",
            department: "HR",
            designation: "HR Manager",
            location: "Delhi",
            status: "Active",
            userType: "Employee"
        },
        {
            id: 103,
            name: "Amit Kumar",
            email: "amit@gmail.com",
            phone: "9876543212",
            company: "Amazon",
            department: "Finance",
            designation: "Accountant",
            location: "Mumbai",
            status: "Inactive",
            userType: "Employee"
        }
    ];

    localStorage.setItem("employees", JSON.stringify(employees));
}

// Get all employees
export function getEmployees() {
    return employees;
}

// Save employees
export function saveData() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Add employee
export function addEmployeeData(employee) {
    employees.push(employee);
    saveData();
}

// Update employee
export function updateEmployeeData(id, updatedEmployee) {
    employees = employees.map(function(employee) {
        if (employee.id === id) {
            return updatedEmployee;
        }

        return employee;
    });

    saveData();
}

// Delete employee
export function deleteEmployeeData(id) {
    employees = employees.filter(function(employee) {
        return employee.id !== id;
    });

    saveData();
}
