<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn = new mysqli("localhost", "admin", "", "storedb");

    if ($conn->connect_errno) {
        $response = array(
            "status" => "error",
            "message" => "Failed to connect to MySQL: " . $conn->connect_error
        );
        echo json_encode($response);
        exit();
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $storedPassword = $row["password"];

        if (password_verify($password, $storedPassword)) {
            $response = array(
                "status" => "success",
                "message" => "Login successful. Redirecting to the home page."
            );
            echo json_encode($response);
            exit();
        }
    }
    
    $response = array(
        "status" => "error",
        "message" => "Invalid username or password."
    );
    echo json_encode($response);

    $stmt->close();
    $conn->close();
}
?>
