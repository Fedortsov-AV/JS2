const baseUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const getListUrl = '/catalogData.json';
const getBasketUrl = '/getBasket.json';
const addBasketUrl = '/addToBasket.json';
const removeFromBasketUrl = '/deleteFromBasket.json';



let goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    ];

    const basketName = 'Добавить в корзину';
    
    
const renderList = (items) => {
        return items.map(item => {
            const isAded = true; 
            const basketName = isAded ? 'Добавить в корзину' : 'Удалить из корзины';
            const basketUrl = isAded ? `${baseUrl}${addBasketUrl}` : `${baseUrl}${removeFromBasketUrl}`;
            return `
                <div class ="goods-list__item">
                    <img />
                    <span class="heading">${item.product_name}</span>
                    <a class="button" href="${basketUrl}">${basketName}</a>
                </div>
                `;
        }).join(''); 
    };

    const renderBasketList = (items) => {
        return items.map((item) => {
            return `
                <div class ="basketgoods-list__item">
                    <span class="heading">${item.product_name}</span>
                    <a class="button" href="${baseUrl}${removeFromBasketUrl}">удалить</a>
                </div>
                `;
        }).join(''); 
    };

 

const insertCode = (container, html) => {
        container.innerHTML = html; 
    };

class Product {
    constructor (title, price){
        this.title = title;
        this.price = price;
    }

    addToBasket(){


    }

    render() {
        return `
            <div class ="goods-list__item">
                <img />
                <span class="heading">${this.title}</span>
                <span class="price">${this.price}</span>
                <a class="button" href="#">${basketName}</a>
            </div>
            `;
    }
}

class Goods  {
    constructor(goods){
        this.goods = goods;
    }

    render (container) {
        let html = '';
        for (let i in this.goods){
            const goodsItem = this.goods[i];
            html += goodsItem.render();
        }
        container.innerHTML = html;
    }

}

// 1. Добавьте пустые классы для корзины товаров и элемента 
// корзины товаров. Продумайте, какие методы понадобятся для 
// работы с этими сущностями.
// 2. Добавьте для GoodsList метод, определяющий суммарную 
// стоимость всех товаров.

class Basket {      //Класс для корзины
    
        
}

class GoodsInBasketList { // Класс для элемента корзины
    constructor (){
        this.goodsInBasket = [
            { title: 'Shirt', price: 150 },
        ];
    }

    //Метод удаления товара из корзины
    removeFromBasket (){ 

    }
    //Метод подсчета стоимости товаров в корзине
    costGoodsInBasket() {
        return this.goodsInBasket.reduce((cost, item) => cost + item.price, 0);      
    }
    //Метод подсчета количества наименований товаров в корзине
    countGoodsInBasket() {
        return this.goodsInBasket.length;
    }
    //Метод отрисовки товаров в корзине
    render(){
        
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    let isBasket = false;
    // const r = await fetch(`${baseUrl}${getListUrl}`);
    // goods = await r.json();
    const items = goods.map((product) => new Product(product.title, product.price)); 
    const goodsList = new Goods(items);


    let basketGoods = await (await fetch(`${baseUrl}${getBasketUrl}`)).json();
    let goodsInBasket = basketGoods.contents
    
    
    const listElement = document.querySelector('.goods-list');
    const basketList = document.querySelector('.basket-list')
    
    goodsList.render(listElement);
    
    // insertCode(listElement, renderList(goods));
    insertCode(basketList, renderBasketList(goodsInBasket))

    const cartBtn = document.querySelector('.cart-button');
    const cart = document.querySelector('.basket');

    cartBtn.addEventListener('click', () => {
        isBasket = !isBasket;
        cart.style.display = isBasket ? 'block' : 'none';
    });

});


