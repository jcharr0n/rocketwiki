<?php

// connect db to ui
$username = "debian-sys-maint";
$password = "qQRq84cGJRSjbanJ";
$database = "itemdb";
$mysqli = new mysqli("localhost", $username, $password, $database);

// for adding
$name = $mysqli->real_escape_string($_POST['name']);
$category = $mysqli->real_escape_string($_POST['category']);
$rarity = $mysqli->real_escape_string($_POST['rarity']);
$obtain_method = $mysqli->real_escape_string($_POST['obtain_method']);
$debut_date = $mysqli->real_escape_string($_POST['debut_date']);
$hitbox = $mysqli->real_escape_string($_POST['hitbox']);

$query = "INSERT INTO itemdb.main_item_list (name, category, rarity, obtain_method, debut_date, hitbox)
            VALUES ('{$name}','{$category}','{$rarity}','{$obtain_method}','{$debut_date}','{$hitbox}')";

$mysqli->query($query);
$mysqli->close();

?>