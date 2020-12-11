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
			//console.log(food_item.innerHTML);
			for (let i=0; i<food.foods.length; i++) {
				console.log(i)
				let foodCard = document.createElement('div')
				foodCard.innerHTML = `
				<div class="card" style="width: 22rem; margin: 5px;">
				<div class="card-body">
					<h5 class="card-title"> ${food.foods[i].description} </h5>
					<a href="#" class="btn btn-outline-primary">Add to recipe</a>
				</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item"> ${food.foods[i].foodNutrients[0].nutrientName} - ${food.foods[i].foodNutrients[0].value} ${food.foods[i].foodNutrients[0].unitName}}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[1].nutrientName} - ${food.foods[i].foodNutrients[1].value} ${food.foods[i].foodNutrients[1].unitName}}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[2].nutrientName} - ${food.foods[i].foodNutrients[2].value} ${food.foods[i].foodNutrients[2].unitName}}</li>
						<li class="list-group-item"> ${food.foods[i].foodNutrients[3].nutrientName} - ${food.foods[i].foodNutrients[3].value} ${food.foods[i].foodNutrients[3].unitName}}</li>
					</ul>
				</div>`
				//element =f$ofood.foods[i].foods[i].description
				foodCards.appendChild(foodCard);
			}
		});
}
