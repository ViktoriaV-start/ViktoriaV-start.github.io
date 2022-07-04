import {CartItem} from "./CartItem.js";


export const Cart = {
    inject: ['API', 'getJson'],
    components: {
        CartItem
    },
    emits: ['get'],
    props: ['showCart'],

    data() {
        return{
            cartUrl: '/cartPage.json',
            imgCart: '/img2/card',
            cartItems: [],
            totalQuantity: 7
        }
    },

    methods: {
        getTotalQuantity() {
            let totalQuantity = 0;
            this.cartItems.forEach(function(el) {
                totalQuantity = totalQuantity + el.quantity;
            });
            this.totalQuantity = totalQuantity;
            this.$emit("get", this.totalQuantity);
        },

        remove(item) {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
            this.getTotalQuantity();
        },

        reduce(item) {
            if (item.quantity > 1) {
                item.quantity--
                this.getTotalQuantity();
            } else {
                this.remove(item);
                this.getTotalQuantity();
            }
        },

        add(item) {
            let findItem = this.cartItems.find(el => el.id_product === item.id_product);

            if (findItem) {
                findItem.quantity++
                this.getTotalQuantity();
            } else {
                let newItem = Object.assign({quantity: 1}, item);
                this.cartItems.push(newItem);
                this.getTotalQuantity();
            }
        },

    },

    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
                this.getTotalQuantity();
            });
    },

    template: `
    <section class="cart-wrapper container">
        <div class="cart">
            <div class="cart__header">
                <h3 class="cart__header-item">PRODUCT DETAILS</h3>
                <span class="cart__header-item cart__header-item_centre">UNIT PRICE</span>
                <span class="cart__header-item cart__header-item_centre">QUANTITY</span>
                <span class="cart__header-item cart__header-item_centre">SHIPPING</span>
                <span class="cart__header-item cart__header-item_centre">SUBTOTAL</span>
                <span class="cart__header-item cart__header-item_centre">ACTION</span>
            </div>
            <p v-if="!cartItems.length" class="cart__p">Cart is empty</p>
            <!--здесь ниже вставляем новый компонент CatalogItem и передать динамическое img, product-->
                <CartItem 
                v-for="el of cartItems" 
                :key="el.id_product"
                :img="imgCart + el.id_product + '.jpg'"
                :cartItem="el"
                @remove="remove"
                @reduce="reduce"
                @add="add"
                >
                </CartItem>
            
            <div class="cart__buttons">
                <button class="cart__btn cart__continue" @click="$root.proceedBuying">Continue shopping</button>
                <a href="checkout.html"><button class="cart__btn">Proceed to checkout</button></a>
            </div>

        </div>
    </section>
    
    `
};