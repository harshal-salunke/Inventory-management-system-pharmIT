const productList = document.getElementById("productList");
const addProductBtn = document.getElementById("addProductBtn");
const addModal = document.getElementById("addModal");

addProductBtn.addEventListener("click", () => {
  // You can implement logic to handle adding a new product here
  // For example, open a modal or a separate page for adding a product
});

// Function to create Edit and Delete buttons for each product row
function createEditDeleteButtons(productId) {
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => handleEditProduct(productId));

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => handleDeleteProduct(productId));

  const buttonContainer = document.createElement("td");
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  return buttonContainer;
}

// Function to handle editing a product
function handleEditProduct(productId) {
  // Implement logic to open a modal or a form for editing the product
  console.log("Editing product with ID:", productId);
}

// Function to handle deleting a product
function handleDeleteProduct(productId) {
  // Implement logic to confirm deletion and then remove the product from the UI
  if (confirm("Are you sure you want to delete this product?")) {
    const productRow = document.querySelector(
      `tr[data-product-id="${productId}"]`
    );
    if (productRow) {
      productRow.remove();
    }
  }
}

// Function to handle editing a product
function handleEditProduct(productId) {
  const productRow = document.querySelector(
    `tr[data-product-id="${productId}"]`
  );
  const productName = productRow.querySelector("td:nth-child(2)").textContent;
  const productDescription =
    productRow.querySelector("td:nth-child(3)").textContent;
  const productQuantity =
    productRow.querySelector("td:nth-child(4)").textContent;
  const productPrice = parseFloat(
    productRow.querySelector("td:nth-child(5)").textContent.replace("$", "")
  );

  // Populate the edit modal/form input fields with the current product details
  document.getElementById("editName").value = productName;
  document.getElementById("editDescription").value = productDescription;
  document.getElementById("editQuantity").value = productQuantity;
  document.getElementById("editPrice").value = productPrice.toFixed(2);

  // Show the edit modal
  editModal.style.display = "block";

  // Handle form submission
  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather updated data from the form
    const newName = document.getElementById("editName").value;
    const newDescription = document.getElementById("editDescription").value;
    const newQuantity = document.getElementById("editQuantity").value;
    const newPrice = parseFloat(document.getElementById("editPrice").value);

    // Update the UI with the new values
    productRow.querySelector("td:nth-child(2)").textContent = newName;
    productRow.querySelector("td:nth-child(3)").textContent = newDescription;
    productRow.querySelector("td:nth-child(4)").textContent = newQuantity;
    productRow.querySelector(
      "td:nth-child(5)"
    ).textContent = `$${newPrice.toFixed(2)}`;

    // Close the edit modal
    editModal.style.display = "none";
  });
}

// Close the edit modal when the close button is clicked
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  editModal.style.display = "none";
});

// Add products jeva add button ver click karto apan tevaaaaaaaaa

addProductBtn.addEventListener("click", () => {
  addModal.style.display = "block";
});

// Function to calculate the next available ID
function calculateNextProductId() {
  const productRows = productList.querySelectorAll("tr[data-product-id]");
  const existingIds = Array.from(productRows).map((row) =>
    parseInt(row.getAttribute("data-product-id"))
  );
  const maxId = Math.max(...existingIds);
  return maxId + 1;
}

// Function to handle adding a product
function handleAddProduct(event) {
  event.preventDefault();

  // Gather data from the form
  const newName = document.getElementById("addName").value;
  const newDescription = document.getElementById("addDescription").value;
  const newQuantity = document.getElementById("addQuantity").value;
  const newPrice = parseFloat(document.getElementById("addPrice").value);

  const newProductId = calculateNextProductId();

  // Create a new row for the product and append it to the table
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-product-id", newProductId);
  newRow.innerHTML = `
      <td>${newProductId}</td>
      <td>${newName}</td>
      <td>${newDescription}</td>
      <td>${newQuantity}</td>
      <td>$${newPrice.toFixed(2)}</td>
      <td>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
      </td>
    `;

  productList.appendChild(newRow);

  // Close the add modal
  addModal.style.display = "none";
}

// Handle form submission for adding a product
const addForm = document.getElementById("addForm");
addForm.addEventListener("submit", handleAddProduct);

// Close the add modal when the close button is clicked
const closeButtonAdd = addModal.querySelector(".close");
closeButtonAdd.addEventListener("click", () => {
  addModal.style.display = "none";
});

// Fetch and render products
async function fetchAndRenderProducts() {
  try {
    const response = await fetch("products.json"); // Replace with your backend endpoint
    const products = await response.json();

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.setAttribute("data-product-id", product.product_id);
      row.innerHTML = `
        <td>${product.product_id}</td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.quantity}</td>
        <td>$${product.price}</td>
      `;

      const buttonsContainer = createEditDeleteButtons(product.product_id);
      row.appendChild(buttonsContainer);

      productList.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Load products when the page loads
window.addEventListener("load", fetchAndRenderProducts);
