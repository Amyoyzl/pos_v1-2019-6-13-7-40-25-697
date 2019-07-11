'use strict';


const addCountTag = (countTag, tag, count) => {
    let index = indexOfCountTag(tag, countTag);
    if (index >= 0) {
        countTag[index].count += count;
    } else {
        countTag.push({ 'id': tag, 'count': count });
    }
}
const indexOfCountTag = (id, countTag) => {
    return countTag.findIndex((tag, index, arr) => {
        return tag.id == id;
    });
}
const countCart = (tags) => {
    const countTag = [];
    tags.forEach(tag => {
        let tagArr = tag.split('-');
        if (tagArr.length == 1)
            addCountTag(countTag, tag, 1);
        else
            addCountTag(countTag, tagArr[0], Number(tagArr[1]));
    })
    return countTag;
}


const getItem = (barcode, items) => {
    return items.find(item => {
        return barcode == item.barcode;
    })
}

const isPromotions = (barcodes, barcode) => {
    return barcodes.includes(barcode);
}

const getCart = countTag => {
    const items = loadAllItems();
    const promotions = loadPromotions();
    const cart = [];
    countTag.forEach(tag => {
        let item = getItem(tag.id, items);
        if (item != undefined) {
            item.count = tag.count;
            item.total = item.price * item.count;
            // 有优惠
            if (isPromotions(promotions[0].barcodes, tag.id)) {
                item.total = item.total - Math.floor(item.count / 3) * item.price;
            }
            cart.push(item);
        }
    })
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