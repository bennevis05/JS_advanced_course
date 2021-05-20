class GoodsItem {
    constructor(title = 'Товар еще не добавлен', price = 0) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>Price: ${this.price}$</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Dress', price: 200 },
            { title: 'Blazer ', price: 180 },
            { title: 'Vest ', price: 75 },
            { title: 'Sweater ', price: 250 },
        ];
    }

    render() {
        let htmlResult = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            htmlResult += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = htmlResult;
    }

    totalСost() {
        let sum = 0;
        for (let good of this.goods) {
            sum += good.price;
        }
        console.log(sum);
        return sum;
    }
}

class Basket extends GoodsList {
    constructor(...args) {
        super(...args);
    }
  
    addProduct() {}

    deleteProduct() {}

    filteringByPrice() {}
}
  
class BasketItem extends GoodsItem {
    constructor(...args) {
        super(...args);
        this.totalQantity = 0;
    }
}

const productsList = new GoodsList();
productsList.fetchGoods();
productsList.render();
productsList.totalСost();
