
//КЛАСС-ОСНОВА ДЛЯ СПИСКА ТОВАРОВ
class Catalog {
    static API = 'https://raw.githubusercontent.com/ViktoriaV-start/advancedJS/master/brand_data';
    allProducts = [];

    constructor(selector, url, place, list = map) {
        this.container = selector;
        this.url = url;
        this.place = place;
        this.list = list;
        this._init(); //автовызов
    }


    _getProducts(url) {
        return fetch(url ? String(url) : `${Catalog.API + this.url}`) //подгрузить. Примечание: url в тернанрном операторе и this.url - разные!!! Первый - передается при вызове ф-ции, второйберется из конструктора!!!
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    handleData(data) {
        for (let item of data) {
            this.allProducts.push(new this.list[this.constructor.name](item));//у конструктора есть есть свойство name, поэтому его можно вытащить(это ключ в map) и по нему вытащить название для item - это значение в list=map
        }
        this._render();
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.allProducts) {
            if (product.rendered) {
                continue;
            }
            block.insertAdjacentHTML(this.place, product.markUp());
        }
    }

    getItem(id) {
        //return this.allProducts.indexOf(this.allProducts.find(el => el.id_product === id));
        return this.allProducts.find(el => el.id_product === id);
    }

    _init() {
        return false
    }
}


//КЛАСС-ОСНОВА ДЛЯ ОДНОГО ТОВАРА
class Item {
    rendered = false;

    constructor(product, img = `img1/card${product.id_product}.jpg`) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.color = product.color;
        this.size = product.size;
        this.img = img;
    }
    markUp() {
        this.rendered = true;
        return `
            <figure class="promo__card" data-id="${this.id_product}"> 
                <img src="${this.img}" alt="Mango_${this.id_product}">
                <figcaption class="promo__caption">
                    <h3 class="promo__name">${this.product_name}</h3> 
                    <span class="promo__price">$${this.price}.00</span>
                </figcaption>
                <div class="promo__card-hover"></div>
                <div class="promo__cart add" data-id="${this.id_product}"> 
                    <svg class="white-cart add" data-id="${this.id_product}" fill="rgb(255, 255, 255)" width="32" height="29" viewBox="0 0 32 29">
                        <path class="add" d="M31.899,7.565 L26.493,19.977 C26.296,20.410 25.882,20.686 25.409,20.686 L10.554,20.686 C10.021,20.686 9.548,20.331 9.410,19.819 L4.577,2.364 L1.184,2.364 C0.533,2.364 -0.000,1.832 -0.000,1.182 C-0.000,0.532 0.533,-0.001 1.184,-0.001 L5.464,-0.001 C5.997,-0.001 6.471,0.354 6.609,0.866 L11.442,18.322 L24.620,18.322 L28.999,8.274 L14.401,8.274 C13.750,8.274 13.217,7.742 13.217,7.092 C13.217,6.442 13.750,5.910 14.401,5.910 L30.814,5.910 C31.208,5.910 31.583,6.107 31.800,6.442 C32.017,6.777 32.057,7.190 31.899,7.565 ZM9.429,23.641 C10.909,23.641 12.112,24.843 12.112,26.320 C12.112,27.798 10.909,28.999 9.429,28.999 C7.950,28.999 6.747,27.798 6.747,26.320 C6.747,24.843 7.950,23.641 9.429,23.641 ZM26.020,23.641 C27.500,23.542 28.782,24.665 28.881,26.123 C28.920,26.852 28.703,27.542 28.230,28.073 C27.756,28.625 27.105,28.940 26.395,28.999 C26.336,28.999 26.257,28.999 26.198,28.999 C24.797,28.999 23.633,27.896 23.535,26.498 C23.436,25.040 24.541,23.739 26.020,23.641 Z" /> 
                    </svg> 
                    <span class="promo__add-to-cart add" data-id="${this.id_product}">Add to cart</span> 
                </div>
            </figure>`
    }
}


//КАТАЛОГ
class CatalogHome extends Catalog {
    cart = null;

    constructor(cart, selector, url, place){ //c
        super(selector, url, place);
        this.cart = cart;
        this._getProducts()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {

            if (e.target.classList.contains('add')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id)); //вызвать метод из cart - добавление товара в корзину
            }
        });
    }
}

