


<?php
header("Content-Type: application/json");

// Handle POST requests to save reviews and GET requests to retrieve reviews from the database.

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Handle POST request to save a review to the database.
    $company = $_POST["company"];
    $review = $_POST["review"];

    // You would typically save this data to a database, but here's an example of saving it to a JSON file for simplicity.

    // Load existing reviews from the file.
    $reviews = json_decode(file_get_contents('reviews.json'), true);

    // Add the new review.
    $reviews[] = array("company" => $company, "review" => $review);

    // Save the updated reviews back to the file.
    file_put_contents('reviews.json', json_encode($reviews));

    echo json_encode(array("message" => "Review submitted successfully"));
} elseif ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Handle GET request to retrieve reviews from the database.

    // In this example, we load reviews from a JSON file.
    $reviews = json_decode(file_get_contents('reviews.json'), true);
    echo json_encode($reviews);
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("error" => "Method not allowed"));
}
?>


