
import { getEmployees } from "./data.js";

// Safe HTML text
function escapeHTML(value) {
    let div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

// Display employee table
export function showEmployees(data) {

    let tableBody = document.getElementById("employeeTableBody");
    let emptyMessage = document.getElementById("emptyMessage");
    let showingCount = document.getElementById("showingCount");

    tableBody.innerHTML = "";

    if (data.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    data.forEach(function(employee) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${escapeHTML(employee.name)}</td>
            <td>${escapeHTML(employee.email)}</td>
            <td>${escapeHTML(employee.phone)}</td>
            <td>${escapeHTML(employee.company)}</td>
            <td>${escapeHTML(employee.department)}</td>
            <td>${escapeHTML(employee.designation)}</td>
            <td>${escapeHTML(employee.location)}</td>

            <td>
                <span class="badge ${
                    employee.status === "Active"
                    ? "bg-success"
                    : "bg-danger"
                }">
                    ${escapeHTML(employee.status)}
                </span>
            </td>

            <td>
                <button
                    class="btn btn-sm btn-primary"
                    data-action="edit"
                    data-id="${employee.id}">
                    Edit
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    data-action="delete"
                    data-id="${employee.id}">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    showingCount.textContent = data.length;
}

// Update dashboard counts
export function updateCount() {

    let employees = getEmployees();

    let total = employees.length;

    let active = employees.filter(function(employee) {
        return employee.status === "Active";
    }).length;

    let inactive = employees.filter(function(employee) {
        return employee.status === "Inactive";
    }).length;

    document.getElementById("totalCount").textContent = total;

    document.getElementById("activeCount").textContent = active;

    document.getElementById("inactiveCount").textContent = inactive;
}
