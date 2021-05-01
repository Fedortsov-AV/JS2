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
        return items.map(item => {
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

document.addEventListener('DOMContentLoaded', async () => {
    let isBasket = false;
    const r = await fetch(`${baseUrl}${getListUrl}`);
    goods = await r.json();
    let basketGoods = await (await fetch(`${baseUrl}${getBasketUrl}`)).json();
    let goodsInBasket = basketGoods.contents
    console.log(goodsInBasket);
    
    const listElement = document.querySelector('.goods-list');
    const basketList = document.querySelector('.basket-list')
    
    insertCode(listElement, renderList(goods));
    insertCode(basketList, renderBasketList(goodsInBasket))

    const cartBtn = document.querySelector('.cart-button');
    const cart = document.querySelector('.basket');

    cartBtn.addEventListener('click', () => {
        isBasket = !isBasket;
        cart.style.display = isBasket ? 'block' : 'none';
    });

});


