const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTJjMDhhZDEyOTAwMTU4NzZiZDYiLCJpYXQiOjE3MzE2NjI1MjgsImV4cCI6MTczMjg3MjEyOH0.XNNtx2ZyqI_jfmRbCqR3D0F-sUyORYyagjb6IcFPyUA";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + TOKEN
};

document.addEventListener("DOMContentLoaded", function () {
  const homeProductList = document.getElementById("homeProductList");

  fetch(BASE_URL, { headers: headers })
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      homeProductList.innerHTML = "";
      products.forEach(function (product) {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
                    <div class="card h-100 shadow-sm ">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="text-muted">Brand: ${product.brand}</p>
                            <p class="text-primary">€${product.price}</p>
                            <div class="d-flex justify-content-between">
                             <a href="details.html?_id=${product._id}" class="btn btn-outline-primary">Dettagli</a>
                             <a href="backoffice.html?_id=${product._id}" class="btn btn-outline-warning">Modifica</a>
                            </div>
                        </div>
                    </div>
                `;
        homeProductList.appendChild(card);
      });
    })
    .catch(function (error) {
      console.error("Errore durante il caricamento dei prodotti:", error);
    });
});
