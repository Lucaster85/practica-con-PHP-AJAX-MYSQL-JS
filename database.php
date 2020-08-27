<?php
    $connection = mysqli_connect(
        'localhost',
        'root',
        'root',
        'php_mysql_crud'
    );

    if ($connection) {
        echo 'Database is connected';
    }
?>