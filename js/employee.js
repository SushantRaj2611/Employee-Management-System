
import {
    getEmployees,
    addEmployeeData,
    updateEmployeeData,
    deleteEmployeeData
} from "./data.js";

import { updateCount } from "./display.js";
import { searchEmployee } from "./search.js";

// Get input value
function getValue(id) {
    return document.getElementById(id).value.trim();
}

// Clear form
function clearForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("employeeId").value = "";
}

// Open Add Employee Modal
export function openAddModal() {

    clearForm();

    document.getElementById("modalTitle").textContent = "Add Employee";

    document.getElementById("saveBtn").textContent = "Save Employee";

    let modalElement = document.getElementById("employeeModal");

    let modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

// Edit Employee
export function editEmployee(id) {

    let employee = getEmployees().find(function(item) {
        return item.id === Number(id);
    });

    if (!employee) {
        alert("Employee not found");
        return;
    }

    document.getElementById("employeeId").value = employee.id;

    document.getElementById("name").value = employee.name;

    document.getElementById("email").value = employee.email;

    document.getElementById("phone").value = employee.phone;

    document.getElementById("company").value = employee.company;

    document.getElementById("department").value = employee.department;

    document.getElementById("designation").value = employee.designation;

    document.getElementById("location").value = employee.location;

    document.getElementById("status").value = employee.status;

    document.getElementById("userType").value = employee.userType;

    document.getElementById("modalTitle").textContent = "Edit Employee";

    document.getElementById("saveBtn").textContent = "Update Employee";

    let modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("employeeModal")
    );

    modal.show();
}

// Save Employee
export function saveEmployee(event) {

    event.preventDefault();

    let id = getValue("employeeId");

    let employee = {

        name: getValue("name"),

        email: getValue("email"),

        phone: getValue("phone"),

        company: getValue("company"),

        department: getValue("department"),

        designation: getValue("designation"),

        location: getValue("location"),

        status: getValue("status"),

        userType: getValue("userType")
    };

    let employees = getEmployees();

    // Check duplicate email
    let emailExists = employees.some(function(item) {

        return item.email.toLowerCase() === employee.email.toLowerCase()
            && item.id !== Number(id);

    });

    if (emailExists) {
        alert("This email already exists!");
        return;
    }

    // Update employee
    if (id !== "") {

        employee.id = Number(id);

        updateEmployeeData(Number(id), employee);

        alert("Employee updated successfully!");

    }

    // Add new employee
    else {

        employee.id = employees.length > 0
            ? Math.max(...employees.map(item => item.id)) + 1
            : 101;

        addEmployeeData(employee);

        alert("Employee added successfully!");
    }

    // Close modal
    clearForm();

    let modal = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("employeeModal")
    );

    modal.hide();

    // Refresh table and counts
    updateCount();

    searchEmployee();
}

// Delete employee
export function deleteEmployee(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }

    deleteEmployeeData(Number(id));

    updateCount();

    searchEmployee();

    alert("Employee deleted successfully!");
}
