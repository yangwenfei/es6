let a = 1
console.log(a)

const preloadImage = function(path) {
    return new Promise(function(resolve, reject) {
        const image = new Image()
        image.onload = resolve(1)
        image.onerror = reject
        image.src = path
        console.log(image.src)
    })
}
preloadImage(
    'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=2408923910,2800224014&fm=85&s=FE14118907F01F8056B45D0B0300E0C0'
).then(num => {
    console.log(num)
})

//下面是一个用Promise对象实现的 Ajax 操作的例子。

const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject) {
        const handler = function() {
            if (this.readyState !== 4) {
                return
            }
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
    })

    return promise
}

getJSON('/posts.json').then(
    function(json) {
        console.log('Contents: ' + json)
    },
    function(error) {
        console.error('出错了', error)
    }
)