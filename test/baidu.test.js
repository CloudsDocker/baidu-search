
// to run this test, be sure to use '-w' option in mocha, e.g. mocha ./test/baidu.test.js -w
// this TBD

var chai = require('chai')
var assert = require('assert')
var baiduSearch = require('./../baidu')
var expect = chai.expect



describe("my first test", function(){


  it('get baidu search start',function(done){
    var query="google"
    // console.log('*. kick start search ')

    var done=function (){
      console.log('====== 1st Test passed !!  (get baidu search start) ======')
    }

    baiduSearch(query, function (err, res) {
      var allLinks = []
      // assert.ifError(err)
      console.log('1: length is :'+allLinks.length)
      assert(allLinks.length === 10)
    });
    done();

  }),
  it('get first result',function(done){
    var query="microsoft"

    var done=function (){
      console.log('====== 2nd Test passed !!  (get first result) ======')
    }

    baiduSearch(query, function (err, res) {
      console.log('index:'+res.links[0].title.toLowerCase().indexOf(query.toLowerCase()))
      console.log('index2:'+res.links[0].title.toLowerCase().indexOf(query.toLowerCase())>-1)
      assert(res.links[0].title.toLowerCase().indexOf(query.toLowerCase())>-1)
      
    });

    done();

  })

})

