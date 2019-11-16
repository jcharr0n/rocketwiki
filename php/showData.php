<?php

// connect
$username = "debian-sys-maint";
$password = "qQRq84cGJRSjbanJ";
$database = "itemdb";
$mysqli = new mysqli("localhost", $username, $password, $database);

$query = "SELECT * FROM itemdb.main_item_list ORDER BY name";
echo "<b> <center>Database Output</center> </b> <br> <br>";

// for displaying
if ($result = $mysqli->query($query)) {
    while ($row = $result->fetch_assoc()) {
        $name = $row["name"];
        $category = $row["category"];
        $rarity = $row["rarity"];
        $obtain_method = $row["obtain_method"];
        $debut_date = $row["debut_date"];
        $hitbox = $row["hitbox"];

        echo '<b>'.$name.'</b> <br />';
        echo $category.'</b><br />';
        echo $rarity.'<br />';
        echo $obtain_method.'<br />';
        echo $debut_date.'<br />';
        echo $hitbox. '<br /> <br />';
    }

$result->free();
}

?>