<?php

class AppVariables
{
    private $variables = array();

    public function __construct($verified = 0, $error = 1, $message = '', $response = '') {
        $this->variables['verified'] = $verified;
        $this->variables['error'] = $error;
        $this->variables['message'] = $message;
        $this->variables['response'] = $response;
    }

    public function __get( $key )
    {
        return $this->variables[$key];
    }

    public function __set( $key, $value )
    {
        $this->variables[$key] = $value;
    }
}