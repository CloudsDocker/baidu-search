//var baiduIt=require('baidu-search')


// function baidu(){
//     console.log("functionalities are under avtive development right now, pleaes be expected this will be ready shortly!")
// }
//
// baidu()
// console.log('test successeed!')

var chai = require('chai')
var baiduSearch = require('./../baidu')
var expect = chai.expect



describe("my first test", function(){
  it('*. kick start dummy test method',function(){
    console.log('*. kick start dummy ')
    expect(0).to.equal(0)
  });

  it('get baidu library init',function(){
    var query="google"
    console.log('*. kick start search ')

    // baiduSearch(query,function(err,res){})


    // baiduSearch(query, function (err, res) {
    //   console.log('------------');
    //   assert.ifError(err)
    //   allLinks = allLinks.concat(res.links)
    //   console.log(allLinks);
    // });

  new Promise((resolve,reject)=>{
    console.log('*. 111111 ')
       baiduSearch(searchString,(err,res)=>{
         console.log('*. 22222 ')
         if(err){
           reject({
             reason: 'A search error has occured :'

           })
         }else if (res.links.length===0){
             reject({
               reason: 'No results found:'
               // console.log('No results found:');
             })
           } else {
             console.log('=======:'+res.links[0].href);
             resolve(res.links[0].href)
           }
         })
     }).then((url)=>{
      console.log('*. Found result:'+url);
    }).catch((error)=>{
      console.log('A search error has occured 2222:'+ error);
    })
    // expect(0).to.equal(0)
  })
})
// ,

// search(){
//  return new Promise((resolve,reject)=>{
//    baiduSearch(searchString,(err,res)=>{
//      if(err){
//        reject({
//          reason: 'A search error has occured :'
//
//        })
//      }else if (res.links.length===0){
//          reject({
//            reason: 'No results found:'
//            // console.log('No results found:');
//          })
//        } else {
//          console.log('=======:'+res.links[0].href);
//          resolve(res.links[0].href)
//        }
//      })
//  })}
