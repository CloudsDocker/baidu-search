# Objective
module to conduct search in http://www.baidu.com

# About baidu
baidu (http://www.baidu.com) is the largest search engine in China, it's google's equivalent here. It provide not only serach engine, but also Wikipedia like knowledge sharing, social networking, etc.


# How to test this lib
This lib is based on TDD (Test Driven Development), so you can look at the test cases first, which is the file `./test/unittest.js`, you can run the test as below
```sh
cd ./test/
node unittest.js
```
If there are failures, you'll see Assert Excpetioin, below is one sample. Otherwise, no errors means all tests passed.
```sh
assert.js:90
  throw new assert.AssertionError({
  ^
AssertionError: false == true
    at /Users/todzhang/dev/git/baidu-search/test/unittest.js:50:2
    at Request._callback (/Users/todzhang/dev/git/baidu-search/baidu.js:60:9)
  xxxxx
```


# How to use this lib
Firstly load this library via npm, for example
```sh
npm install baidu-search -save
```

Secondly, you should import this library in your source, e.g. 
```javascript
var baidu = require('baidu')
```

Next, you can use following approaches to make a search:
```javascript
baidu('Microsoft',((err,res)=>{
    console.log('Get title of first matched result:'+res.links[0].title)
    console.log('Get link of second matched result:'+res.links[1].link)

    console.log('print all matched results:')

    res.links.forEach(function(item,idx){
        console.log(' title :'+ item.title)
    })

    }))
```
# How to contact me
You can find my contact via npm listed email or wechat at helloworld_2000
