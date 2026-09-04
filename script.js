/* ==========================================================
   LIFESTYLE WEAR — STORE SETTINGS
   ========================================================== */

/* CHANGE #1: WhatsApp number */
const WHATSAPP_NUMBER = "8801615574500";

/* CHANGE #2: Delivery charge */
const DELIVERY_CHARGE = 100;

/* CHANGE #3: Categories */
const CATEGORIES = [
  {name:"All", sub:"Everything"},
  {name:"Dresses", sub:"Female Dress"},
  {name:"Drop-Shoulder", sub:"everyday"},
  {name:"T-Shirts", sub:"Casual"},
  {name:"New Arrivals", sub:"Just in"}
];

/* CHANGE #4: Products */
const PRODUCTS = [
 {id:1,
    name:"Drop-Shoulder - 1",
  price:850,
  image:"images/DS-1.webp",
  category:"Drop-Shoulder",
  stock:0, // ⭐ ADD STOCK HERE
  badge:"You know",
  description:"A clean, comfortable piece selected for everyday elegance."},

 {id:2,
    name:"Drop-Shoulder - 2",
  price:950,
  image:"images/DS-2.webp",
  category:"Drop-Shoulder",
  stock:10, // ⭐ ADD STOCK HERE
  badge:"NEW",
  description:"An effortless silhouette designed for comfort and confidence."},

 {id:3,
    name:"Drop-Shoulder - 3",
  price:780,
  image:"images/DS-3.jpg",
  category:"Drop-Shoulder",
  stock:20, // ⭐ ADD STOCK HERE
  badge:"",
  description:"Simple, versatile and easy to style."},
 
 {id:4,
    name:"Drop-Shoulder - 4",
  price:650,
  image:"images/DS-4.webp",
  category:"Drop-Shoulder",
  stock:15, // ⭐ ADD STOCK HERE
  badge:"POPULAR",
  description:"A refined everyday essential with a clean finish."},

 {id:5,
    name:"Minimalist T-Shirt",
  price:450,
  image:"images/TS-1.jpg",
  category:"T-Shirts",
  stock:25, // ⭐ ADD STOCK HERE
  badge:"",
  description:"Minimal styling and everyday comfort."},

 {id:6,
    name:"New Arrival T-Shirt",
  price:1050,
  image:"images/TS-2.jpg",
  category:"New Arrivals",
  stock:30, // ⭐ ADD STOCK HERE
  badge:"NEW",
  description:"One of the latest pieces in the Lifestyle Wear edit."},

 {id:7,
    name:"Female Everyday Dress",
  price:990,
  image:"images/FD-1.jpg",
  category:"Dresses",
  stock:20, // ⭐ ADD STOCK HERE
  badge:"BEST",
  description:"A standout everyday piece from our signature selection."},

 {id:8,
    name:"Everyday Comfort Wear",
  price:720,
  image:"images/FD-2.jpg",
  category:"Dresses",
  stock:25, // ⭐ ADD STOCK HERE
  badge:"",
  description:"Made to be worn, repeated and enjoyed."}
];

const placeholder="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="100%" height="100%" fill="#ebe8e1"/><text x="50%" y="48%" text-anchor="middle" font-family="Arial" font-size="28" fill="#777">LIFESTYLE WEAR</text></svg>`);

let cart=JSON.parse(localStorage.getItem("LW_CART")||"[]");
let selectedCategory="All",search="",quickProduct=null;

const $=id=>document.getElementById(id);
const money=n=>Number(n).toLocaleString("en-BD");
const img=s=>s||placeholder;
const escape=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function save(){localStorage.setItem("LW_CART",JSON.stringify(cart))}
function quantity(){return cart.reduce((a,x)=>a+x.qty,0)}
function subtotal(){return cart.reduce((a,x)=>{let p=PRODUCTS.find(p=>p.id===x.id);return a+(p?p.price*x.qty:0)},0)}

function add(id){
 const item=cart.find(x=>x.id===id); item?item.qty++:cart.push({id,qty:1});
 save();renderCart();openCart();
}

function change(id,n){
 const item=cart.find(x=>x.id===id);if(!item)return;
 item.qty+=n;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
 save();renderCart();
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}

