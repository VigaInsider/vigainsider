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

$router->get('/viganews', function() {
    view('viganews', [
        'title' => 'VigaInsider - viganews',
    ]);
});

$router->get('/creazioni', function() {
    view('creazioni', [
        'title' => 'VigaInsider - creazioni',
    ]);
});

$router->get('/vigasecurity', function() {
    view('vigasecurity', [
        'title' => 'VigaInsider - vigasecurity',
    ]);
});
$router->get('/attachi_vigasec', function() {
    view('attachi_vigasec', [
        'title' => 'VigaInsider - vigasecurity - attachi',
    ]);
});
$router->get('/comeproteggersi_vigasec', function() {
    view('comeproteggersi_vigasec', [
        'title' => 'VigaInsider - vigasecurity - come_proteggersi',
    ]);
});
$router->get('/chisiamo_vigasec', function() {
    view('chisiamo_vigasec', [
        'title' => 'VigaInsider - vigasecurity - chi_siamo',
    ]);
});

$router->get('/vigasolidale', function() {
    view('vigasolidale', [
        'title' => 'VigaInsider - vigasolidale',
    ]);
});

$router->get('/giochi', function() {
    view('giochi', [
        'title' => 'VigaInsider - giochi',
    ]);
});

$router->get('/ciclab', function() {
    view('ciclab', [
        'title' => 'VigaInsider - ciclab',
    ]);
});

$router->get('/vsw', function() {
    view('vsw', [
        'title' => 'VigaInsider - vsw',
    ]);
});

$router->get('/classiGdt', function() {
    view('classiGdt', [
        'title' => 'Gdt - classi',
    ]);
});

$router->get('/storicoGdt', function() {
    view('storicoGdt', [
        'title' => 'Gdt - storico',
    ]);
});

$router->get('/attivitaGdt', function() {
    view('attivitaGdt', [
        'title' => 'Gdt - attivita',
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
