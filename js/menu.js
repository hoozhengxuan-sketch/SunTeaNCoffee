const allBtns = document.querySelectorAll(".category-card");
const allProducts = document.querySelectorAll(".product-card");
const myInput = document.getElementById("searchBox");
const mySort = document.getElementById("sortSelect");
const listContainer = document.getElementById("product-list");

function filterProducts(){
    const keyword = myInput.value.toLowerCase();
    let category = "all";
    allBtns.forEach(function(btn){
        if(btn.classList.contains("active")){
            category = btn.dataset.category;
        }
    });
    allProducts.forEach(function(product){
        const productCategory = product.dataset.category;
        const productName = product.dataset.name.toLowerCase();
        if((category=="all" || productCategory==category)
            && productName.includes(keyword)){
            product.style.display="block";
        }else{
            product.style.display="none";
        }
    });
}
allBtns.forEach(function(btn){
    btn.addEventListener("click",function(){
        allBtns.forEach(function(b){
            b.classList.remove("active");
        });
        btn.classList.add("active");
        filterProducts();
    });
});

myInput.addEventListener("input",function(){
    filterProducts();
});

mySort.addEventListener("change",function(){
    const cards = Array.from(allProducts);
    cards.sort(function(a,b){
        if(mySort.value=="name"){
            return a.dataset.name.localeCompare(b.dataset.name);
        }
        if(mySort.value=="low"){
            return Number(a.dataset.price)-Number(b.dataset.price);
        }
        if(mySort.value=="high"){
            return Number(b.dataset.price)-Number(a.dataset.price);
        }
        return 0;
    });
    cards.forEach(function(card){
        listContainer.appendChild(card);
    });
});