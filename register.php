<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["username"]) || !isset($_POST["email"]) || !isset($_POST["password"])) {
        $response = array(
            "status" => "error",
            "message" => "Invalid request."
        );
        echo json_encode($response);
        exit();
    }

    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $conn = new mysqli("localhost", "admin", "", "storedb");

    if ($conn->connect_errno) {
        $response = array(
            "status" => "error",
            "message" => "Failed to connect to MySQL: " . $conn->connect_error
        );
        echo json_encode($response);
        exit();
    }

    $stmt = $conn->prepare("SELECT username, email FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $response = array(
            "status" => "error",
            "message" => "Username or email already exists"
        );
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($response);
        $stmt->close();
        $conn->close();
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        $response = array(
            "status" => "success",
            "message" => "User registered successfully"
        );
        echo json_encode($response);
        exit();
    } else {
        http_response_code(500);
        $response = array(
            "status" => "error",
            "message" => "Error"
        );
        echo json_encode($response);
    }

    $stmt->close();
    $conn->close();
}
?>
