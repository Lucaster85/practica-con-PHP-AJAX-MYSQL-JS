<?php
    include('database.php');
    $query = "SELECT * FROM task";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Failed query'. mysqli_error($conecction));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'name' => $row['name'] ,
            'description' => $row['description'],
            'id' => $row['id']
        );
    }
    // var_dump($json);
    // exit;
    $jsonstring = json_encode($json);
    echo $jsonstring;
?>