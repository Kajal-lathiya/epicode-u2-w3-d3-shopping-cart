let productData = [];
let cartItems = [];
addToCart = (id) => {
    console.log('add to card', id, productData);
    let newArray = productData.filter((d, i) => id === i && d);
    console.log('newArray:', newArray);
    cartItems.push(newArray)
        // newArray.map((obj, index) => renderProducts(obj, index));
}

renderProducts = (data, i) => {
    const { category, title, img, price, asin, qty } = data;
    console.log('qty:', qty);
    let rowNode = document.querySelector('.row');
    rowNode.innerHTML += `<div class="col-md-3">
    <div class="card mb-4 shadow-sm">
    <div class="img-div">
    <img src=${img} class="card-img-top image" alt="Image" />
    </div>
      <div class="card-body">
        <p class="card-text title-text">
         <span class="font-weight-bolder">Title:</span> ${title}
        </p>
        <p class="font-weight-bolder">
        ${category}
       </p>
        <div
          class="d-flex justify-content-between align-items-center"
        >
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              SKIP
            </button>
          <small class="text-muted font-weight-bolder">$${price}</small>
        </div>
        <div class="btn-group mt-2 d-flex justify-content-center align-items-center">
        <button
          type="button"
          onclick="addToCart(${i})"
          class="btn btn-sm btn-outline-success text-center"
        >
          ADD TO CART
        </button>
      </div>
      </div>
    </div>
  </div>`
    document.querySelector('body').appendChild(rowNode)
}

renderAPIresult = (productsArray) => {
    // const nowProductsArray = productsArray.map((obj) => {...obj, qty = 0[]} );
    let res = productsArray.map((obj) => {
        return {...obj, qty: 0 }
    })
    console.log('res-->', res);
    productData = res;
    productData.map((obj, index) => renderProducts(obj, index));
}

fetchAndRenderProducts = async() => {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/books');
        const data = await response.json();
        renderAPIresult(data);
    } catch (error) {
        console.log('error:', error);
    }
}

getProduct = () => {
    fetchAndRenderProducts()
        .then(() => console.log('Show products'))
        .catch((error) => console.log('Error:', error))
}

window.onload = () => {
    getProduct()
}