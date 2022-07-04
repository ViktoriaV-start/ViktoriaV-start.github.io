export const SearchSize = {
    data() {
        return{
            userSearchSize: []
        }
    },

    template: `
                <div class="catalog__filter-size"> <span class="catalog__head-point">SIZE</span>
                    <div>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="XXS" v-model="userSearchSize"><span class="font_dark-grey-light">XXS</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="XS" v-model="userSearchSize"><span class="font_dark-grey-light">XS</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="S" v-model="userSearchSize"><span class="font_dark-grey-light">S</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="M" v-model="userSearchSize"><span class="font_dark-grey-light">M</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="L" v-model="userSearchSize"><span class="font_dark-grey-light">L</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="XL" v-model="userSearchSize"><span class="font_dark-grey-light">XL</span> </label>
                        <label class="catalog__size-item">
                            <input type="checkbox" class="catalog__size" value="XXL" v-model="userSearchSize"><span class="font_dark-grey-light">XXL</span> </label>
                    </div>
                </div>
    `
}