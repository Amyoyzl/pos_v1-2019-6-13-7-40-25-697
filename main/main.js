'use strict';

const inArray = (id, array) => {
    for (let i = 0; i < array.length; i++) {
        if (id == array[i].id)
            return i;
    }
    return -1;
}

const countCart = (tags) => {
    let countTag = [];
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

const getCart = countTag => {
    const items = loadAllItems();
    const cart = [];
    countTag.forEach(tag => {
        let item = getItem(tag.id, items);
        if (item != null) {
            item.count = tag.count;
            cart.push(item);
        }
    })
    return cart;
}