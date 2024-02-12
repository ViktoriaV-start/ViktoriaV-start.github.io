export const SearchPrice = {
    data() {
        return{
            priceMin: 52,
            priceMax: 300
        }
    },

    mounted() {


        $(".js-range-slider").ionRangeSlider({
            type: "double",
            skin: "round",
            min: 52,
            max: 400,
            from: 52,
            to: 300,

            onFinish: (data) => {
                this.priceMin = data.from;
                this.priceMax = data.to;
            }
        });
    },

    template: `
              <div class="catalog__filter-price">
                <span class="catalog__head-point">PRICE</span>

                <input type="text" class="js-range-slider" name="my_range" value="">
                <span class="font_dark-grey-light catalog__min-price">$52</span>
                <span class="font_dark-grey-light catalog__max-price">$400</span>

              </div>
    `
}