var queryString = require('querystring')
var cheerio = require("cheerio")
var co = require('co')
var corequest = require('co-request')
var express = require('express')
var router = express.Router()
var murl = require('./requestsupport')

router.get('/',function(req,resq){
	
	var bookname=req.query.k
	var page = req.query.p || 0
	resq.set('Content-Type','text/html;charset=utf8')
	resq.write("<style>*{padding:0;margin:0;}img{width:100%}</style>");
	co(function*(){
		// var url = `https://www.google.com/search?tbm=isch&q=${k}&oq=${k}`
		var detailUrl = `https://www.google.com/ajax/pi/imgdisc?imgdii=uc9uNt3w_TH2OM`
		var url = `http://www.google.com.hk/search?async=_id:rg_s,_pms:s&q=kingboo&asearch=ichunk&tbm=isch&ijn=${page}&gws_rd=cr`
		var body = yield corequest(murl(url))
		var dom = JSON.parse(body.body)[1][1]
		var $=cheerio.load(dom)//,{decodeEntities:false})
		var imgs = $('img')
		for (var i=0;i<imgs.length;i++) {
			resq.write(imgs.eq(i).parent().html())
		}
		resq.end()
	})

})

module.exports = router
