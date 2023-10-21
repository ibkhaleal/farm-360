<?php
error_reporting(0);
require_once('config.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    die(json_encode(['error' => 'Only POST requests are allowed.']));
}

$requestData = json_decode(file_get_contents("php://input"), true);

if (!isset($requestData['type']) && !isset($requestData['id'])) {
    http_response_code(500);
    die(json_encode(['error' => 'User type or id is required.']));
}


$id = $requestData['id'];
$utype = $requestData['type'];
// Check if the 'id' parameter is provided in the URL
if (!isset($requestData['id'])) {
   //if there's no id it'll fetch all the users
  $query = "SELECT * FROM user WHERE  clerkId ='$id'"; 
}
else{
    
 $query = "SELECT * FROM user WHERE utype ='$utype'";    
    
}
$mysqli = $conn;
$result = mysqli_query($conn, $query);


    if ($result->num_rows > 0) {
        
        // User found, return user information as JSON
       while($user = $result->fetch_assoc()){
        http_response_code(200); // OK
        echo json_encode($user);
        
       }
    } else {
        // User not found, return an error message
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'User not found!']);
    }



$mysqli->close();
?>