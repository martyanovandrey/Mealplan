document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#searchFood').addEventListener('keyup', () => findFood(document.querySelector('#searchFood').value));	
	});

let ingredientList = [];

function addIngredientList(name, id, amount, protein, fat, carb, energy) {
	name = ingredientsData['name']
	id = Number(ingredientsData['id'])
	amount = Number(ingredientsData['amount'])
	protein = Number(ingredientsData['protein']) * (amount/100)
	fat = Number(ingredientsData['fat']) * (amount/100)
	carb = Number(ingredientsData['carb']) * (amount/100)
	energy = Number(ingredientsData['energy']) * (amount/100)


	ingredientList.push({name, id, amount, protein, fat, carb, energy});
}

/*
let ingredientObj = {
	name: String(),
	protein: Number(),
	fat: Number(),
	carb: Number(),
	energy: Number()
} */

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

				/* Create new ingredientObj 
				new ingredientObj = {
					name: food.foods[i].description,
					protein: food.foods[i].foodNutrients[0].value,
					fat: food.foods[i].foodNutrients[1].value,
					carb: food.foods[i].foodNutrients[2].value,
					energy: food.foods[i].foodNutrients[3].value
				} */

				let foodCard = document.createElement('div')
				foodCard.classList.add('card')
				foodCard.innerHTML = `
				<div class="card-body">
					<h5 class="card-title"> ${food.foods[i].description} </h5>
					<input class="form-control" type="input" id='quantityValue' value='100'>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='decreaseQuantity(this)'>-</button>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='increaseQuantity(this)'>+</button>
					<button type='button' href="#" class="btn btn-outline-primary" onClick='addIngredient("${food.foods[i].fdcId}", "${food.foods[i].description}", this)'>Add to recipe</button>
				</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item font-weight-light" style='font-size: 0.85em; padding: 0px 6px'> Per 100 G </li>
						<li class="list-group-item" id='protein' data-value=${food.foods[i].foodNutrients[0].value}> ${food.foods[i].foodNutrients[0].nutrientName} - ${food.foods[i].foodNutrients[0].value} ${food.foods[i].foodNutrients[0].unitName}</li>
						<li class="list-group-item" id='fat' data-value=${food.foods[i].foodNutrients[1].value}> ${food.foods[i].foodNutrients[1].nutrientName} - ${food.foods[i].foodNutrients[1].value} ${food.foods[i].foodNutrients[1].unitName}</li>
						<li class="list-group-item" id='carb' data-value=${food.foods[i].foodNutrients[2].value}> ${food.foods[i].foodNutrients[2].nutrientName} - ${food.foods[i].foodNutrients[2].value} ${food.foods[i].foodNutrients[2].unitName}</li>
						<li class="list-group-item" id='energy' data-value=${food.foods[i].foodNutrients[3].value}> ${food.foods[i].foodNutrients[3].nutrientName} - ${food.foods[i].foodNutrients[3].value} ${food.foods[i].foodNutrients[3].unitName}</li>
					</ul>`
				foodCards.appendChild(foodCard);
				
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

function addIngredient(ingredientId, ingredientName, ingredientCard) {
	console.log(ingredientCard.parentNode.parentNode.querySelector('#list-group-item'))
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
	ingredientsData = {
		'name': ingredientName,
		'id': ingredientId,
		'amount': ingredientCard.parentNode.querySelector('#quantityValue').value,
		'protein': ingredientCard.parentNode.parentNode.querySelector('#protein').dataset.value,
		'fat': ingredientCard.parentNode.parentNode.querySelector('#fat').dataset.value,
		'carb': ingredientCard.parentNode.parentNode.querySelector('#carb').dataset.value,
		'energy': ingredientCard.parentNode.parentNode.querySelector('#energy').dataset.value
	}
	addIngredientList(ingredientsData)
}

function remove(el) {
	let element = el.parentNode;
	let IngredientIndex = Array.from(element.parentNode.children).indexOf(element)
	ingredientList.splice(IngredientIndex, 1)
	element.remove();
  }

/* food portions
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
*/

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
				ingredientList,
				username: document.getElementById('username-field').value,
				name: document.getElementById('name-field').value,
				category: document.getElementById('category-field').value,
				description: document.getElementById('description-field').value
				
			})
		})
		
}