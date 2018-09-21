'use strict';

var a = 1;
console.log(a);

var preloadImage = function preloadImage(path) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
        console.log(image.src);
    });
};
preloadImage('https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2408923910,2800224014&fm=85&s=FE14118907F01F8056B45D0B0300E0C0');
