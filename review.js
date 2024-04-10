// 112.js

document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById("reviewForm");
    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitReview();
    });

    // Load comments when the page loads.
    getComments();
});

function submitReview() {
    const company = document.getElementById("company").value;
    const review = document.getElementById("review").value;

    if (review) {
        const data = new URLSearchParams();
        data.append("company", company);
        data.append("review", review);

        fetch('review.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                // Review submitted successfully. Clear the review input field.
                document.getElementById("review").value = "";
                // Refresh the comments section to show the new review.
                getComments();
            } else {
                console.error('Review submission failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function getComments() {
    fetch('review.php')
    .then(response => response.json())
    .then(data => {
        const commentsDiv = document.getElementById("comments");
        commentsDiv.innerHTML = '';

        data.forEach(review => {
            const comment = document.createElement("div");
            comment.innerText = `${review.company}: ${review.review}`;
            commentsDiv.appendChild(comment);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
