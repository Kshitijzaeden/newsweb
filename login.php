<?php
session_start();

$servername = "loc";
$username = "root";
$password = ""; // Set your MySQL server password here
$dbname = "newsuser";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $loginUsername = $_POST['loginUsername'];
    $loginPassword = $_POST['loginPassword'];

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
    $stmt->bind_param("s", $loginUsername);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the hashed password
        if (password_verify($loginPassword, $user['password'])) {
            $_SESSION['username'] = $loginUsername;
            header("Location: welcome.php"); // Redirect to a welcome page upon successful login
            exit();
        } else {
            echo "Invalid password";
        }
    } else {
        echo "Invalid username";
    }

    $stmt->close();
}

$conn->close();
?>
