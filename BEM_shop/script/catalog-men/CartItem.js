export const CartItem = {
    props: ['img', 'cartItem'],
    emits: ['remove', 'reduce', 'add'],
    template: `
        
        <div class = "cart__line">
            <div class="cart__product">
                <img class="cart__photo" :src="img" :alt="cartItem.product_name">
                <div class="cart__details">
                    <span class="cart__name">{{cartItem.product_name}}</span>
                    <span class="cart__info">Color:<span class="cart__info_spec">{{cartItem.color}}</span></span>

                    <span class="cart__info">Size:<span class="cart__info_spec">{{cartItem.size}}</span></span>
                </div>
            </div>

            <span class="cart__data">\${{cartItem.price}}</span>

            <div class="cart__input">
                <div class="cart__quantity-wrap">
                    <button class="cart__quantity-btn quantityMinus" type="submit" @click="$emit('reduce', cartItem)">
                        <i class="fas fa-caret-left arrow fa-lg quantityMinus"></i>
                    </button>

                    <span class="cart__quantity">{{cartItem.quantity}}</span>
                
                    <button class="cart__quantity-btn quantityPlus" type="submit" @click="$emit('add', cartItem)">
                        <i class="fas fa-caret-right arrow fa-lg quantityPlus"></i>
                    </button>
                </div>
            </div>

            <span class="cart__data">FREE</span>
            <span class="cart__data cart__price">\${{cartItem.quantity*cartItem.price}}</span>
            <button class="cart__delete-wrap cart__dlt" @click="$emit('remove', cartItem)">
                <svg class="cart__delete cart__dlt" fill="currentColor" height="15" width="15" viewBox="0 0 512 512">
                <path class="cart__dlt" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </button>
        </div>
        
    `
}