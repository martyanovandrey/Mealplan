document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".dropdown").forEach(e =>
		e.addEventListener("keyup", function () {
            findFood()
		}))
});

function findFood() {
	if (postbox == '') {
		postbox = 'all'
	}
	fetch(`/posts/${postbox}`)
		.then(response => response.json())
		.then(posts => {
			// Print emails
			posts.forEach(add_posts);
		});
}
