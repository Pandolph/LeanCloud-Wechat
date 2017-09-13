
var request = require("request")

var content = 'lin-pan-3'
//var content = 'f35fcb19ea50373fc10f2219f4a12754'
//var content = 'https://www.zhihu.com/people/lin-pan-3'
//var content = 'https://www.zhihu.com/people/f35fcb19ea50373fc10f2219f4a12754'
//var content = '林潘'


      if(content.indexOf('http') === 0){
      	arr=content.split('/')
		arr2 = arr[arr.length-1]
        content = arr2
      }

var url = "http://api.kanzhihu.com/searchuser/"+ content
//var url = "http://api.kanzhihu.com/searchuser/"+ID
	//console.log(url)

//console.log(url)

	request({
		url: url,
		json: true
	}, function (error, response, body) {

		if (!error && response.statusCode === 200) {
	      //console.log(body) // Print the json response
	      //console.log(body.users)
          //content: body.users[1].hash
          //console.log()
          if (body.error ==='') {
          	//console.log('no user')
          	//console.log(body)
          	//console.log(body)
          	var url = "http://api.kanzhihu.com/userdetail2/"+body.users[0].hash
          	
          	request({
          		url: url,
          		json: true
          	}, function (error, response, body) {

          		if (!error && response.statusCode === 200) {
		    	console.log(body.topanswers[0].title) // Print the json response
		      //console.log(body) // Print the json response
		      //console.log(body.users)


		  }
		})


          }
          else{

          	var url = "http://api.kanzhihu.com/userdetail2/"+content
          	request({
          		url: url,
          		json: true
          	}, function (error, response, body) {

          		if (!error && response.statusCode === 200) {

          			if (body.error === ''){
		    	console.log(body.topanswers[0].title) // Print the json response
		      //console.log(body) // Print the json response
		      //console.log(body.users)
		  			}else{
		  				console.log('error')
		  			}


		  }
		})




          }





      }

  })










/*
{ error: '',
  count: 1,
  users: 
   [ { id: 'lin-pan-3',
       name: '林潘',
       hash: 'f4a0d077dcb4f4426c6e3a139bdd6bef',
       avatar: 'https://pic3.zhimg.com/744e6dda1fee7f9b1e1eabc9fbe256c6_l.jpg',
       signature: '微信pandolph_linpan，查询自己的知乎排名',
       answer: '75',
       agree: '38391',
       follower: '6358' } ] }

       */
