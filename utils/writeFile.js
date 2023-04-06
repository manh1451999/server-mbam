const fs = require('fs-extra')
const pathIpvanish= 'public/proxies/ipvanish.txt'
const controller= {}
const axios = require('axios');


controller.read=  (nameFile )=>{

	try{
	let dataFile = fs.readFileSync(nameFile,  {encoding:'utf8'});
	dataFile= dataFile.trim();
	let totalAcc = dataFile.split('\n');
	let listAcc= [] 
	if(totalAcc.length==0) throw new Error('đã hết proxy');
	for(index in totalAcc){
		let acc= totalAcc[index].trim()
		if(acc.includes(':'))
			listAcc.push(acc)
		// if(listAcc.length==count) break;


	}

	return listAcc
	}
	catch(err){
		console.log(err)
		return []
	}



}


controller.write=  (accs, nameFile= pathAccChecked, note='')=>{
	try{
	let dataFile = fs.readFileSync(nameFile,  {encoding:'utf8'})
	let data="";
	if(dataFile.length>0 && dataFile[dataFile.length-1]!='\n') data+='\n'

	if(typeof(accs)=="object"){
		accs.forEach(e=>{
			if(e.includes('@'))
				data =(note=='')? (data+ e +note+'\n'): (data+ e +" ==> "+note+'\n')
		})
	}
	else if(typeof(accs)=="string") data =(note=='')? (data+ accs +note+'\n'): (data+ accs +" ==> "+note+'\n')
	else throw new Error("email khong hop le")
	
	fs.appendFileSync(nameFile, data)
	}
	catch(err){
		console.log(err)
	}
}


controller.delete=  (acc, nameFile=pathAccUncheck )=>{
	try{
	let dataFile = fs.readFileSync(nameFile,  {encoding:'utf8'})
	dataFile= dataFile.trim()
	let accString = acc.email+":"+acc.pass
	dataFile=dataFile.split(accString).join("");
	dataFile=dataFile.trim()
	dataFile=dataFile.split('\r\r').join('\r');
	fs.writeFileSync(nameFile, dataFile)


	}
	catch(err){
		console.log(err)
	}

}

// var acc = controller.readAcc()
// controller.writeAcc("ok bạn ơi", "nick này ngon")
// controller.deleteAcc(acc)
// console.log("acc", acc)

// for(i=1000;i<=9999;i++){
// 	controller.writeAcc(`manhyellow${i}@film347.com:Manh.123456`)
// }


module.exports = controller