document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#searchFood').addEventListener('keyup', () => findFood(document.querySelector('#searchFood').value));	
	});



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
					<a href="#" class="btn btn-outline-primary" onClick='addIngredient("${food.foods[i].description}")'>Add to recipe</a>
				</div>
					<ul class="list-group list-group-flush">
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

function addIngredient(ingredientName) {
	console.log(ingredientName)
	let ingredientDiv = document.querySelector('.ingredients')
	let ingredient = document.createElement('button')
	ingredient.classList.add('btn')
	ingredient.classList.add('btn-outline-primary')
	ingredient.setAttribute('type', 'button');
	card = ingredientDiv.parentNode
	ingredient.innerHTML = `
		${ingredientName}
	<button type="button" class="close" aria-label="Close" onClick='remove(this)'>
  		<span aria-hidden="true">&times;</span>
	</button>`
	ingredientDiv.appendChild(ingredient);
}

function remove(el) {
	var element = el;
	element.parentNode.remove();
  }

function ingredient(ingredientId) {
	fetch(`/ingredient/${ingredientId}`)
	.then(response => response.json())
	.then(ingredient => {
		// Print emails
		let quantity = document.createElement('div')
		quantity.classList.add('card')
		for (let i=0; i<ingredient.foodPortions.length; i++) {
			console.log(ingredient.foodPortions[i].portionDescription)
	}
	}
	);
}