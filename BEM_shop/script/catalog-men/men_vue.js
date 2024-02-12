import {Cart} from "./Cart.js";
import {CatalogMen} from "./CatalogMen.js";
import {CartQuantity} from "./CartQuantity.js";
import {Search} from "./Search.js";
import {SearchSize} from "./SearchSize.js";
import {SearchPrice} from "./SearchPrice.js";
import {Error} from "./Error.js";


const App = {
    components: {
        'catalog-men': CatalogMen,
        'cart': Cart,
        'cart-quantity': CartQuantity,
        'error': Error,
        'search': Search,
        'search-size': SearchSize,
        'search-price': SearchPrice,
    },

    data() {
        return{
            API: 'https://raw.githubusercontent.com/ViktoriaV-start/advancedJS/master/brand_data',
            showCart: false,
            totalQuantity: 0,
            showQuantity: true

        }
    },

    provide() {
        return {
            API: this.API,
            getJson: this.getJson
        }
    },

    methods: {
        async getJson(url){
            try {
          const result = await fetch(url);
          let res = await result.json();
          return res;
        } catch (error) {
          return this.$refs.refError.setText(error);
        }
                // .catch(error => console.log(error))
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
    },
};

Vue.createApp(App).mount('#app');

