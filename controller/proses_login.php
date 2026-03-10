<?php
session_start();

$users = [
    [
        'username' => 'admin',
        'password' => '1234',
        'nama'     => 'Administrator',
        'role'     => 'admin',
    ],
    [
        'username' => 'hafizhah',
        'password' => '123456',
        'nama'     => 'hafizhah',
        'role'     => 'pembeli',
    ],
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../login.php');
    exit;
}

$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');
$remember = isset($_POST['remember']);

if ($username === '' || $password === '') {
    header('Location: ../login.php?error=empty');
    exit;
}

$found = null;
foreach ($users as $u) {
    if ($u['username'] === $username && $u['password'] === $password) {
        $found = $u;
        break;
    }
}

if (!$found) {
    header('Location: ../login.php?error=invalid');
    exit;
}

session_regenerate_id(true);
$_SESSION['user']     = $found['username'];
$_SESSION['nama']     = $found['nama'];
$_SESSION['role']     = $found['role'];  
$_SESSION['login_at'] = time();

if ($remember) {
    setcookie('username', $found['username'], time() + (30 * 24 * 3600), '/', '', false, true);
} else {
    setcookie('username', '', time() - 3600, '/');
}

header('Location: ../index.php');
exit;