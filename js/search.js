import { getEmployees } from "./data.js";
import { showEmployees } from "./display.js";

export function searchEmployee() {
    let searchValue = document.getElementById("searchInput")
        .value.toLowerCase();

    let statusValue = document.getElementById("statusFilter").value;
    let sortValue = document.getElementById("sortFilter").value;

    let filteredEmployees = getEmployees().filter(function(employee) {
        let details = [
            employee.name,
            employee.email,
            employee.phone,
            employee.company,
            employee.department,
            employee.designation,
            employee.location
        ];

        let matchesSearch = details.some(function(value) {
            return String(value).toLowerCase().includes(searchValue);
        });

        let matchesStatus =
            statusValue === "All" || employee.status === statusValue;

        return matchesSearch && matchesStatus;
    });

    if (sortValue === "az") {
        filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortValue === "za") {
        filteredEmployees.sort((a, b) => b.name.localeCompare(a.name));
    }

    showEmployees(filteredEmployees);
}