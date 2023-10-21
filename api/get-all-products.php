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

// Check if all required parameters are provided
if (
    !isset($requestData['userMobile']) || !isset($requestData['orgMobile']) ||
    !isset($requestData['itemId']) || !isset($requestData['type']) 
    ||
    !isset($requestData['status']) || !isset($requestData['isIncoming'])
) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'Missing required parameters.']));
}

// Extract parameters from the request data
$userMobile = $requestData['userMobile'];
$orgMobile = $requestData['orgMobile'];
$itemId = $requestData['itemId'];
$type = $requestData['type'];
$weight = $requestData['weight'];
$duration = $requestData['duration'];
$status = $requestData['status'];
$isIncoming = $requestData['isIncoming'];

// Create a MySQLi connection using your config.php file
$mysqli = $conn;

// Check for connection errors
if ($mysqli->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Query to fetch item information based on the provided parameters
$query = "SELECT
    id, userName, userMobile, userImage, userAddress, orgId, orgName, orgMobile, orgImage, orgAddress,
    itemId, itemName, weight, duration, type, status, isIncoming, dateAdded
    FROM items
    WHERE userMobile = '$userMobile'
    AND orgMobile = '$orgMobile'
    AND itemId = '$itemId'
    AND type = '$type'
    AND weight ='$weight'
    AND duration ='$duration'
    AND status = '$status'
    AND isIncoming = '$isIncoming'";

$result = $mysqli->query($query);

if ($result && $result->num_rows > 0) {
    // Items matching the criteria found, return the item information
    $items = [];

    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    http_response_code(200); // OK
    echo json_encode($items);
} else {
    // No matching items found, return an empty array
    http_response_code(200); // OK
    echo json_encode([]);
}

$mysqli->close();
?>