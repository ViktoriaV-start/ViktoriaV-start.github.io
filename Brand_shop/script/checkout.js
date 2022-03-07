const CartItem = {
    props: ['cartItem', 'img'],
    emits: ['rmv'],
    // создать событие, здесь это просто название для события, метод вызывается уже из Cart.js
    //  когда создается каждый CartItem
    template: `

        <div class = "homePage__cartLine">
            <div class="homePage__productDetails">
                <img class="homePage__cartImg" :src="img" :alt="cartItem.product_name">
                <div class="homePage__detailsWrapper">
                    <span class="homePage__cartProduct font12Bold">{{ cartItem.product_name }}</span>
                        <div class="homePage__cartStar">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" height="11" width="11" viewBox="0 0 576 512"><path fill="rgb(228, 175, 72)" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" height="11" width="11" viewBox="0 0 576 512"><path fill="rgb(228, 175, 72)" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" height="11" width="11" viewBox="0 0 576 512"><path fill="rgb(228, 175, 72)" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star fa-w-18" role="img" height="11" width="11" viewBox="0 0 576 512"><path fill="rgb(228, 175, 72)" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star-half-alt" class="svg-inline--fa fa-star-half-alt fa-w-17" role="img" height="11" width="11" viewBox="0 0 536 512"><path fill="rgb(228, 175, 72)" d="M508.55 171.51L362.18 150.2 296.77 17.81C290.89 5.98 279.42 0 267.95 0c-11.4 0-22.79 5.9-28.69 17.81l-65.43 132.38-146.38 21.29c-26.25 3.8-36.77 36.09-17.74 54.59l105.89 103-25.06 145.48C86.98 495.33 103.57 512 122.15 512c4.93 0 10-1.17 14.87-3.75l130.95-68.68 130.94 68.7c4.86 2.55 9.92 3.71 14.83 3.71 18.6 0 35.22-16.61 31.66-37.4l-25.03-145.49 105.91-102.98c19.04-18.5 8.52-50.8-17.73-54.6zm-121.74 123.2l-18.12 17.62 4.28 24.88 19.52 113.45-102.13-53.59-22.38-11.74.03-317.19 51.03 103.29 11.18 22.63 25.01 3.64 114.23 16.63-82.65 80.38z"></path></svg>
                        </div>
                            <span class="homePage__cartPrice font12BoldSpecial">{{cartItem.quantity}} x {{cartItem.price}}</span>
                </div>
            </div>
            <button class="deleteBtn dlt" @click="$emit('rmv', cartItem)">
                <svg class="deleteImg dlt"  fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path class="dlt" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </button>
        </div> 
    `
};


const Crt = {
    inject: ['API', 'getJson'],
    components: {
        CartItem
    },

    data() {
        return {
            showCart: false,
            cartUrl: 'cart.json',
            imgCart: 'img2/card',
            cartItems: [],
        }
    },
    methods: {

        remove(product){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
        },

    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    console.log(this.cartItems);
                }
            });

        console.log('Hello');
    },
    template: `
        <div class="cart displayNone">
        <CartItem
            v-for="item of cartItems" 
            :key="item.id_product"
            :img = "imgCart+item.id_product+'.jpg'"
            :cartItem="item"
            @rmv="remove"
        ></CartItem>
        <div class="cartText">
            <span class="cartTotal font16Bold">TOTAL</span>
            <span class="cartSum font16Bold total">$500.00</span>
        </div>
        <button class="cartCheckout">CHECKOUT</button>
        <a class="cartHref" href="shoppingCart.html"><button class="goToCart">GO TO CART</button></a>
    </div>
                    
              
    `
};

const app = Vue.createApp({
    components: {
        Crt
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/ViktoriaV-start/advancedJS/master/brand_data/',
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
        },

        toggle() {
            document.querySelector('.cart').classList.toggle('displayNone');
        }
    }


});





app.mount('#app');