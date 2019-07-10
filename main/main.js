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