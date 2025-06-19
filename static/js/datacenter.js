console.log("✅ datacenter.js loaded");

document.addEventListener("DOMContentLoaded", getDatacenters);

// Fetch and display all datacenters
function getDatacenters() {
  fetch("/api/datacenters")
    .then((res) => res.json())
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
    .catch((error) => {
      showMessage("Error fetching datacenters", "red");
      console.error("Fetch error:", error);
    });
}

// Add datacenter
document
  .getElementById("addDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const location = document.getElementById("addLocation").value.trim();
    const capacity = document.getElementById("addCapacity").value;

    if (!location || !capacity) {
      showMessage("Please enter both location and capacity", "red");
      return;
    }

    fetch("/api/datacenter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location, capacity }),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.message || "Datacenter added", "green");
        getDatacenters();
      })
      .catch((err) => {
        showMessage("Error adding datacenter", "red");
        console.error("Add error:", err);
      });
  });

// Update datacenter
document
  .getElementById("updateDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("updateDatacenterID").value;
    const capacity = document.getElementById("updateCapacity").value;

    if (!id || !capacity) {
      showMessage("Please enter both ID and new capacity", "red");
      return;
    }

    fetch(`/api/datacenter/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capacity }),
    })
      .then((res) => res.json())
      .then((data) => {
        showMessage(data.message || "Datacenter updated", "green");
        getDatacenters();
      })
      .catch((err) => {
        showMessage("Error updating datacenter", "red");
        console.error("Update error:", err);
      });
  });

// Delete datacenter
document
  .getElementById("deleteDatacenterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("deleteDatacenterID").value;

    if (!id) {
      showMessage("Please enter a datacenter ID", "red");
      return;
    }

    fetch(`/api/datacenter/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          showMessage(data.message, "green");
          getDatacenters();
        } else {
          showMessage("Datacenter not found or already deleted", "red");
        }
      })
      .catch((err) => {
        showMessage("Error deleting datacenter", "red");
        console.error("Delete error:", err);
      });
  });

// Message display
function showMessage(text, color) {
  let msgDiv = document.getElementById("message");
  if (!msgDiv) {
    msgDiv = document.createElement("div");
    msgDiv.id = "message";
    document.body.prepend(msgDiv);
  }

  msgDiv.textContent = text;
  msgDiv.style.color = color;
  msgDiv.style.fontWeight = "bold";

  setTimeout(() => {
    msgDiv.textContent = "";
  }, 3000);
}
