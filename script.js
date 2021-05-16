const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Dress', price: 200 },
    { title: 'Blazer ', price: 180 },
    { title: 'Vest ', price: 75 },
    { title: 'Sweater ', price: 250 },
  ];
  
const renderGoodsItem = (title = 'Товар еще не добавлен', 
    price = 0) => `<div class="goods-item"><h3>${title}</h3><p>Price: ${price}$</p></div>`;
  
const renderGoodsList = (arr = 'Корзина временно недоступна') => {
    if (Array.isArray(arr)) {
        arr.forEach(elem => {
            document.querySelector('.goods-list').innerHTML += renderGoodsItem(elem.title, elem.price);
        });
    } else {
        document.querySelector('.goods-list').innerHTML = arr;
    }
};
  
renderGoodsList(goods);