function renderCart(){
 const q=quantity(),sub=subtotal();
 if($("cartCount"))$("cartCount").textContent=q;
 if($("drawerCount"))$("drawerCount").textContent=q;
 if($("subtotal"))$("subtotal").textContent=money(sub);
 if($("delivery"))$("delivery").textContent=money(DELIVERY_CHARGE);
 if($("checkoutTotal"))$("checkoutTotal").textContent=money(sub+(cart.length?DELIVERY_CHARGE:0));
 const list=$("cartList");if(!list)return;
 if(!cart.length){list.innerHTML=`<div class="empty">Your bag is waiting.<br><br>Add something you love.</div>`;return}
 list.innerHTML="";
 cart.forEach(x=>{
  const p=PRODUCTS.find(p=>p.id===x.id);if(!p)return;
  const el=document.createElement("div");el.className="cart-item";
  el.innerHTML=`<img src="${img(p.image)}" onerror="this.src=placeholder" alt=""><div><h4>${escape(p.name)}</h4><p>৳${money(p.price)} each</p><div class="qty"><button class="minus">−</button><span>${x.qty}</span><button class="plus">+</button></div></div><div style="text-align:right"><b style="font-size:12px">৳${money(p.price*x.qty)}</b><br><button class="remove">REMOVE</button></div>`;
  el.querySelector(".minus").onclick=()=>change(p.id,-1);
  el.querySelector(".plus").onclick=()=>change(p.id,1);
  el.querySelector(".remove").onclick=()=>removeItem(p.id);
  list.appendChild(el);
 });
}

function openCart(){$("cart")?.classList.add("open");$("screen")?.classList.add("show")}
function closeCart(){$("cart")?.classList.remove("open");if(!$("mobilePanel")?.classList.contains("open"))$("screen")?.classList.remove("show")}

function renderCategoriesHome(){
 const grid=$("categoryGrid");if(!grid)return;
 grid.innerHTML="";
 CATEGORIES.forEach((cat,i)=>{
  const el=document.createElement("a");el.className="category-card";el.href=`products.html${cat.name==="All"?"":"?category="+encodeURIComponent(cat.name)}`;
  el.innerHTML=`<span class="num">0${i+1}</span><h3>${escape(cat.name)}</h3><span>${escape(cat.sub)} ↗</span>`;
  grid.appendChild(el);
 });
}

function productCard(p){
    const card = document.createElement("article");
    card.className = "product-card";

    const stockHTML = p.stock > 0
        ? `<span class="stock">Stock: ${p.stock}</span>`
        : `<span class="stock-out">STOCK OUT</span>`;

    const buttonHTML = p.stock > 0
        ? `<button class="add-small">ADD +</button>`
        : `<button class="add-small" disabled>STOCK OUT</button>`;

    card.innerHTML = `
        <div class="product-image">
            ${p.badge ? `<span class="product-badge">${escape(p.badge)}</span>` : ""}
            
            <img 
                src="${img(p.image)}" 
                onerror="this.src=placeholder" 
                alt="${escape(p.name)}"
            >

            <button class="quick-view">↗</button>
        </div>

        <div class="product-meta">
            <span class="product-cat">${escape(p.category)}</span>

            <h3>${escape(p.name)}</h3>

            <div class="product-row">
                <span class="product-price">৳${money(p.price)}</span>
                ${buttonHTML}
            </div>

            ${stockHTML}
        </div>
    `;

    card.querySelector(".product-image").onclick = e => {
        if(!e.target.closest(".quick-view"))
            openProductDetail(p);
    };

    card.querySelector(".quick-view").onclick = e => {
        e.stopPropagation();
        openProductDetail(p);
    };

    card.querySelector(".add-small").onclick = () => {
        if(p.stock > 0){
            add(p.id);
        }
    };

    return card;
}

function openProductDetail(p){
 quickProduct=p;
 if(!$("productOverlay"))return;
 $("detailImage").src=img(p.image);$("detailImage").onerror=()=>{$("detailImage").src=placeholder};
 $("detailImage").alt=p.name;
 $("detailCategory").textContent=p.category;
 $("detailName").textContent=p.name;
 $("detailPrice").textContent=money(p.price);
 $("detailDescription").textContent=p.description;
 $("productOverlay").classList.add("show");
 document.body.classList.add("no-scroll");
 history.pushState({product:p.id},"",`#product-${p.id}`);
}

/* Click the X OR anywhere on the dark area outside the card */
function closeProductDetail(){
 if(!$("productOverlay"))return;
 $("productOverlay").classList.remove("show");
 document.body.classList.remove("no-scroll");
 if(location.hash.startsWith("#product-"))history.replaceState(null,"",location.pathname+location.search);
 quickProduct=null;
}

