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
    !isset($requestData['userMobile']) || !isset($requestData['entityMobile']) ||
    !isset($requestData['productId']) || !isset($requestData['weight'])
) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'Missing required parameters.']));
}

// Extract parameters from the request data
$userMobile = $requestData['userMobile'];
$entityMobile = $requestData['entityMobile'];
$productId = $requestData['productId'];
$requestedWeight = $requestData['weight'];

// Create a MySQLi connection using your config.php file
$mysqli = $conn;

// Check for connection errors
if ($mysqli->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Check if the user has sufficient weight to withdraw
$checkWeightQuery = "SELECT weight FROM items WHERE userMobile = '$userMobile' AND orgMobile = '$entityMobile' AND itemId = '$productId'";
$checkWeightResult = $mysqli->query($checkWeightQuery);

if ($checkWeightResult && $checkWeightResult->num_rows > 0) {
    $row = $checkWeightResult->fetch_assoc();
    $availableWeight = $row['weight'];

    if ($requestedWeight == $availableWeight) {
        // User wants to withdraw all available weight, delete the product
        $deleteQuery = "DELETE FROM items WHERE userMobile = '$userMobile' AND orgMobile = '$entityMobile' AND itemId = '$productId'";
        $deleteResult = $mysqli->query($deleteQuery);

        if ($deleteResult) {
            
            
  

                http_response_code(200); // OK
                echo json_encode(["response"=>"Withdrawn successfully"]);
            
            
            
        } else {
            // Error deleting product
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Failed to withdraw product: ' . $mysqli->error]);
        }
    } elseif ($requestedWeight < $availableWeight) {
        // User wants to withdraw a specific weight, update the weight
        $updateQuery = "UPDATE items SET weight = weight - '$requestedWeight' WHERE userMobile = '$userMobile' AND orgMobile = '$entityMobile' AND itemId = '$productId'";
        $updateResult = $mysqli->query($updateQuery);

        if ($updateResult) {
            // Weight updated successfully, fetch and return item information
            $itemInfoQuery = "SELECT 
                items.id, items.itemId AS productId, items.itemName AS name, items.ownerId,
                items.userName AS ownerName, items.userMobile AS ownerMobile, items.userImage AS ownerImage, items.userAddress AS ownerAddress,
                items.weight, items.status, items.dateAdded
                FROM items
              WHERE userMobile = '$userMobile' AND orgMobile = '$entityMobile' AND itemId = '$productId'";
            $itemInfoResult = $mysqli->query($itemInfoQuery);

            if ($itemInfoResult && $itemInfoResult->num_rows > 0) {
                $items = [];

                while ($row = $itemInfoResult->fetch_assoc()) {
                    $items[] = $row;
                }

                http_response_code(200); // OK
                echo json_encode($items);
            } else {
                // Error fetching item information
                http_response_code(500); // Internal Server Error
                echo json_encode(['error' => 'Failed to fetch item information: ' . $mysqli->error]);
            }
        } else {
            // Error updating product weight
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Failed to update product weight: ' . $mysqli->error]);
        }
    } else {
        // User requested more weight than available
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Requested weight exceeds available weight.']);
    }
} else {
    // Product not found
    http_response_code(404); // Not Found
    echo json_encode(['error' => 'Product not found.']);
}

$mysqli->close();
