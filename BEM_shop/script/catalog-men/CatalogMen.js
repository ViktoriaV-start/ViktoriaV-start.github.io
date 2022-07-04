import {CatalogItem} from "./CatalogItem.js";  //получить компонент

export const CatalogMen = {
    inject: ['API', 'getJson'],
    components: {
        CatalogItem
    },



    data() {
        return {
            catalogUrl: '/menPage.json',
            allProducts: [],
            imgCatalog: 'img1/card', // или './img1/card'
            heartShow: false,
            emptyCatalog: false,
            searchSize: false

        }
    },

    computed: {
        filtered() {
            this.searchSize = false;
            if (this.emptyCatalog) {
                this.emptyCatalog = false;
            }

            let filteredProducts = this.allProducts.filter(el => new RegExp(this.$root.$refs.search.userSearch, 'i').test(el.product_name));

            let filteredSize = filteredProducts.filter(el => {
                if (this.$root.$refs.size.userSearchSize.length !== 0) {
                    this.searchSize = true;
                }
                if (this.$root.$refs.size.userSearchSize.length === 0) {
                    return;
                }

                if (this.$root.$refs.size.userSearchSize.includes(el.size)) {
                    return el;
                }
            });

            if (this.searchSize && filteredSize.length === 0) {
                this.emptyCatalog = true;
                return filteredProducts = [];
            }

            if (filteredSize.length !== 0) {
                filteredProducts = filteredSize;
            }

            filteredProducts = filteredProducts.filter(el => {

                if (this.$root.$refs.refPrice.priceMin <= el.price && this.$root.$refs.refPrice.priceMax >= el.price) {
                    return el;
                }
            });

            if (filteredProducts.length === 0) {
                this.emptyCatalog = true;
            }

            return filteredProducts;
        }
    },

    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.allProducts.push(el);
               }
            });

    },

    template: `
        <div>
          <p class="catalog__empty" v-show="emptyCatalog">No products found which match your selection</p>
          <div class="catalog__content">
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

// `${this.img + el.id_product}.jpg`
// :img="imgCatalog + el.id_product + '.jpg'"  ВОТ ТАК МОЖНО СОЕДИНИТЬ ДАННЫЕ