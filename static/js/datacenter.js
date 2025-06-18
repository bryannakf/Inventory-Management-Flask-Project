console.log("✅ datacenter.js loaded");

function getDatacenters() {
  fetch("/api/datacenters")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#datacenterTable tbody");
      tableBody.innerHTML = "";
      data.forEach((dc) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${dc.id}</td>
          <td>${dc.location}</td>
          <td>${dc.capacity}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching datacenters:", error));
}

// Add Datacenter
document
  .getElementById("addDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const location = document.getElementById("addLocation").value;
    const capacity = document.getElementById("addCapacity").value;
    addDatacenter(location, capacity);
  });

function addDatacenter(location, capacity) {
  fetch("/api/datacenter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, capacity }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added:", data);
      getDatacenters();
    })
    .catch((err) => console.error("Error adding datacenter:", err));
}

// Update Datacenter
document
  .getElementById("updateDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("updateDatacenterID").value;
    const capacity = document.getElementById("updateCapacity").value;
    updateDatacenter(id, capacity);
  });

function updateDatacenter(id, capacity) {
  fetch(`/api/datacenter/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ capacity }),
  })
    .then((res) => res.json())
    .then(() => getDatacenters())
    .catch((err) => console.error("Update Error:", err));
}

// Delete Datacenter
document
  .getElementById("deleteDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("deleteDatacenterID").value;
    deleteDatacenter(id);
  });

function deleteDatacenter(id) {
  fetch(`/api/datacenter/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then(() => getDatacenters())
    .catch((err) => console.error("Delete Error:", err));
}

const table = document
  .getElementById("datacenterTable")
  .getElementsByTagName("tbody")[0];

document.addEventListener("DOMContentLoaded", () => {
  getDatacenters();
  fetch("/api/datacenters")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#datacenterTable tbody");
      tableBody.innerHTML = "";
      data.forEach((dc) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${dc.id}</td>
          <td>${dc.location}</td>
          <td>${dc.capacity}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching datacenters:", error));
});
