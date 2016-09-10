
var request = require('request');
var http = require('http');
var util = require('util')
var cheerio = require('cheerio')

var baseURL = "http://www.baidu.com/s?wd=%s&pn=%s"



function baidu(keyWord, beginPage, callbackFun) {

	var startIndex = 0
	if (typeof callbackFun === 'undefined') {
		callbackFun = beginPage
	} else {
		if (beginPage > 0) {
			startIndex = (beginPage - 1) * 10
		}
	}

	var enrichedURL = util.format(baseURL, keyWord, startIndex)

	var options = {
		url: enrichedURL,
		method: 'GET'
	}

	request(options, function(err, resp, body) {
		if ((err == null) && resp.statusCode === 200) {
			var $ = cheerio.load(body)

			var res = {
				url: enrichedURL,
				keyWord: keyWord,
				beginPage: beginPage,
				links: [],
				$: $,
				body: body
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

				res.links.push(item)
			})

			callbackFun(null, res)
		}
		else {
			console.log('*. Error returned')
			callbackFun(new Error('Error on response' + (resp ? ' (' + resp.statusCode + ')' : '') + ':' + err + ' : ' + body), null, null)
		}
	})
}

module.exports = baidu
