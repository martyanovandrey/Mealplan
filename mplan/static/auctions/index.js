document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".dropdown").forEach(e =>
		e.addEventListener("keyup", function () {
            console.log('rere')
            //edit(e.parentNode.id)
		}))
});

function load_post(postbox) {
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
