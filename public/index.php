<?php
include_once '../config/config.php';
include_once '../config/database.php';
include_once '../app/helpers.php';
include_once '../routes/Router.php';

// Initialize router
$router = new Router();

// Define routes here
$router->get('/', function() {
    view('home', [
        'title' => 'VigaInsider - Home',
    ]);
});

$router->get('/gdt', function() {
    view('gdt', [
        'title' => 'VigaInsider - GdT',
    ]);
});

$router->get('/VGN', function() {
    view('VGN', [
        'title' => 'VigaInsider - VigaNews',
    ]);
});
$router->get('/creazioni', function() {
    view('creazioni', [
        'title' => 'VigaInsider - Creazioni',
    ]);
});
$router->get('/VGSec', function() {
    view('VGSec', [
        'title' => 'VigaInsider - VigaSecurity',
    ]);
});
$router->get('/VGSolidale', function() {
    view('VGSolidale', [
        'title' => 'VigaInsider - VigaSolidale',
    ]);
});
$router->get('/GDI', function() {
    view('GDI', [
        'title' => 'VigaInsider - Giochi di Informatica',
    ]);
});
$router->get('/CICL', function() {
    view('CICL', [
        'title' => 'VigaInsider - CICLab',
    ]);
});


$router->get('health', function() {
    echo json_encode(['status' => 'ok']);
});

// Example route with parameter
$router->get('user/{id}', function($id) {
    echo json_encode(['userId' => $id]);
});

$router->post('user', function() {
    $data = json_decode(file_get_contents('php://input'), true);
    echo json_encode(['created' => $data]);
});

// Dispatch the request
$router->dispatch();
?>
