
import { openAddModal, editEmployee, deleteEmployee, saveEmployee }
from "./employee.js";

import { searchEmployee } from "./search.js";

import { updateCount } from "./display.js";

import { saveData } from "./data.js";

// Add Employee Button
document.getElementById("addEmployeeBtn")
    .addEventListener("click", function() {
        openAddModal();
    });

// Form Submit
document.getElementById("employeeForm")
    .addEventListener("submit", function(event) {
        saveEmployee(event);
    });

// Search Employee
document.getElementById("searchInput")
    .addEventListener("input", searchEmployee);

// Status Filter
document.getElementById("statusFilter")
    .addEventListener("change", searchEmployee);

// Sort Employee
document.getElementById("sortFilter")
    .addEventListener("change", searchEmployee);

// Edit and Delete Buttons
document.getElementById("employeeTableBody")
    .addEventListener("click", function(event) {

        let button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        let id = Number(button.dataset.id);

        if (button.dataset.action === "edit") {
            editEmployee(id);
        }

        if (button.dataset.action === "delete") {
            deleteEmployee(id);
        }
    });

// Reset Filters
document.getElementById("resetBtn")
    .addEventListener("click", function() {

        document.getElementById("searchInput").value = "";

        document.getElementById("statusFilter").value = "All";

        document.getElementById("sortFilter").value = "default";

        searchEmployee();
    });

// Initial Load
saveData();

updateCount();

searchEmployee();

console.log("Employee Management System Started");
