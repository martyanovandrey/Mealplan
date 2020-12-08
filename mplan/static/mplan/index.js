document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".dropdown").forEach(e =>
		e.addEventListener("keyup", function () {
            findFood(e.querySelector('#dropdownMenuButton').value)
		}))
});

function findFood(foodName) {
	let food_item = document.querySelector(".foodName")


	fetch(`/food/${foodName}`)
		.then(response => response.json())
		.then(food => {
			// Print emails
			console.log('Got response!');
			console.log(food.foods[0].description);
			console.log(food_item.innerHTML);
			food_item.innerHTML = food.foods[0].description
		});
}
