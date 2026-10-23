/* shop.js - tiny cart saved in the browser (localStorage) */
var PRODUCTS = [
  {id:"p1", name:"Steel Water Bottle", price:18,  icon:"🧴"},
  {id:"p2", name:"Wireless Mouse",     price:24,  icon:"🖱️"},
  {id:"p3", name:"Desk Lamp",          price:35,  icon:"💡"},
  {id:"p4", name:"Notebook Pack",      price:9,   icon:"📓"},
  {id:"p5", name:"Laptop Stand",       price:42,  icon:"💻"},
  {id:"p6", name:"Headphones",         price:60,  icon:"🎧"}
];
function getCart(){ try{ return JSON.parse(localStorage.getItem("cart")||"[]"); }catch(e){ return []; } }
function saveCart(c){ localStorage.setItem("cart", JSON.stringify(c)); }
function cartTotal(){ return getCart().reduce(function(s,i){return s+i.price*i.qty;},0); }
function updateCartCount(){
  var n = getCart().reduce(function(s,i){return s+i.qty;},0);
  var el = document.getElementById("cartCount"); if(el) el.textContent = n;
}
function renderProducts(){
  var box = document.getElementById("products");
  box.innerHTML = PRODUCTS.map(function(p){
    return '<div class="card"><div class="img">'+p.icon+'</div><h3>'+p.name+'</h3>'+
      '<p class="price">$'+p.price+'</p>'+
      '<button class="btn" onclick="addToCart(\''+p.id+'\')">Add to cart</button></div>';
  }).join("");
}
function addToCart(id){
  var p = PRODUCTS.filter(function(x){return x.id===id;})[0];
  var cart = getCart();
  var found = cart.filter(function(x){return x.id===id;})[0];
  if(found){ found.qty++; } else { cart.push({id:p.id,name:p.name,price:p.price,qty:1}); }
  saveCart(cart); updateCartCount();
}
