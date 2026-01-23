<?php

class ViewEngine {
    private $layout = null;
    
    public function setLayout($layoutPath) {
        $this->layout = $layoutPath;
    }
    
    public function getLayout() {
        return $this->layout;
    }
}

$viewEngine = new ViewEngine();

/**
 * Render a view with optional data and layout support
 */
function view($path, $data = []) {
    global $viewEngine;
    
    // Extract data array into variables
    if (is_array($data)) {
        extract($data);
    }
    
    $viewPath = __DIR__ . '/../resources/views/' . $path . '.php';
    
    if (!file_exists($viewPath)) {
        throw new Exception('View not found: ' . $viewPath);
    }
    
    // Capture the view content
    ob_start();
    require $viewPath;
    $viewContent = ob_get_clean();
    
    // If a layout is set, wrap the content with the layout
    if ($viewEngine->getLayout()) {
        $layoutPath = __DIR__ . '/../resources/views/' . $viewEngine->getLayout() . '.php';
        
        if (!file_exists($layoutPath)) {
            throw new Exception('Layout not found: ' . $layoutPath);
        }
        
        // Make the view content available to the layout as $slot
        $slot = $viewContent;
        
        ob_start();
        require $layoutPath;
        echo ob_get_clean();
        
        // Reset layout
        $viewEngine->setLayout(null);
    } else {
        echo $viewContent;
    }
}

/**
 * Set the layout for the current view
 */
function layout($layoutPath) {
    global $viewEngine;
    $viewEngine->setLayout($layoutPath);
}

/**
 * Include a component with optional data
 */
function component($name, $data = []) {
    // Extract data array into variables
    if (is_array($data)) {
        extract($data);
    }
    
    $componentPath = __DIR__ . '/../resources/views/components/' . $name . '.php';
    
    if (!file_exists($componentPath)) {
        throw new Exception('Component not found: ' . $componentPath);
    }
    
    require $componentPath;
}


