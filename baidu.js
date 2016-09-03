
var request = require('request');
var http = require('http');
var util = require('util')
var cheerio = require('cheerio')
var querystring = require('querystring')

var baseURL="http://www.baidu.com/s?wd=%s&pn=%s"



function baidu(keyWord,beginPage, callbackFun){
    console.log("* functionalities are under avtive development right now, pleaes be expected this will be ready shortly!")

    var startIndex = 0
    if (typeof callbackFun === 'undefined') {
      callbackFun = beginPage
    } else {
      if(beginPage>0){
        startIndex = (beginPage-1)*10
      }
    }

    var enrichedURL = util.format(baseURL,keyWord,startIndex)
    console.log('*. new url is :' + enrichedURL)

    var options = {
      url: enrichedURL,
      method: 'GET'
    }

    request(options, function(err,resp,body){
      console.log("*.---- Called request-------");
      if ((err == null) && resp.statusCode === 200) {
        console.log('*. Request returned successfully')
        var $ = cheerio.load(body)

        var res = {
          url: enrichedURL,
          keyWord: keyWord,
          beginPage: beginPage,
          links: [],
          $: $
          // ,
          // body: body
        }


        $('div.c-container').each(function (counter, element) {
        var linkElem = $(element).find('h3.t a')
        var descElem = $(element).find('div.c-abstract')
        var item = {
          title: $(linkElem).first().text(),
          link: $(linkElem).attr('href'),
          description: null
        }

        $(descElem).find('div').remove()
          item.description = $(descElem).text()

        console.log('*.  Adding item : '+ item)
        console.log('*.  Adding item : '+ JSON.stringify(item))
        res.links.push(item)
      })

        // console.log('*. res is :' + JSON.stringify(res));
        callbackFun(null,res)
      }
      else {
        console.log('*. Error returned');
        callbackFun(new Error('Error on response' + (resp ? ' (' + resp.statusCode + ')' : '') + ':' + err + ' : ' + body), null, null)
       }
    })
    console.log('*. Ended')
}

module.exports=baidu
