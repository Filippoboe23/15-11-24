const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTJjMDhhZDEyOTAwMTU4NzZiZDYiLCJpYXQiOjE3MzE2NjI1MjgsImV4cCI6MTczMjg3MjEyOH0.XNNtx2ZyqI_jfmRbCqR3D0F-sUyORYyagjb6IcFPyUA";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + TOKEN
};

document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const productList = document.getElementById("productList");

  productForm.onsubmit = function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value
    };

    const productId = submitBtn.getAttribute("data-id");

    if (productId) {
      fetch(BASE_URL + productId, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(formData)
      }).then(function (response) {
        if (response.ok) {
          alert("Prodotto modificato con successo"); // volevo dare la classe "display-none" al div che conteneva l'alert preso da bootstrap ed inserirlo sotto all'h1 per poi rimuovere la classe in js al verificarsi di un if o di un else cosi da farli comparire fino al refresh della pagina ma non ho fatto in tempo
          location.reload();
        } else {
          alert("Errore nella modifica del prodotto"); //volevo mettere l'alert con bootstrap ma non faccio in tempo
        }
      });
    } else {
      fetch(BASE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData)
      }).then(function (response) {
        if (response.ok) {
          alert("Prodotto creato con successo"); //volevo mettere l'alert con bootstrap ma non faccio in tempo
          location.reload();
        } else {
          alert("Errore nella creazione del prodotto"); //volevo mettere l'alert con bootstrap ma non faccio in tempo
        }
      });
    }
  };

  resetBtn.onclick = function () {
    productForm.reset();
    submitBtn.removeAttribute("data-id");
  };

  loadProductsForBackOffice();

  function loadProductsForBackOffice() {
    fetch(BASE_URL, { headers: headers })
      .then(function (response) {
        return response.json();
      })
      .then(function (products) {
        productList.innerHTML = "";
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
                                <div class="d-flex justify-content-between ">
                                    <button class="btn btn-outline-warning btn-sm" onclick="editProduct('${product._id}')">Modifica</button>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct('${product._id}')">Cancella</button>
                                </div>
                            </div>
                        </div>
                    `;
          productList.appendChild(card); //test
        });
      });
  }

  window.editProduct = function (productId) {
    fetch(BASE_URL + productId, { headers: headers })
      .then(function (response) {
        return response.json();
      })
      .then(function (product) {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("imageUrl").value = product.imageUrl;
        document.getElementById("price").value = product.price;
        submitBtn.setAttribute("data-id", product._id);
      });
  };

  window.deleteProduct = function (productId) {
    fetch(BASE_URL + productId, {
      method: "DELETE",
      headers: headers
    }).then(function () {
      loadProductsForBackOffice();
    });
  };
});
