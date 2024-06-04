const socket = io();
const productsList = document.getElementById("productsList");

socket.on("products", (data) => {
  console.log(data);
  // productsList.innerHTML = "";
  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">ID: ${product.id}</p>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
      </div>
    `;

    productsList.appendChild(card);
  });
});
