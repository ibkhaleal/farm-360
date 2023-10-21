<?php
require_once('config.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    die(json_encode(['error' => 'Only POST requests are allowed.']));
}

// Set CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Continue with the rest of your script...

// Parse request JSON data
$requestData = json_decode(file_get_contents("php://input"), true);

if (!$requestData) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'Invalid JSON data.']));
}

// Validate and extract parameters from the request data
$name = $requestData['name'];
$clerkId = $requestData['clerkId'];
$phone = $requestData['phone'];
$email = $requestData['email'];
$image = $requestData['image'];
$address = isset($requestData['address']) ? $requestData['address'] : '';
$utype = isset($requestData['utype']) ? $requestData['utype'] : 1; // Default value if not provided

// Create a MySQLi connection using your existing connection variable $conn
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Check if email and phone don't already exist in the 'user' table
$checkExistingQuery = "SELECT id FROM user WHERE email = '$email' OR phone = '$phone'";
$existingResult = $conn->query($checkExistingQuery);

if ($existingResult && $existingResult->num_rows > 0) {
    // Email or phone already exists, return an error
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Email or phone number already exists.']);
} else {
    // Insert the new user into the 'user' table
    $insertQuery = "INSERT INTO user (clerkId, name, phone, email, image, address, utype) VALUES ('$clerkId', '$name', '$phone', '$email', '$image', '$address', '$utype')";
    $insertResult = $conn->query($insertQuery);

    if ($insertResult) {
        // User inserted successfully, retrieve user information
        $userInfoQuery = "SELECT id, clerkId, name, phone, email, image, address, utype, date_registered FROM user WHERE clerkId = '$clerkId'";
        $userInfoResult = $conn->query($userInfoQuery);

        if ($userInfoResult && $userInfoResult->num_rows > 0) {
            $userInfo = $userInfoResult->fetch_assoc();
            http_response_code(200); // OK
            echo json_encode($userInfo);
        } else {
            // Error fetching user information
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Failed to fetch user information.']);
        }
    } else {
        // Error inserting the user
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Failed to insert user data.'. $conn->error]);
    }
}

$conn->close();
?>
