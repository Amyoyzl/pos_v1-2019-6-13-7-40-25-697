'use strict';


const countCart = (tags) => {
    return tags.reduce((countTag, tag) => {
        let tagArr = tag.split('-');
        if (tagArr.length == 1)
            countTag[tag] = countTag[tag] ? (countTag[tag] + 1) : 1;
        else {
            countTag[tagArr[0]] = countTag[tagArr[0]] ? (countTag[tagArr[0]] + Number(tagArr[1])) : Number(tagArr[1]);
        }
        return countTag;
    }, {});
}

const getItem = (barcode, items) => {
    return items.find(item => {
        return barcode == item.barcode;
    })
}

const computerPromotion = (item, promotions) => {
    if (promotions[0].barcodes.includes(item.barcode))
        return Math.floor(item.count / 3) * item.price;
    return 0;
}

const getCart = countTag => {
    const items = loadAllItems();
    const promotions = loadPromotions();
    const cart = [];
    for (let barcode in countTag) {
        let item = getItem(barcode, items);
        if (item != undefined) {
            item.count = countTag[barcode];
            item.total = item.price * item.count - computerPromotion(item, promotions);
            cart.push(item);
        }
    }
    return cart;
}

const getOriginalTotalMoney = (cart) => {
    return cart.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
}

const getTotalMoney = (cart) => {
    return cart.reduce((acc, item) => {
        return acc + item.total;
    }, 0);
}

const getReceipt = cart => {
    let receipt = `***<没钱赚商店>收据***\n`;
    cart.forEach(item => {
        receipt += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${item.total.toFixed(2)}(元)\n`;
    })
    receipt += "----------------------\n";
    let totalMoney = getTotalMoney(cart);
    let money = getOriginalTotalMoney(cart);
    receipt += `总计：${totalMoney.toFixed(2)}(元)\n节省：${(money - totalMoney).toFixed(2)}(元)\n`;
    receipt += "**********************";
    return receipt;
}

const printReceipt = (tags) => {
    let countTag = countCart(tags);
    let cart = getCart(countTag);
    console.log(getReceipt(cart));
}