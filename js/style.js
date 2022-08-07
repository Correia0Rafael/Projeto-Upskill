let elems = '{ "items" : [' +
'{ "title":"Gulbenkian" , "price":"€18" },' +
'{ "title":"Castelo de Monsaraz" , "price":"€18" },' +
'{ "title":"Palacio da Pena" , "price":"€12" } ]}';

let collection = JSON.parse(elems);
//alert(collection.items);

function expand(elem, pop_up) {
	let parent_active = elem.parentElement.classList.contains('active');
	let active = pop_up.classList.contains('active');
	if (parent_active && !active)
		return ;
	if (!active) {
		elem.parentElement.classList.add("active");
		pop_up.classList.add("active");
	} else {
		elem.parentElement.classList.remove("active");
		pop_up.classList.remove("active");
	}
}

function get_cart_total() {
	let total = document.getElementById('cart-total-result');
	let result = 0;
	/* Algorithm to sum all products */
	let cart_elems = document.getElementById('cart-container').children;
	for (let index = 0; index < cart_elems.length; index++) {
		if (cart_elems[index].classList.contains('cart-item')) {
			let str_num = cart_elems[index].lastChild.innerHTML
			str_num = str_num.slice(1, str_num.length);
			result += +str_num;
		}
	}
	total.innerHTML = "" + result;
}

/* Recieves the parsed json object */
/* [title: string, price: string] */
function add_to_cart(obj) {
	let cart = document.getElementById('cart-container');
	let cart_element = document.createElement('div');
	cart_element.classList.add('cart-item');
	let title = document.createElement('div');
	title.classList.add('cart-item-title');
	title.classList.add('cart-item-element');
	title.innerHTML = obj.title;
	let remove = document.createElement('div');
	remove.innerHTML = "<button>X</button>";
	remove.addEventListener('click', function() {
		remove_from_cart(cart_element);
	});
	title.appendChild(remove);
	let price = document.createElement('div');
	price.classList.add('cart-item-price');
	price.classList.add('cart-item-element');
	price.innerHTML = obj.price;
	cart_element.appendChild(title);
	cart_element.appendChild(price);
	cart.prepend(cart_element);
	get_cart_total();
}

function remove_from_cart(obj) {
	let cart = obj.parentElement;
	cart.removeChild(obj);
	get_cart_total();
}

function add_expander(elem) {
	let pop_up = document.createElement('div');
	pop_up.classList.add('pop-up');
	if (elem.classList.contains('user_link')) {
		// por auth no azure
		pop_up.innerHTML = " \
			<form action=\"https://microsoft_azure/code/auth\" method=\"post\"> \
				<input type=\"text\" placeholder=\"Enter Username\" name=\"uname\" required> \
				<input type=\"password\" placeholder=\"Enter Password\" name=\"psw\" required> \
				<button type=\"submit\">Login</button> \
			</form> \
		";
	} else if (elem.classList.contains('cart_link')) {
		pop_up.setAttribute('id', 'cart-container');
		let checkout = document.createElement('div');
		checkout.innerHTML = "<button>Checkout</button>";
		let total = document.createElement('div');
		let total_result = document.createElement('span');
		total.setAttribute("id", "cart-total");
		total.innerHTML = "<span>Total: €</span>";
		total_result.setAttribute("id", "cart-total-result");
		total.appendChild(total_result);
		pop_up.appendChild(total);
		pop_up.appendChild(checkout);
	}
	let container = document.getElementById('user-options-container');
	container.appendChild(pop_up)
	elem.addEventListener('click', function () {
		expand(elem, pop_up)
	});
}

function add_product_to_cart(elem) {
	let title = String(elem.children[0].innerHTML.trim());
	let price = String(elem.children[2].children[0].innerHTML.trim());

	let json_obj = '{ "title":"' + title + '" , "price":"' + price + '" }';
	let obj = JSON.parse(json_obj);
	let children = elem.children;
	for (let index = 0; index < children.length; index++) {
		if (children[index].classList.contains('options')) {
			for (let index2 = 0; index2 < children[index].children.length; index2++) {
				if (children[index].children[index2].nodeName === 'BUTTON') {
					children[index].children[index2].addEventListener('click', function(event) {
						event.preventDefault();
						add_to_cart(obj);
					});
				}
			}
		}
	}
}
//DOMContentLoaded espera e depois executa codigo
window.addEventListener('DOMContentLoaded', function(event) {
	let expandibles = document.querySelectorAll('.expander');
	let products_items = document.querySelectorAll('.product-items');
	products_items.forEach(add_product_to_cart);
	expandibles.forEach(add_expander);
	collection.items.forEach(add_to_cart);
});