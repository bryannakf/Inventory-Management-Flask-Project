// Fetch all datacenters on page load
window.onload = getDatacenters;

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
    .then(() => getDatacenters())
    .catch((err) => console.error("Add Error:", err));
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

// Get and display all datacenters
function getDatacenters() {
  fetch("/api/datacenters")
    .then((res) => res.json())
    .then((data) => {
      const div = document.getElementById("datacenterList");
      div.innerHTML = "";
      data.forEach((dc) => {
        div.innerHTML += `<p>ID: ${dc.id}, Location: ${dc.location}, Capacity: ${dc.capacity}</p>`;
      });
    })
    .catch((err) => console.error("Fetch Error:", err));
}

// // Fetch and display inventory on page load
// window.onload = getInventory;

// // Add item
// document.getElementById("addForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const itemName = document.getElementById("addItemName").value;
//   const quantity = parseInt(document.getElementById("addItemQuantity").value);
//   const datacenter_id = parseInt(
//     document.getElementById("addDataCenterID").value
//   );

//   fetch("/api/item", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ itemName, quantity, datacenter_id }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Item added:", data);
//       getInventory();
//     })
//     .catch((err) => console.error("Add Error:", err));
// });

// // Update item
// document.getElementById("updateForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const id = parseInt(document.getElementById("updateItemID").value);
//   const quantity = parseInt(
//     document.getElementById("updateItemQuantity").value
//   );

//   fetch(`/api/item/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ quantity }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Item updated:", data);
//       getInventory();
//     })
//     .catch((err) => console.error("Update Error:", err));
// });

// // Delete item
// document.getElementById("deleteForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   const id = parseInt(document.getElementById("deleteItemID").value);

//   fetch(`/api/item/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Item deleted:", data);
//       getInventory();
//     })
//     .catch((err) => console.error("Delete Error:", err));
// });

// // Fetch inventory
// function getInventory() {
//   fetch("/api/items")
//     .then((res) => res.json())
//     .then((items) => {
//       const inventoryDiv = document.getElementById("inventory");
//       inventoryDiv.innerHTML = "<h3>Inventory List:</h3>";
//       items.forEach((item) => {
//         inventoryDiv.innerHTML += `
//           <div>
//             <strong>ID:</strong> ${item.id} |
//             <strong>Name:</strong> ${item.item_name || item.itemName} |
//             <strong>Quantity:</strong> ${item.quantity} |
//             <strong>Location:</strong> ${item.location || "N/A"}
//           </div>
//         `;
//       });
//     })
//     .catch((err) => console.error("Fetch Error:", err));
// }
