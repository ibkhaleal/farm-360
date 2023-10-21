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
    !isset($requestData['productId']) || !isset($requestData['weight'])
) {
    http_response_code(400); // Bad Request
    die(json_encode(['error' => 'Missing required parameters.']));
}

// Extract parameters from the request data
$userMobile = $requestData['userMobile'];
$orgMobile = $requestData['orgMobile'];
$productId = $requestData['productId'];
$weight = $requestData['weight'];

// Create a MySQLi connection using your config.php file
$mysqli = $conn;

// Check for connection errors
if ($mysqli->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(['error' => 'Database connection failed: ' . $mysqli->connect_error]));
}

// Check if the user already has the product in storage
$query = "SELECT * FROM items WHERE userMobile = '$userMobile' AND orgMobile = '$orgMobile' AND itemId = '$productId'";
$result = $mysqli->query($query);

if ($result && $result->num_rows > 0) {
    // User already has the product, update the weight
    $updateQuery = "UPDATE items SET weight = '$weight' WHERE userMobile = '$userMobile' AND orgMobile = '$orgMobile' AND itemId = '$productId'";
    $updateResult = $mysqli->query($updateQuery);

    if ($updateResult) {
        // Product weight updated successfully, fetch and return item information
        $itemInfoQuery = "SELECT  items.id AS id,  items.itemName AS name, items.ownerId AS ownerId,
                items.userName AS ownerName, items.userMobile AS ownerMobile, items.userImage AS ownerImage, items.userAddress AS ownerAddress,
                items.weight, items.dateAdded
                FROM items WHERE userMobile = '$userMobile' AND orgMobile = '$orgMobile' AND itemId = '$productId'";
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
    // User doesn't have the product, insert a new record
    // Fetch necessary data from the tables
    $fetchDataQuery1 = "SELECT 
            user.id AS ownerId, user.name AS userName, user.image AS userImage, user.address AS userAddress FROM user WHERE phone = '$userMobile'";
            
             $fetchDataQuery2 = "SELECT user.id AS orgId, user.name AS orgName, user.phone AS orgMobile, user.image AS orgImage, user.address AS orgAddress
            FROM user
            WHERE phone = '$orgMobile'";
            
             $fetchDataQuery3 = "SELECT items.itemName AS pName FROM items
            WHERE itemId  = '$productId'";
            

    $fetchDataResult = $mysqli->query($fetchDataQuery1);
    $fetchDataResult2 = $mysqli->query($fetchDataQuery2);
    $fetchDataResult3 = $mysqli->query($fetchDataQuery3);

    if ($fetchDataResult && $fetchDataResult->num_rows > 0) {
        $data = $fetchDataResult->fetch_assoc();
        $data2 = $fetchDataResult2->fetch_assoc();
        $data3 = $fetchDataResult3->fetch_assoc();

        // Insert the new product with fetched data
        $insertQuery = "INSERT INTO items (userMobile, orgMobile, itemId, itemName, weight, type, status, isIncoming, ownerId, userName, userImage, userAddress, orgId, orgName, orgImage, orgAddress) 
        VALUES ('$userMobile', '$orgMobile', '$productId', '{$data3['pName']}', '$weight', 1, 'unread', true,  '{$data['ownerId']}', '{$data['userName']}', '{$data['userImage']}', '{$data['userAddress']}', '{$data2['orgId']}', '{$data2['orgName']}', '{$data2['orgImage']}', '{$data2['orgAddress']}')";

        $insertResult = $mysqli->query($insertQuery);

        if ($insertResult) {
            // Product inserted successfully, fetch and return item information
            $itemInfoQuery = "SELECT  items.id AS id,  items.itemName AS name, items.ownerId AS ownerId,
                items.userName AS ownerName, items.userMobile AS ownerMobile, items.userImage AS ownerImage, items.userAddress AS ownerAddress,
                items.weight, items.dateAdded
                FROM items WHERE userMobile = '$userMobile' AND orgMobile = '$orgMobile' AND itemId = '$productId'";
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
            // Error inserting new product
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Failed to insert new product: ' . $mysqli->error]);
        }
    } else {
        // Error fetching user data
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Failed to fetch user data: ' . $mysqli->error]);
    }
}

$mysqli->close();
?>