let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

if (iconCart) {
    iconCart.addEventListener('click', () => {
        if (body) body.classList.toggle('showCart');
    });
}
if (closeCart) {
    closeCart.addEventListener('click', () => {
        if (body) body.classList.toggle('showCart');
    });
}

const addDataToHTML = () => {
    if(!listProductHTML) return;
    listProductHTML.innerHTML = '';
    if(products.length > 0)
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            
            let imageSrc = product.image.startsWith('http') 
                ? product.image 
                : encodeURI(product.image);

            newProduct.innerHTML = 
            `<a href="${product.link}"><img src="${imageSrc}" alt="${product.name}"></a>
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

if(listProductHTML) {
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    });
}

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const parsePriceNumber = (priceStr) => {
    if (!priceStr) return 0;
    let numeric = priceStr.replace(/[^0-9]/g, '');
    return parseFloat(numeric) || 0;
}

const addCartToHTML = () => {
    if (!listCartHTML) return;
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            if (info) {
                let imageSrc = info.image.startsWith('http') 
                    ? info.image 
                    : encodeURI(info.image);

                let unitPriceNum = parsePriceNumber(info.price);
                let totalPriceNum = unitPriceNum * item.quantity;
                let formattedTotalPrice = '₹' + totalPriceNum.toLocaleString('en-IN');

                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                    <img src="${imageSrc}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">${formattedTotalPrice}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
                `;
            }
        });
    }
    if (iconCartSpan) {
        iconCartSpan.innerText = totalQuantity;
    }
}

if (listCartHTML) {
    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if(positionClick.classList.contains('plus')){
                type = 'plus';
            }
            changeQuantityCart(product_id, type);
        }
    });
}

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data cart from memory first if available
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
    }

    // fetch product data safely
    fetch('products.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to load products.json: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        products = data;
        addDataToHTML();
        addCartToHTML();
    })
    .catch(err => {
        console.error('Error loading product data:', err);
    });
}
initApp();