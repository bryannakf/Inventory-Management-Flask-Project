console.log("inventory.js loaded");

function getItems() {
  fetch("/api/items")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#inventoryTable tbody");
      tableBody.innerHTML = "";
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.item_name}</td>
          <td>${item.quantity}</td>     
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching items:", error));
}

// Add Datacenter
document.getElementById("addItemForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const item_name = document.getElementById("addItem_name").value;
  const quantity = document.getElementById("addQuantity").value;
  const datacenter_id = document.getElementById("addDatacenterID").value;
  addItem(item_name, quantity, datacenter_id);
});

function addItem(item_name, quantity, datacenter_id) {
  fetch("/api/item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item_name, quantity, datacenter_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added:", data);
      getItems();
    })
    .catch((err) => console.error("Error adding item:", err));
}

// Update Datacenter
document
  .getElementById("updateItemForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("updateItemID").value;
    const quantity = document.getElementById("updateQuantity").value;
    updateItem(id, quantity);
  });

function updateItem(id, quantity) {
  fetch(`/api/item/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  })
    .then((res) => res.json())
    .then(() => getItems())
    .catch((err) => console.error("Update Error:", err));
}

// Delete Datacenter
document
  .getElementById("deleteItemForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("deleteItemID").value;
    deleteItem(id);
  });

function deleteItem(id) {
  fetch(`/api/item/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then(() => getItems())
    .catch((err) => console.error("Delete Error:", err));
}

const table = document
  .getElementById("itemTable")
  .getElementsByTagName("tbody")[0];

document.addEventListener("DOMContentLoaded", () => {
  getItems();
  fetch("/api/items")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#itemTable tbody");
      tableBody.innerHTML = "";
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.item_name}</td>
          <td>${item.quantity}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching items:", error));
});
