export const Search = {
    data() {
        return{
            userSearch: ''
        }
    },

    template: `
                <form class="search-form" action="#" method="post" @submit.prevent="">
                    <input class="search-form__input" type="text" placeholder="Search for item..." v-model.lazy="userSearch">
                    <button type="submit" class="search-form__submit">
                        <i class="fas fa-search fa-lg"></i>
                    </button>
                </form>
    `
}