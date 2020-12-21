document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#searchFood').addEventListener('keyup', () => findFood(document.querySelector('#searchFood').value));	
	});

let ingredientList = [];

function addIngredientList(name, amount) {
	ingredientList.push({name, amount});
}

function findFood(foodName) {
	let foodCards = document.querySelector(".foodCards")
	foodCards.innerHTML = ''
	console.log(foodName);
	fetch(`/food/${foodName}`)
		.then(response => response.json())
		.then(food => {
			// Print emails
			console.log('Got response!');
			console.log(food.foods[0].description);
			for (let i=0; i<food.foods.length; i++) {
				let foodCard = document.createElement('div')
				foodCard.classList.add('card')
				foodCard.innerHTML = `
				<div class="card-body">
					<h5 class="card-title"> ${food.foods[i].description} </h5>
					<input class="form-control" type="input" id='quantityValue' value='100'>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='decreaseQuantity(this)'>-</button>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='increaseQuantity(this)'>+</button>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='addIngredient("${food.foods[i].description}", this)'>Add to recipe</button>
				</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item font-weight-light" style='font-size: 0.85em; padding: 0px 6px'> Per 100 G </li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[0].nutrientName} - ${food.foods[i].foodNutrients[0].value} ${food.foods[i].foodNutrients[0].unitName}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[1].nutrientName} - ${food.foods[i].foodNutrients[1].value} ${food.foods[i].foodNutrients[1].unitName}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[2].nutrientName} - ${food.foods[i].foodNutrients[2].value} ${food.foods[i].foodNutrients[2].unitName}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[3].nutrientName} - ${food.foods[i].foodNutrients[3].value} ${food.foods[i].foodNutrients[3].unitName}</li>
					</ul>`
				foodCards.appendChild(foodCard);
				ingredient(food.foods[i].fdcId)
				
			}
		});
}

function increaseQuantity(val) {
	let quantity = val.parentNode.querySelector('#quantityValue')
	quantity.value = +quantity.value + 100

}

function decreaseQuantity(val) {
	let quantity = val.parentNode.querySelector('#quantityValue')
	quantity.value = +quantity.value - 100
}

function addIngredient(ingredientName, ingredientCard) {
	console.log(ingredientName)
	let ingredientDiv = document.querySelector('.ingredients')
	let ingredient = document.createElement('button')
	ingredient.classList.add('btn')
	ingredient.classList.add('btn-outline-primary')
	ingredient.setAttribute('type', 'button');
	ingredient.setAttribute('style', 'margin: 2px 4px 2px 0px');
	card = ingredientDiv.parentNode
	ingredient.innerHTML = `
		${ingredientName} (${ingredientCard.parentNode.querySelector('#quantityValue').value} g)
	<button type="button" class="close" aria-label="Close" onClick='remove(this)'>
  		<span aria-hidden="true">&times;</span>
	</button>`
	ingredientDiv.appendChild(ingredient);
	addIngredientList(ingredientName, ingredientCard.parentNode.querySelector('#quantityValue').value)
}

function remove(el) {
	var element = el;
	element.parentNode.remove();
  }


function ingredient(ingredientId) {
	fetch(`/ingredient/${ingredientId}`)
	.then(response => response.json())
	.then(ingredient => {
		let quantity = document.createElement('div')
		quantity.classList.add('card')
		for (let i=0; i<ingredient.foodPortions.length; i++) {
			let quantuty = ingredient.foodPortions[i].portionDescription
	}
	}
	);
}

function getCookie(name) {
	if (!document.cookie) {
		return null;
	}
	const token = document.cookie.split(';')
		.map(c => c.trim())
		.filter(c => c.startsWith(name + '='));

	if (token.length === 0) {
		return null;
	}
	return decodeURIComponent(token[0].split('=')[1]);
}

function create_recipe() {
	debugger;
	fetch('/create_recipe_api', {
			credentials: 'include',
			method: 'POST',
			mode: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify({
				ingredientList
			})
		})
		
}