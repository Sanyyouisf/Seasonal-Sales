//You should load both file via XHRs
// and store the contents in two different JavaScript variables in your code.

//*** the variables**//
var myProductRequest = new XMLHttpRequest();
var myDepartementRequest = new XMLHttpRequest();
var container = document.getElementById("container");
var productString = "";
var currentproduct;
var departmentString = "";
var currentdepartment;
//make xhrDData is a globale variable to use it back in makeProductDom function
var xhrDData ={};


//lists all the products ,department name, and the price.
function makeProductDom(xhrPData){    
    for(var i = 0; i < xhrPData.products.length; i++) {
        currentproduct = xhrPData.products[i];
        productString += `<p class="background shareLine">${i+1}- product:</p> <p class="shareLine">${xhrPData.products[i].name}</p> `;
        productString +=`<p class="background shareLine">- price  :</p> <p class="shareLine">${xhrPData.products[i].price}</p>`;
		    for(var j = 0; j < xhrDData.categories.length; j++) {
		    	if ( currentproduct.category_id === xhrDData.categories[j].id){
		        	productString += `<p class="background shareLine">- department :</p> <p class="shareLine">${xhrDData.categories[j].name}</p> `;
		        	productString +=  `<br>`;
		    	}
		   	}
    }
    console.log("xhrPData is : " ,xhrPData);
    console.log("xhrDData is : ",xhrDData);
    container.innerHTML = productString;
}


function makeDepartmentDom(DData){
	xhrDData=DData;
}

function executeProductAfterFileLoaded(){
    var data = JSON.parse(this.responseText);
    console.log("my Product Data is : ", data);
    makeProductDom(data);
}


function executeDepartementAfterFileLoaded(){
    var data = JSON.parse(this.responseText);
    console.log("my Departement Data is : ", data);
    makeDepartmentDom(data);
}

myProductRequest.addEventListener("load", executeProductAfterFileLoaded);
myDepartementRequest.addEventListener("load", executeDepartementAfterFileLoaded)

myProductRequest.open("GET","products.json");
myDepartementRequest.open("GET","departments.json");

myDepartementRequest.send();
myProductRequest.send();


//Your job is to build a web page that  
//Additionally, put a <select> element at the top of the page that contains all possible 
//values of the season_discount key in the categories file. As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage.

//For example, when Spring is chosen, all products in the corresponding Household category should have their prices updated with a 15% discount off the base price.

//The two JSON representations above should be in two files: products.json, and categories.json. You should load both file via XHRs and store the contents in two different JavaScript variables in your code.

















