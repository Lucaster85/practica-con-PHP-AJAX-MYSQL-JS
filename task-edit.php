<?php
    include('database.php');

    $id = $_POST['id'];
    $description = $_POST['description'];
    $name = $_POST['name'];

    $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = $id";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query failed');
    }
    echo "Update task successfully";

?>