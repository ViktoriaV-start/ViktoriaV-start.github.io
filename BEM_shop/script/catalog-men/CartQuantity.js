
export const CartQuantity = {

    data() {
        return{
            totalQuantity: 5
        }
    },


    template: `
    <div class="header__cart-quantity">{{getTotalQuantity}}</div>
    `

}