<?php

class Router {
    private $routes = [];
    private $method;
    private $uri;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        // Remove leading slash for cleaner routing
        $this->uri = trim($this->uri, '/');
    }

    /**
     * Register a GET route
     */
    public function get($path, $callback) {
        $this->addRoute('GET', $path, $callback);
    }

    /**
     * Register a POST route
     */
    public function post($path, $callback) {
        $this->addRoute('POST', $path, $callback);
    }

    /**
     * Register a PUT route
     */
    public function put($path, $callback) {
        $this->addRoute('PUT', $path, $callback);
    }

    /**
     * Register a DELETE route
     */
    public function delete($path, $callback) {
        $this->addRoute('DELETE', $path, $callback);
    }

    /**
     * Register any HTTP method route
     */
    public function any($path, $callback) {
        foreach (['GET', 'POST', 'PUT', 'DELETE'] as $method) {
            $this->addRoute($method, $path, $callback);
        }
    }

    /**
     * Add a route to the routes array
     */
    private function addRoute($method, $path, $callback) {
        $path = trim($path, '/');
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'callback' => $callback,
            'params' => $this->extractParams($path)
        ];
    }

    /**
     * Extract parameter names from path (e.g., /user/{id} -> [id])
     */
    private function extractParams($path) {
        preg_match_all('/{([^}]+)}/', $path, $matches);
        return $matches[1] ?? [];
    }

    /**
     * Convert path pattern to regex (e.g., /user/{id} -> /user/([^/]+)/)
     */
    private function pathToRegex($path) {
        $path = preg_replace('/{[^}]+}/', '([^/]+)', $path);
        return '/^' . str_replace('/', '\/', $path) . '$/';
    }

    /**
     * Dispatch the request to the appropriate route
     */
    public function dispatch() {
        foreach ($this->routes as $route) {
            if ($route['method'] === $this->method) {
                $regex = $this->pathToRegex($route['path']);
                if (preg_match($regex, $this->uri, $matches)) {
                    array_shift($matches); // Remove the full match
                    
                    // Build parameters array
                    $params = [];
                    foreach ($route['params'] as $index => $param) {
                        $params[$param] = $matches[$index] ?? null;
                    }
                    
                    // Call the callback with parameters
                    if (is_callable($route['callback'])) {
                        call_user_func_array($route['callback'], $params);
                        return;
                    }
                }
            }
        }

        // Route not found
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
