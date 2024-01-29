<?php
$servername = "localhost";
$username = "root";
$password = ""; // Set your MySQL server password here
$dbname = "newsuser";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newUsername = $_POST['newUsername'];
    $newEmail = $_POST['newEmail'];
    $newPassword = password_hash($_POST['newPassword'], PASSWORD_DEFAULT);

    // Additional validation and sanitation
    if (empty($newUsername) || empty($newEmail) || empty($_POST['newPassword'])) {
        die("All fields are required for registration.");
    }

    // Validate email format
    if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    // Check if the username or email already exists (consider adding this logic)

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $newUsername, $newEmail, $newPassword);

    if ($stmt->execute()) {
        // Redirect with a success message
        header("Location: login.html?registration=success");
        exit();
    } else {
        echo "Error during registration: " . $stmt->error;
        // Add additional error handling if needed
    }

    $stmt->close();
}

$conn->close();
?>