//ТОВАР В КАТАЛОГЕ
class CatalogItem extends Item{}

//КОРЗИНА
class Cart extends Catalog {
    constructor(selector, url, place){
        super(selector, url, place);
        this._getProducts()
            .then(data => this.handleData(data.contents));
    }

    addProduct(product) {
        // this.getJson(`${List.API}/addToBasket.json`) //ИМИТАЦИЯ ПРОВЕРКИ УСПЕШНОЙ СВЯЗИ
        //     .then(data => {
        //         if (data.result) {
        //             let find = this.products.find(el => el.id_product === product.id_product);
        //             if (find) {
        //                 find.changeQuantity(1);
        //                 return;
        //
        let find = this.allProducts.find(el => el.id_product === product.id_product);
        if (find) {
            find.changeQuantity(1);
            this.updateCart();
            return;
        }

        let prod = Object.assign({ quantity: 1 }, product); //объединение двух объектов (первый - новый, второй - из которого вытаскиваются данные в новый)
        this.handleData([prod]); // метод handleData принимает МАССИВ с данными товаров, здесь передаем массив с одним товаров
        this.updateCart();
    }

    calcQuantity() {
        return this.allProducts.reduce((accum, item) => accum += item.quantity, 0);
    }

    updateCart() {
        
        let newQuantity = this.calcQuantity();
        if (newQuantity === 0) {
            document.querySelector('.header__cart-quantity').classList.add('display-none');
            document.querySelector(this.container).parentNode.classList.add('display-none');
        } else {
            document.querySelector('.header__cart-quantity').classList.remove('display-none');
            document.querySelector('.header__cart-quantity').textContent = newQuantity;
            document.querySelector(this.container).parentNode.classList.remove('display-none');
        }
    }


    _init() {
        document.querySelector(this.container).addEventListener('click', e => {

//УДАЛЕНИЕ ПОЛНОСТЬЮ ТОВАРА КНОПКОЙ

            if (e.target.classList.contains('cart__dlt')) {
                const id = +e.target.dataset['id'];
                this.removeMarkUp(id);
                let item = this.getItem(id);
                this.allProducts.splice(this.allProducts.indexOf(item), 1);
                this.updateCart();
                
            }

//ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА ЧЕРЕЗ КНОПКУ В КОРЗИНЕ

            if (e.target.classList.contains('quantityMinus')) {
                const id = +e.target.dataset['id'];
                let item = this.getItem(id);
                this.deleteItem(item);
                this.updateCart();
            }

            if (e.target.classList.contains('quantityPlus')) {
                const id = +e.target.dataset['id'];
                let item = this.getItem(id);
                item.changeQuantity(1);
                this.updateCart();
            }
        });
//
// //УДАЛЕНИЕ СРАЗУ ВСЕХ ТОВАРОВ ИЗ КОРЗИНЫ КНОПКОЙ CLEAR
//         document.querySelector('.cartClear').addEventListener('click', (e) => {
//             e.preventDefault();
//             this.allProducts.forEach(el => {
//                 document.querySelector(`.shoppingCart__line[data-id="${el.id_product}"]`).remove();
//             })
//             this.allProducts = [];
//             this.updateTotal();
//             console.log(this.allProducts);
//         });

//ПОКАЗ или СКРЫТИЕ КОРЗИНЫ
        document.querySelector('.header__cart').addEventListener('click', () => {

            const cartTable = document.querySelector(this.container);
            cartTable.parentNode.classList.toggle('invsbl');
            if (!cartTable.parentNode.classList.contains('invsbl')) {
                this.closeCart(cartTable);
            }
        });
    }

    closeCart(cartTable) {
        document.querySelector('.cart__continue').addEventListener('click', () => {
            cartTable.parentNode.classList.add('invsbl');
        });

        document.querySelector('body').addEventListener('click', (e) => {
            console.log(e.clientY);
            const coordinates = cartTable.parentNode.getBoundingClientRect();
            if (e.clientX < coordinates.left ||
                e.clientX > coordinates.right ||
                e.clientY > coordinates.bottom + 80) {
                cartTable.parentNode.classList.add('invsbl');
            }
        });
    }

