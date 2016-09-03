
var baiduSearch = require('./../baidu')
baiduSearch('Microsoft',((err,res)=>{

	res.links.forEach(function(item,idx){
			console.log('title is ' + item.title)
			console.log('link is ' + item.link)
	})
}
)
)