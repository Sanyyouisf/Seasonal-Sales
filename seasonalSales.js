//You should load both file via XHRs
// and store the contents in two different JavaScript variables in your code.

//*** the variables**//
var myProductRequest = new XMLHttpRequest();
var myDepartementRequest = new XMLHttpRequest();
var container = document.getElementById("container");
var selectedSeason = document.getElementById("season_discount");
var reset = document.getElementById("season_discount");
var currentproduct;
var departmentString = "";
var currentdepartment;
var newPricetString="";
//make xhrDData is a globale variable to use it back in makeProductDom function
var xhrDData ={};
var xhrPData = {};

//lists all the products ,department name, and the price.
function makeProductDom(PData){ 
	var productString = "";
	container.innerHTML="";
    for(var i = 0; i < PData.products.length; i++) {
        currentproduct = PData.products[i];
        productString +=`<p class="background shareLine">${i+1}- product :</p>
        				 <p class="shareLine">${PData.products[i].name}</p> `;
        productString +=`<p class="background shareLine">- price :</p>
        				 <p class="shareLine">${PData.products[i].price}</p>`;
		for(var j = 0; j < xhrDData.categories.length; j++) {
		    if (currentproduct.category_id === xhrDData.categories[j].id){
		        productString += `<p class="background shareLine">- department :</p> <p class="shareLine">${xhrDData.categories[j].name}</p> `;
		        productString +=  `<br>`;
		    };
		};
    };
    container.innerHTML = productString;
};


function makeDepartmentDom(DData){
	xhrDData=DData;
}

function executeProductAfterFileLoaded(){
    var data = JSON.parse(this.responseText);
    xhrPData= data;
    makeProductDom(data);
}

function executeDepartementAfterFileLoaded(){
    var data = JSON.parse(this.responseText);
    console.log("my Departement Data is : ", data);
    makeDepartmentDom(data);
}


//add event listener for the delect element
selectedSeason.addEventListener("change",function(){
	updatePrice();	
});

function updatePrice(){
	console.log("selectedSeason value",selectedSeason.value )
	//to make a copy of the productsobjects and use it here 
	//because i don't like to override the original one 
	var newProducts= xhrPData;
	console.log("selected seasons is: ",selectedSeason.value);
	for(var j = 0; j < xhrDData.categories.length; j++) {
		if (selectedSeason.value === xhrDData.categories[j].season_discount){
			//determine the discound amount and the 
			var newProducts= xhrPData;
			var discound = xhrDData.categories[j].discount ;
			var id = xhrDData.categories[j].id ;
			console.log("selected catagory is : ",xhrDData.categories[j].season_discount);
			console.log("discound is : ",discound);
			console.log("id is : ",id);
			for(var i = 0; i < newProducts.products.length; i++){
				if (id === newProducts.products[i].category_id){
				 	//update the price of the selected season
				 	console.log("the product name that should have discound is ",newProducts.products[i].name);
				 	var price = newProducts.products[i].price;
				 	console.log (" price befor",price);
				 	newProducts.products[i].price = price - (price*discound);
				 	console.log (" price after",newProducts.products[i].price)
				};
			};		
		};
	};
	makeProductDom(newProducts);
};

myProductRequest.addEventListener("load", executeProductAfterFileLoaded);
myDepartementRequest.addEventListener("load", executeDepartementAfterFileLoaded)

myProductRequest.open("GET","products.json");
myDepartementRequest.open("GET","departments.json");

myDepartementRequest.send();
myProductRequest.send();
