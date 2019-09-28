


var productNameInp = document.getElementById("productName"),
    currentProduct = 0,
    productCompanyInp = document.getElementById("productCompany"),
    productPriceInp = document.getElementById("productPrice"),
    productDescInp = document.getElementById("productDesc"),
    searchInp = document.getElementById("searchInp"),
    productsList,
    myBtn = document.getElementById("btn");

if (localStorage.getItem("ProductsList") == null) {
    
    productsList = [];
    
} else {
    
    productsList = JSON.parse(localStorage.getItem("ProductsList"));
    displayData();
}

myBtn.onclick = function() {
    
    if (myBtn.innerHTML == "Add Product") {
        addProduct();
        displayData();
        resetForm();
    } else {
        
        updateProduct();
        displayData();
        resetForm();
    }
    
}

function addProduct() {
    
    var product = 
        {          
            name: productNameInp.value,
            company: productCompanyInp.value,
            price: productPriceInp.value,
            desc: productDescInp.value
        };
    
    if (!product.name && !product.company && !product.price && !product.desc) {
        
        return false
    } else {
        
    productsList.push(product);
    localStorage.setItem("ProductsList", JSON.stringify(productsList))
    }
}

function displayData() {
    
    var temp = "";
    for (var i = 0; i < productsList.length; i++) {
        
        temp += `<div class="col-md-4 pr-2 pl-2 mb-3">
                    <div class="product">
                        <h2><span class="title">Name: </span>`+ productsList[i].name +`</h2>
                        <h3><span class="title">Company: </span>`+ productsList[i].company +`</h3>
                        <span class="price"><span class="title">Price: </span>`+ productsList[i].price +`</span>
                        <p><span class="title">Description: </span>`+ productsList[i].desc +`</p>
                        <button onclick = deleteProduct(`+ i +`) class="btn btn-danger">Delete</button>
                        <button onclick = setForm(`+ i +`) class="btn btn-secondary mr-2">Update</button>
                    </div>
                </div>`
        
    }
    document.getElementById("productData").innerHTML = temp
}

function deleteProduct(id) {
    
    productsList.splice(id, 1);
    localStorage.setItem("ProductsList", JSON.stringify(productsList));
    displayData();
    
}

function resetForm() {
    
    var inputs = document.getElementsByClassName("inputs");
    
    for (var i = 0; i < inputs.length; i++) {
        
        inputs[i].value = ""
    }
    
}

searchInp.onkeyup = function() {

    searchProducts(searchInp.value)
}

function searchProducts(term) {
    
    var results = "";
    let termL = "";
    let nameL = "";
    for (var i = 0; i < productsList.length; i++) {
        termL = term.toLowerCase();
        nameL = productsList[i].name.toLowerCase();
        
        if (nameL.includes(termL)) {
            
            results += `<div class="col-md-4 pr-2 pl-2 mb-3">
                    <div class="product">
                        <h2><span class="title">Name: </span>`+ productsList[i].name +`</h2>
                        <h3><span class="title">Company: </span>`+ productsList[i].company +`</h3>
                        <span class="price"><span class="title">Price: </span>`+ productsList[i].price +`</span>
                        <p><span class="title">Description: </span>`+ productsList[i].desc +`</p>
                        <button onclick = deleteProduct(`+ i +`) class="btn btn-danger">Delete</button>
                        <button onclick = setForm(`+ i +`) class="btn btn-secondary mr-2">Update</button>
                    </div>
                </div>`
        }
    }
    
    if (results.length > 0) {
        
       document.getElementById("productData").innerHTML = results 
    } else {
        results = `<div class="col-md-12">
                       <p>No matches Found.</p>
                   </div>`
        document.getElementById("productData").innerHTML = results
    }
}

function setForm(i) {
    
    productNameInp.value = productsList[i].name;
    productCompanyInp.value = productsList[i].company;
    productPriceInp.value = productsList[i].price;
    productDescInp.value = productsList[i].desc;
    
    myBtn.innerHTML = "Update product";
    $("html, body").animate({scrollTop: $(".product-form").offset().top},200)
    
    currentProduct = i
}

function updateProduct() {
    
    productsList[currentProduct].name = productNameInp.value
    productsList[currentProduct].company = productCompanyInp.value
    productsList[currentProduct].price = productPriceInp.value
    productsList[currentProduct].desc = productDescInp.value
    
    myBtn.innerHTML = "Add Product";
    localStorage.setItem("ProductsList", JSON.stringify(productsList))
}














