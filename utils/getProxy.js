const axios = require('axios');


var controller={};

controller.getRequestProxy= async(api)=>{
	try{
		listProxy = await axios.get(api)
		let result=[]
		if(listProxy.data) result = listProxy.data.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/g)||[]
		return result

	}
	catch(err){
		console.log(err)
		return []
	}
}

controller.get = async(apis=[])=>{
	try{
		let listTask= apis.map(api=> controller.getRequestProxy(api))
		let result =[];
		let proxys= await Promise.all(listTask)
		 proxys = proxys.forEach(x=> result= [...result, ...x])
		return result || []
	}
	catch(err){
		console.log(err)
		return []
	}
}

module.exports = controller