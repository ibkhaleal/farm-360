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

// Extract parameters from the request data
$userId = isset($requestData['userId']) ? $requestData['userId'] : '';
$toolName = isset($requestData['name']) ? $requestData['name'] : '';
$image = isset($requestData['image']) ? $requestData['image'] : '';

// Create a MySQLi connection using your config.php file
$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check for connection errors
if ($mysqli->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Check if the user's ID exists in the users table
$query = "SELECT COUNT(*) FROM users WHERE id = ?";
$stmt = $mysqli->prepare($query);

if ($stmt) {
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $count = $stmt->get_result()->fetch_assoc()['COUNT(*)'];
    $stmt->close();

    if ($count > 0) {
        // User's ID exists, insert the tool information into the tools table
        $insertQuery = "INSERT INTO tools (id, name, image) VALUES (?, ?, ?)";
        $insertStmt = $mysqli->prepare($insertQuery);

        if ($insertStmt) {
            $insertStmt->bind_param("iss", $userId, $toolName, $image);
            $insertStmt->execute();
            $insertStmt->close();
            http_response_code(201); // Created
            echo json_encode(['message' => 'Tool added successfully']);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Tool insertion failed']);
        }
    } else {
        // User's ID does not exist, return an error message
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'User ID not found']);
    }
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database error: ' . $mysqli->error]);
}

$mysqli->close();
?>