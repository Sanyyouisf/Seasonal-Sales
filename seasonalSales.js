//You should load both file via XHRs
// and store the contents in two different JavaScript variables in your code.

var myProductRequest = new XMLHttpRequest();
var myDepartementRequest = new XMLHttpRequest();
var container = document.getElementById("container");

//lists all the products ,department name, and the price.
function makeProductDom(xhrPData){    
    var productString = "";
    var currentproduct;
    for(var i = 0; i < xhrPData.products.length; i++) {
        currentproduct = xhrPData.products[i];
        productString += `<h3 class="name">${i+1} -product name : ${xhrPData.products[i].name}</h3> `;
        productString +=`<h5 class="price">price  : ${xhrPData.products[i].price}</h5>`;
        console.log("the product loop number : ",i);
        // makeDepartmentDom(xhrDData);

		    function makeDepartmentDom(xhrDData){
		    	console.log("makeDepartmentDom function");
		    	for(var j = 0; j < xhrDData.categories.length; j++) {
		    		console.log("for statement");	
		        	if ( xhrPData.products[i].category_id === xhrDData.categories[j].id){
		        		departmentString += `<h3> the department is ${xhrDData.categories[j].name}</h3>`	;
		    			console.log("the department loop number : ",j);
		    		}
		    	}
        	}
    }
    container.innerHTML = productString;
}

// function makeDepartmentDom(xhrDData){
// 		    	console.log("makeDepartmentDom function");
// 		    	for(var j = 0; j < xhrDData.categories.length; j++) {
// 		    		console.log("for statement");	
// 		        	if ( xhrPData.products[i].category_id === xhrDData.categories[j].id){
// 		        		departmentString += `<h3> the department is ${xhrDData.categories[j].name}</h3>`	;
// 		    			console.log("the department loop number : ",j);
// 		    		}
// 		    	}
//         	}



function executeProductAfterFileLoaded(){
    var data = JSON.parse(this.responseText);
    console.log("my Product Data is : ", data);
    makeProductDom(data);
}


// function executeDepartementAfterFileLoaded(){
//     var data = JSON.parse(this.responseText);
//     console.log("my Departement Data is : ", data);
//     makeDepartmentDom(data);
// }

myProductRequest.addEventListener("load", executeProductAfterFileLoaded);
// myDepartementRequest.addEventListener("load", executeDepartementAfterFileLoaded)

myProductRequest.open("GET","products.json");
myDepartementRequest.open("GET","departments.json");

myProductRequest.send();
myDepartementRequest.send();
// console.log("myRequest", myRequest);


//Your job is to build a web page that  
//Additionally, put a <select> element at the top of the page that contains all possible 
//values of the season_discount key in the categories file. As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage.

//For example, when Spring is chosen, all products in the corresponding Household category should have their prices updated with a 15% discount off the base price.

//The two JSON representations above should be in two files: products.json, and categories.json. You should load both file via XHRs and store the contents in two different JavaScript variables in your code.

















