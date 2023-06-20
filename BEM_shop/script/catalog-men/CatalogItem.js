export const CatalogItem = {
    props: ['img', 'product'], //компонент получает некоторые данные с каждым новым полученным товаром

    data() {
        return {
            heartShow: false
        }
    },

    // methods: {
    //     foo() {
    //         console.log(this.heartShow);
    //     }
    // },

    template: `
        <figure class="catalog__card">
            <img :src="img" :alt="product.product_name">
            <figcaption class="catalog__card-title">
                <h3 class="catalog__card-name">{{product.product_name}}</h3>
                <p class="catalog__card-price">\${{product.price}}.00</p>
            </figcaption>
            <div class="catalog__card-hover"></div>
            <button class="catalog__card-hover-cart" @click="$root.$refs.refCart.add(product)" >
                <svg class="white-cart" fill="rgb(255, 255, 255)" width="32" height="29" viewBox="0 0 32 29">
                    <path d="M31.899,7.565 L26.493,19.977 C26.296,20.410 25.882,20.686 25.409,20.686 L10.554,20.686 C10.021,20.686 9.548,20.331 9.410,19.819 L4.577,2.364 L1.184,2.364 C0.533,2.364 -0.000,1.832 -0.000,1.182 C-0.000,0.532 0.533,-0.001 1.184,-0.001 L5.464,-0.001 C5.997,-0.001 6.471,0.354 6.609,0.866 L11.442,18.322 L24.620,18.322 L28.999,8.274 L14.401,8.274 C13.750,8.274 13.217,7.742 13.217,7.092 C13.217,6.442 13.750,5.910 14.401,5.910 L30.814,5.910 C31.208,5.910 31.583,6.107 31.800,6.442 C32.017,6.777 32.057,7.190 31.899,7.565 ZM9.429,23.641 C10.909,23.641 12.112,24.843 12.112,26.320 C12.112,27.798 10.909,28.999 9.429,28.999 C7.950,28.999 6.747,27.798 6.747,26.320 C6.747,24.843 7.950,23.641 9.429,23.641 ZM26.020,23.641 C27.500,23.542 28.782,24.665 28.881,26.123 C28.920,26.852 28.703,27.542 28.230,28.073 C27.756,28.625 27.105,28.940 26.395,28.999 C26.336,28.999 26.257,28.999 26.198,28.999 C24.797,28.999 23.633,27.896 23.535,26.498 C23.436,25.040 24.541,23.739 26.020,23.641 Z"/>
                </svg>
                <span class="catalog__add-to-cart" >Add to cart</span>
            </button>
            <div class="catalog__hover-icon-wrapper">
                <button class="catalog__card-hover-icon" type="submit">
                    <svg fill="rgb(255, 255, 255)" width="23px" height="22px" viewBox="0 -5 23 22">
                    <path
                        d="M21.702,7.179 C21.325,6.788 20.714,6.788 20.338,7.179 L18.986,8.582 L18.986,1.001 C18.986,0.448 18.554,-0.000 18.021,-0.000 L8.582,-0.000 C8.050,-0.000 7.618,0.448 7.618,1.001 C7.618,1.553 8.050,2.002 8.582,2.002 L17.057,2.002 L17.057,8.582 L15.705,7.178 C15.328,6.787 14.718,6.787 14.342,7.178 C13.965,7.569 13.965,8.202 14.341,8.594 L17.339,11.705 C17.521,11.894 17.766,11.999 18.021,11.999 C18.278,11.999 18.522,11.893 18.704,11.705 L21.702,8.594 C22.078,8.203 22.078,7.569 21.702,7.179 ZM13.401,9.998 L4.926,9.998 L4.926,3.418 L6.278,4.821 C6.467,5.017 6.713,5.114 6.960,5.114 C7.207,5.114 7.454,5.017 7.642,4.821 C8.019,4.430 8.019,3.797 7.642,3.406 L4.644,0.293 C4.463,0.106 4.218,0.000 3.962,0.000 C3.705,0.000 3.460,0.106 3.279,0.293 L0.282,3.406 C-0.095,3.797 -0.095,4.430 0.282,4.821 C0.659,5.212 1.268,5.212 1.645,4.821 L2.998,3.418 L2.998,10.999 C2.998,11.551 3.429,12.000 3.962,12.000 L13.401,12.000 C13.934,12.000 14.365,11.551 14.365,10.999 C14.365,10.446 13.934,9.998 13.401,9.998 Z"/>
                </svg>
            </button>
            <button class="catalog__card-hover-icon" @click="heartShow = !heartShow">
                <i class=" heart heart_thin far fa-heart fa-lg" v-show="!heartShow"></i>
                <i class="heart heart_pink fas fa-heart fa-lg" v-show="heartShow"></i>
            </button>
        </div>
        </figure>
    
    `
};