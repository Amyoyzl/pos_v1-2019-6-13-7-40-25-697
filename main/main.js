'use strict';

const inArray = (id, array) => {
    for (let i = 0; i < array.length; i++) {
        if (id == array[i].id)
            return i;
    }
    return -1;
}

const countCart = (tags) => {
    const countTag = [];
    tags.forEach(tag => {
        let token = tag.indexOf('-');
        if (token < 0) {
            let index = inArray(tag, countTag);
            if (index >= 0) {
                countTag[index].count++;
            } else {
                countTag.push({
                    'id': tag,
                    'count': 1
                });
            }
        } else {
            let index = inArray(tag.substring(0, token), countTag);
            let number = parseFloat(tag.substring(token + 1));
            if (index > 0) {
                countTag[index].count += number;
            } else {
                countTag.push({
                    'id': tag.substring(0, token),
                    'count': number
                });
            }
        }
    })
    return countTag;
}

const getItem = (barcode, items) => {
    for (let i = 0; i < items.length; i++) {
        if (barcode == items[i].barcode)
            return Object.assign({}, items[i]);
    }
    return null;
}

const isContain = (barcodes, barcode) => {
    for (let i = 0; i < barcodes.length; i++) {
        if (barcode == barcodes[i])
            return true;
    }
    return false;
}

const getCart = countTag => {
    const items = loadAllItems();
    const promotions = loadPromotions();
    const cart = [];
    countTag.forEach(tag => {
        let item = getItem(tag.id, items);
        if (item != null) {
            item.count = tag.count;
            item.total = item.price * item.count;
            // 有优惠
            if (isContain(promotions[0].barcodes, tag.id)) {
                item.total = item.total - Math.floor(item.count / 3) * item.price;
            }
            cart.push(item);
        }
    })
    return cart;
}

const getReceipt = cart => {
    let totalMoney = 0;
    let money = 0;
    let receipt = `***<没钱赚商店>收据***\n`;
    cart.forEach(item => {
        receipt += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${item.total.toFixed(2)}(元)\n`;
        totalMoney += item.total;
        money += item.price * item.count;
    })
    receipt += "----------------------\n";
    receipt += `总计：${totalMoney.toFixed(2)}(元)\n节省：${(money - totalMoney).toFixed(2)}(元)\n`;
    receipt += "**********************";
    return receipt;
}

const printReceipt = (tags) => {
    let countTag = countCart(tags);
    let cart = getCart(countTag);
    console.log(getReceipt(cart));
}