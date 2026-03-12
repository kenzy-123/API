const productsRow = document.getElementById('productsRow');
const buttonSearch = document.getElementById('section-search');
const searchInput = document.getElementById('searchInput');
const model = document.getElementById('modal-container');
function displayProducts(products) {
    let content = "";
    products.forEach(item => {
        content += `
        <div class="col">
            <div class="card h-100 p-2 shadow-sm border-1">
                <div class="text-center p-3">
                    <img src="${item.thumbnail}" class="card-img-top" style="height:150px;object-fit:contain;">
                </div>
                <div class="card-body d-flex flex-column px-2 text-start">
                    <h6 class="fw-bold mb-2">${item.title}</h6>
                    <p class="text-muted small">$${item.price}</p>
                    <button class="btn btn-outline-dark btn-sm w-50 mt-auto"
                        onclick="showItem(${item.id})">
                        View Details
                    </button>
                </div>
            </div>
        </div>`;
    });
    productsRow.innerHTML = content;
}
fetch(`https://dummyjson.com/products?limit=10`)
    .then(res => res.json())
    .then(data => {
        counter = data.total;
        displayProducts(data.products);
    });
buttonSearch.addEventListener("click", () => {
    fetch(`https://dummyjson.com/products/search?q=${searchInput.value}&limit=10`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data.products); 
        });
});
let skip = 0;
function next() {
    if(skip < counter - 10) { skip += 10; }
    fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data.products);
        });
}
function prev() {
    if(skip > 0) {
        skip -= 10;
    }
    else {
        skip = 0;
    }
    fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`)
   .then(res => res.json())
        .then(data => {
            displayProducts(data.products);
        });
        
    }
function showItem(id) {
    fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(item => {
     model.innerHTML = `
     <div class="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display:block;background: rgba(0,0,0,0.5);">
     <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content p-4 border-0 rounded-4">
    <h2 class="fw-bold h3" id="exampleModalLabel">${item.title}</h2> 
    <div class="text-center my-4">
   <img src="${item.thumbnail}" class="img-fluid" style="max-height: 250px;">
    </div>
    <p class=" fs-4"><strong >Price:</strong> $${item.price}</p>
    <p><strong>Rating:</strong> ${item.rating}</p>
    <p class="text-muted small">${item.description}</p>
       <button class="btn btn-outline-dark border border-dark w-100 mt-3" onclick="closeModal()">Close</button>
    </div>
    </div>
    </div>
        `;
        });
    }
    function closeModal() {
    document.getElementById('modal-container').innerHTML = '';
}
