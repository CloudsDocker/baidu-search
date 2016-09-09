
var baiduSearch = require('./../baidu')
var assert = require('assert')
var request = require('request')
var cheerio = require('cheerio')

var query = 'Microsoft'
// var query='Macrosoft'
var query_cn = '微软'

baiduSearch(query, (err, res) => {

	// test 1:  more records per page returned
	assert(res.links.length > 0)

	// test 2: every pages contains the search keyword
	res.links.forEach(function (item, idx) {
		assert(item.title.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.title.toLowerCase().indexOf(query_cn.toLowerCase()) > -1)
	})


	var download = function (url) {
		// console.log('=====start======:url is : '+ url)
		return new Promise((resolve, reject) => {
			request(url,(error, response, body) => {
				if(!error && response.statusCode == 200){
					resolve(body)
				} else {
					reject({ reason: 'unable to download page' })
				}
			})
		})
	}

	// test 3: open the 1st link, it should contains the keyword

	download(res.links[0].link).then(html => {
		var content = html.toLowerCase()
		assert(content.indexOf(query.toLowerCase()) > -1 || content.indexOf(query_cn.toLowerCase()) > -1)
	})
	.catch(error => {
		console.error('failed' + error)
		assert(1===0)
	})
})