function renderProductsPage(){
 const grid=$("productGrid");if(!grid)return;
 const tabs=$("categoryTabs");
 tabs.innerHTML="";
 CATEGORIES.forEach(cat=>{
  const b=document.createElement("button");
  b.className=cat.name===selectedCategory?"active":"";
  b.textContent=cat.name;
  b.onclick=()=>{selectedCategory=cat.name;renderProductsPage()};
  tabs.appendChild(b);
 });
 const items=PRODUCTS.filter(p=>{
  const c=selectedCategory==="All"||p.category===selectedCategory;
  const s=!search||p.name.toLowerCase().includes(search.toLowerCase());
  return c&&s;
 });
 $("resultCount").textContent=`${items.length} PRODUCTS`;
 grid.innerHTML="";
 items.forEach(p=>grid.appendChild(productCard(p)));
}

function renderFeatured(){
 const grid=$("featuredGrid");if(!grid)return;
 grid.innerHTML="";
 PRODUCTS.slice(0,4).forEach(p=>grid.appendChild(productCard(p)));
}

function buildMessage(customer){
 let m=`Hello Lifestyle Wear!%0A%0A*NEW ORDER*%0A--------------------%0A`;
 cart.forEach((x,i)=>{const p=PRODUCTS.find(p=>p.id===x.id);m+=`${i+1}. ${encodeURIComponent(p.name)}%0AQty: ${x.qty}%0APrice: ৳${p.price*x.qty}%0A`});
 const sub=subtotal(),total=sub+(cart.length?DELIVERY_CHARGE:0);
 m+=`%0A*Subtotal:* ৳${sub}%0A*Delivery:* ৳${DELIVERY_CHARGE}%0A*TOTAL:* ৳${total}%0A%0A*CUSTOMER*%0AName: ${encodeURIComponent(customer.name)}%0APhone: ${encodeURIComponent(customer.phone)}%0AAddress: ${encodeURIComponent(customer.address)}%0A`;
 if(customer.note)m+=`Note: ${encodeURIComponent(customer.note)}%0A`;
 return m;
}

/* General controls */
$("cartBtn")?.addEventListener("click",openCart);
$("closeCart")?.addEventListener("click",closeCart);
$("screen")?.addEventListener("click",()=>{closeCart();closeMenu()});
$("clearCart")?.addEventListener("click",()=>{if(confirm("Clear your bag?")){cart=[];save();renderCart()}});
$("checkoutBtn")?.addEventListener("click",()=>{if(!cart.length)return alert("Add a product to your bag first.");$("checkoutModal").classList.add("show")});
$("closeCheckout")?.addEventListener("click",()=>$("checkoutModal").classList.remove("show"));
$("checkoutForm")?.addEventListener("submit",e=>{
 e.preventDefault();
 const customer={name:$("customerName").value.trim(),phone:$("customerPhone").value.trim(),address:$("customerAddress").value.trim(),note:$("customerNote").value.trim()};
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage(customer)}`,"_blank");
});

$("searchBtn")?.addEventListener("click",()=>{$("searchbar").classList.add("active");$("searchInput").focus()});
$("closeSearch")?.addEventListener("click",()=>{$("searchbar").classList.remove("active");$("searchInput").value="";search="";renderProductsPage()});
$("searchInput")?.addEventListener("input",e=>{search=e.target.value;renderProductsPage()});

function openMenu(){$("mobilePanel")?.classList.add("open");$("screen")?.classList.add("show")}
function closeMenu(){$("mobilePanel")?.classList.remove("open");if(!$("cart")?.classList.contains("open"))$("screen")?.classList.remove("show")}
$("menuBtn")?.addEventListener("click",openMenu);
$("closeMenu")?.addEventListener("click",closeMenu);

/* Product detail controls */
$("detailClose")?.addEventListener("click",closeProductDetail);
$("productOverlay")?.addEventListener("click",e=>{
 if(e.target === $("productOverlay")) closeProductDetail();
});
$("detailAdd")?.addEventListener("click",()=>{
 if(quickProduct){add(quickProduct.id);closeProductDetail()}
});
window.addEventListener("popstate",()=>{if($("productOverlay")?.classList.contains("show"))closeProductDetail()});

/* URL category support from home category cards */
const params=new URLSearchParams(location.search);
if(params.get("category") && CATEGORIES.some(c=>c.name===params.get("category")))selectedCategory=params.get("category");

renderCategoriesHome();
renderFeatured();
renderProductsPage();
renderCart();
