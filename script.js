const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}
  

class GoodsItem {
    constructor(id_product, product_name = 'Товар еще не добавлен', price = 0) {
        this.id_product = id_product,
        this.product_name = product_name;
        this.price = price;
    }

    getGoodItem() {
        let good = {
            'id_product': this.id_product,
            'product_name': this.product_name,
            'price': this.price
        }
        return good;
    }

    render() {
        return `<div class="goods-item">
                    <h3 id="product-name-${this.id_product}">${this.product_name}</h3>
                    <p id="product-price-${this.id_product}">Price: ${this.price} руб.</p>
                    <button class="add-basket-btn" 
                        data-product='${JSON.stringify(this.getGoodItem())}' 
                        id="add-product-${this.id_product}">
                        Добавить в корзину
                    </button>
                </div>`;
    }
}


class GoodsList {
    basket = new Basket();

    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods(callbackFunc) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            callbackFunc();
        });
    }

    addToBasket(event) {
        let elem = event.target;
        let product = JSON.parse(elem.dataset.product);
        this.basket.addProduct(product);
    }

    setListeners() {
        this.filteredGoods.forEach(elem => {
            document.getElementById(`add-product-${elem.id_product}`).addEventListener(
                'click', (event) => this.addToBasket(event));
        });
        document.querySelector('.main-page').addEventListener('click',
            (event) => this.render(event));
    }

    render() {
        let htmlResult = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            htmlResult += goodItem.render();
        });
        document.querySelector('.basket').style.display = "none";
        document.querySelector('.goods-list').innerHTML = htmlResult;
        document.querySelector('.goods-list').style.display = "block";
        this.setListeners();
    }

    totalСost() {
        let sum = 0;
        for (let good of this.goods) {
            sum += good.price;
        }
        console.log(sum);
        return sum;
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
}


class Basket {
    constructor() {
        this.items = [];
    }
  
    addProduct(product) {
        this.items.push(product);
        document.querySelector('.cart-count').innerHTML = `Всего товаров: ${this.items.length}`;
        document.querySelector('.cart-button').addEventListener('click',
            (event) => this.render(event));
    }

    deleteProduct(event) {
        let producId = event.target.dataset.productId;
        this.items = this.items.filter((item) => String(item.id_product) !== String(producId));
        document.querySelector('.cart-count').innerHTML = `Всего товаров: ${this.items.length}`;
        this.render();
    }

    setListeners() {
        this.items.forEach(elem => {
            document.getElementById(`delete-product-${elem.id_product}`).addEventListener(
                'click', (event) => this.deleteProduct(event));
        });
    }

    render() {
        let htmlResult = '';
        this.items.forEach(item => {
            const basketItem = new BasketItem(item.id_product, item.product_name, item.price);
            htmlResult += basketItem.render();
        });
        document.querySelector('.goods-list').style.display = "none";
        document.querySelector('.basket').innerHTML = htmlResult;
        document.querySelector('.basket').style.display = "block";
        this.setListeners();
    }

}


class BasketItem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.totalQantity = 0;
    }

    render() {
        return `<div class="goods-item">
                    <h3 id="product-name-${this.id_product}">${this.product_name}</h3>
                    <p id="product-price-${this.id_product}">Price: ${this.price} руб.</p>
                    <button class="add-basket-btn" 
                        data-product-id='${this.id_product}' 
                        id="delete-product-${this.id_product}">
                        Удалить товар
                    </button>
                </div>`;
    }
}


const productsList = new GoodsList();
productsList.fetchGoods(() => {
    productsList.render();
});

const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.goods-search')
searchButton.addEventListener('click', (e) => {
  const value = searchInput.value;
  productsList.filterGoods(value);
});
