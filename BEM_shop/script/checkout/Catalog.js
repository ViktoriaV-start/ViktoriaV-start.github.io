import {CatalogItem} from "../catalog-men/CatalogItem.js";  //получить компонент

export const Catalog = {
    inject: ['API', 'getJson'],
    components: {
        CatalogItem
    },
    emits: ['hide', 'display'],

    data() {
        return {
            catalogUrl: '/menPage.json',
            promoUrl: '/homePage.json',
            allProducts: [],
            imgCatalog: '/img1/card', // или './img1/card'
            showFiltered: false,
            heartShow: false,
            emptyCatalog: false,
        }
    },

    computed: {
        filtered() {
            if (this.emptyCatalog) {
                this.emptyCatalog = false;
            }
            let userSearch = '';
            let filteredProducts = [];

            this.allProducts.filter(el => {
                userSearch = this.$root.$refs.search.userSearch;
                if (new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name)) {
                    filteredProducts.push(el);
                }
            });
            if (userSearch.length !== 0) {
                this.showFiltered = true;
            } else {
                this.$emit("display");
                this.showFiltered = false;
            }

            if (filteredProducts.length === 0) {
                this.emptyCatalog = true;
                return;
            }

            if (filteredProducts.length !== 0 && userSearch.length !== 0) {
                this.$emit("hide");
                console.log(filteredProducts);
                return filteredProducts;
            }
        }
    },

    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.allProducts.push(el);
                }

            });
        this.getJson(`${this.API + this.promoUrl}`)
            .then(data => {
                for (let el of data) {

                    if (!this.allProducts.find(item => item.id_product === el.id_product)) {
                        this.allProducts.push(el);
                    }
                }
            });
    },

    template: `
        <div class="container mrg-btm" v-show="showFiltered">
          <p class="catalog__empty" v-show="emptyCatalog">No products found which match your selection</p>
          <div class="checkout__filter">
<!--здесь ниже вставляем новый компонент CatalogItem и передать динамическое img, product-->
                <CatalogItem 
                v-for="el of filtered" 
                :key="el.id_product"
                :img="imgCatalog + el.id_product + '.jpg'"
                :product="el"
                >
                </CatalogItem>
          </div>
        </div>
    `
};
