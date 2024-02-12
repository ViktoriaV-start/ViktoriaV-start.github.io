import {Catalog} from "./Catalog.js";
import {Cart} from "../catalog-men/Cart.js";
import {CartQuantity} from "../catalog-men/CartQuantity.js";
import {Search} from "../catalog-men/Search.js";


const App = {
    components: {
        'catalog': Catalog,
        'cart': Cart,
        'cart-quantity': CartQuantity,
        'search': Search
    },

    data() {
        return{
            API: 'https://raw.githubusercontent.com/ViktoriaV-start/advancedJS/master/brand_data',
            showCart: false,
            totalQuantity: 0,
            showQuantity: true,
            show: true,

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
                .catch(error => console.log(error))
        },

        proceedBuying() {
            if (this.showCart) {
                this.showCart = false;
            }
        },

        get(totalQuantity) {
            this.totalQuantity = totalQuantity;
            if (this.totalQuantity === 0) {
                this.showCart = false;
                this.showQuantity = false;
            } else {
                this.showQuantity = true;
            }
        },

        hide() {
            this.show = false;
        },

        display() {
            this.show = true;
        }
    },
};

Vue.createApp(App).mount('#app');
