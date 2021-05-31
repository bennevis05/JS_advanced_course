const app = new Vue({
    el: '#app',
    data: {
        API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        goods: [],
        filteredGoods: [],
        searchLine: '',
        basketItems: [],
        isVisibleCatalog: true,
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url, callback) {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
              }
            xhr.open('GET', url, true);
            xhr.send();
        },

        // Below are the onclick event handlers

        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        addToBasket(product) {
            this.basketItems.push(product);
        },
        removeFromBasket(product) {
            this.basketItems = this.basketItems.filter((item) => String(item.id_product) !== String(product.id_product));
        },
        showBasket() {
            this.isVisibleCart = true;
            this.isVisibleCatalog = false;
        },
        showCatalog() {
            this.isVisibleCatalog = true;
            this.isVisibleCart = false;
        }
    },
    mounted() {
        this.makeGETRequest(`${this.API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }
});