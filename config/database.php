<?php
/**
 * Database Configuration
 */
$db = [
    'host' => env('DB_HOST', 'localhost'),
    'port' => env('DB_PORT', '3306'),
    'name' => env('DB_NAME', 'vigainsider_db'),
    'user' => env('DB_USER', 'root'),
    'password' => env('DB_PASSWORD', 'root'),
];

/**
 * Create PDO database connection
 */
function getDatabaseConnection() {
    global $db;
    
    try {
        $dsn = "mysql:host={$db['host']}:{$db['port']};dbname={$db['name']};charset=utf8mb4";
        $pdo = new PDO($dsn, $db['user'], $db['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        error_log('Errore connessione al database: ' . $e->getMessage());
        throw new Exception('Connessione al database fallita.');
    }
}
