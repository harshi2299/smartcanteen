<?php
// Start session
session_start();

// Mock database for demonstration purposes
$users = [
    ['regNo' => 'U05C22S01', 'username' => 'student1', 'password' => 'password123'],
    ['regNo' => 'U05C22S02', 'username' => 'student2', 'password' => 'password456']
];

// Get POST data
$regNo = $_POST['regNo'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Validate input
if (empty($regNo) || empty($username) || empty($password)) {
    echo "All fields are required.";
    exit;
}

// Check credentials
foreach ($users as $user) {
    if ($user['regNo'] === $regNo && $user['username'] === $username && $user['password'] === $password) {
        // Set session variables
        $_SESSION['regNo'] = $regNo;
        $_SESSION['username'] = $username;

        // Redirect to dashboard (or any other page)
        header("Location: ../frontend/dashboard.html");
        exit;
    }
}

// If credentials are invalid
echo "Invalid registration number, username, or password.";
?>
