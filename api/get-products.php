<?php
require_once('config.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    die(json_encode(['error' => 'Only POST requests are allowed.']));
}

// Parse request JSON data
$requestData = json_decode(file_get_contents("php://input"), true);

if (!$requestData) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'Invalid JSON data.']));
}

// Check if the userId is provided in the request data
if (!isset($requestData['userId'])) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'userId is required in the request.']));
}

// Extract the userId from the request data
$userId = $requestData['userId'];

// Create a MySQLi connection using your config.php file
$mysqli = $conn;

// Check for connection errors
if ($mysqli->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Fetch items where orgId matches the provided userId
$query = "SELECT id, itemName, ownerId, userName, userMobile, userImage, userAddress, weight, dateAdded FROM items WHERE orgId = '$userId'";
$result = $mysqli->query($query);

if ($result) {
    $items = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    http_response_code(200); // OK
    echo json_encode($items);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Failed to fetch items: ' . $mysqli->error]);
}

$mysqli->close();
