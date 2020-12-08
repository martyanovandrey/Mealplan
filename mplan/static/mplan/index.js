document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".dropdown").forEach(e =>
		e.addEventListener("keyup", function () {
			let dropdown_menu = document.querySelector(".dropdown-menu")
			dropdown_menu.innerHTML = ''
            findFood(e.querySelector('#dropdownMenuButton').value)
		}))
});



function findFood(foodName) {
	let dropdown_menu = document.querySelector(".dropdown-menu")


	fetch(`/food/${foodName}`)
		.then(response => response.json())
		.then(food => {
			// Print emails
			console.log('Got response!');
			console.log(food.foods[0].description);
			//console.log(food_item.innerHTML);
			for (let i=0; i<food.foods.length; i++) {
				console.log(i)
				const dropdown_food = document.createElement('div')
				dropdown_food.classList.add('dropdown-item')
				dropdown_food.innerHTML = `
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
				<${food.foods[i]v>`
				
				
			$	food.foods[i]		
				
				//element =f$ofood.foods[i].foods[i].description
				console.log(food.foods[i].description)
				console.log(dropdown_food)
				dropdown_menu.appendChild(dropdown_food);
			}
		});
}
