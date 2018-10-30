<?php

require_once("./db/dbc.php");

class Model
{

    public $dbc;

    public function __construct()
    {
        $this->dbc = DatabaseConnection::getSingleTonInstance();
    }
}


?>