    deleteItem(item) {
        if (item.quantity > 1) {
            item.changeQuantity(-1);
            return;
        }
        this.allProducts.splice(this.allProducts.indexOf(item), 1); //удалить сам товар из общего списка товаров
        this.removeMarkUp(item.id_product);
    }

    removeMarkUp(id) {
//удалить разметку товара со страницы
        document.querySelector(`.cart__line[data-id="${id}"]`).remove();
    }
}

//ТОВАР В КОРЗИНЕ
class CartItem extends Item {
    constructor(el, img = `img2/card${el.id_product}.jpg`) { //фото передаем другое
        super(el, img); //передать наверх в Item
        this.quantity = el.quantity;
        this.color = el.color;
        this.size = el.size;
    }
    changeQuantity(count) {
        this.quantity += count;
        this._updateItem();
    }
    _updateItem() {
        const block = document.querySelector(`.cart__line[data-id="${this.id_product}"]`);
        const inputQuantity = block.querySelector(`.cart__quantity`);
        inputQuantity.textContent = `${this.quantity}`;
        block.querySelector(`.cart__price`).textContent = `$${this.quantity*this.price}`;
    }

    markUp() {
        this.rendered = true;
        return `
        <div class = "cart__line" data-id = "${this.id_product}">
            <div class="cart__product">
                <img class="cart__photo" src="${this.img}" alt="Added Product">
                <div class="cart__details">
                    <span class="cart__name">${this.product_name}</span>
                    <span class="cart__info">Color:<span class="cart__info_spec">${this.color}</span></span>
                    <span class="cart__info">Size:<span class="cart__info_spec">${this.size}</span></span>
                </div>
            </div>

            <span class="cart__data">$${this.price}</span>

            <div class="cart__input">
                <div class="cart__quantity-wrap">
                    <button data-id = "${this.id_product}" class="cart__quantity-btn quantityMinus" type="submit">
                        <i data-id = "${this.id_product}" class="fas fa-caret-left arrow fa-lg quantityMinus"></i>
                    </button>

                    <span data-id = "${this.id_product}" class="cart__quantity">${this.quantity}</span>
                
                    <button data-id = "${this.id_product}" class="cart__quantity-btn quantityPlus" type="submit">
                        <i data-id = "${this.id_product}" class="fas fa-caret-right arrow fa-lg quantityPlus"></i>
                    </button>
                </div>
            </div>

            <span class="cart__data">FREE</span>
            <span class="cart__data cart__price">$${this.quantity*this.price}</span>
            <button class="cart__delete-wrap cart__dlt" data-id = "${this.id_product}">
                <svg class="cart__delete cart__dlt" data-id = "${this.id_product}" fill="currentColor" height="15" width="15" viewBox="0 0 512 512">
                <path class="cart__dlt" data-id = "${this.id_product}" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </button>
        </div>
        `
    }
}


class FilteredHome extends CatalogHome {
    constructor(cart, selector, url, place, selectorCatalog){
        super(cart, selector, url, place);
        this.mainSection = document.querySelector(selectorCatalog);
    }

    handleData(data) {
        for (let item of data) {
            this.allProducts.push(new this.list[this.constructor.name](item));
        }
    }

    filter(value) {

        this.mainSection.classList.add('display-none');

        const block = document.querySelector(this.container);
        block.parentNode.classList.remove('display-none');
        block.innerHTML = "";

        const regexp = RegExp(value, 'i');
        this.abc = this.allProducts.filter(el => regexp.test(el.product_name));

        if (this.abc.length === 0 || value === '') {
            block.innerText = 'No search result';
        } else {
            this.abc.forEach(el => {
                block.insertAdjacentHTML(this.place, el.markUp());
            })
        }

        document.querySelector('.filter__btn').addEventListener('click', () => {
            block.parentNode.classList.add('display-none');
            this.mainSection.classList.remove('display-none');
        })
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('add')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id)); //вызвать метод из cart - добавление товара в корзину
            }
        });

        document.querySelector('.search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            let searchValue = document.querySelector('.search-form__input').value;
            if (searchValue.length !== 0) {
                this.filter(searchValue);
            }
        })
    }
}

class FilteredItem extends Item{}

const map = {
        CatalogHome: CatalogItem, //CatalogHome - это ключ, а CatalogItem - это уже ссылка
        Cart: CartItem,
        FilteredHome: FilteredItem
};