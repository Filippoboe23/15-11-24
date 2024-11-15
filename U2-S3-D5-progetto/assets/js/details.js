const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTJjMDhhZDEyOTAwMTU4NzZiZDYiLCJpYXQiOjE3MzE2NjI1MjgsImV4cCI6MTczMjg3MjEyOH0.XNNtx2ZyqI_jfmRbCqR3D0F-sUyORYyagjb6IcFPyUA";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + TOKEN
};

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("_id");
  const productDetail = document.getElementById("productDetail");

  if (productId) {
    fetch(BASE_URL + productId, { headers: headers })
      .then(function (response) {
        return response.json();
      })
      .then(function (product) {
        productDetail.innerHTML = `
                    <h2 class="text-center">${product.name}</h2>
                    <p class="text-muted text-center">Brand: ${product.brand}</p>
                    <img src="${product.imageUrl}" class="img-fluid mx-auto d-block" alt="${product.name}">
                    <p class="mt-4 text-center">${product.description}</p>
                    <h4 class="text-center mt-3">€${product.price}</h4>
                `;
      })
      .catch(function (error) {
        console.log("Errore durante il caricamento del prodotto:", error);
      });
  } else {
    productDetail.innerHTML = "<p>Prodotto non trovato</p>";
  }
});
