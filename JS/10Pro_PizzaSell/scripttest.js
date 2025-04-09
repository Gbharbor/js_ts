//script just t practice, not at all. without comments or details.
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelector(el);

pizzaJson.map((item, index) => {
   let pizzaitem = c('.models .pizza-item').cloneNode(true);
   pizzaItem.setAttribute('data-key',index);
   pizzaItem.querySelector('.pizza-item--img img').src = item.img;
});