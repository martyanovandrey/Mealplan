document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".dropdown").forEach(e =>
		e.addEventListener("keyup", function () {
            findFood(e.querySelector('#dropdownMenuButton').value)
		}))
});

function findFood(foodName) {
	fetch(`/food/${foodName}`)
		.then(response => response.json())
		.then(posts => {
			// Print emails
			concole.log(posts);
		});
}
