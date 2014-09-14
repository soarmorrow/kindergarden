<?php

/* * *********************************
 *  Admin settings change
 * *********************************
 * @file   : changeSettings.php
 * @author : Vineeth N K(me@vineethkrisknan.in)
 * 
 */
session_start();
require_once '../assets/ajax/db.class.php';
if ((!isset($_SESSION['username']) && empty($_SESSION['username'])) || (!isset($_SESSION['email']) && empty($_SESSION['email']))):
    echo 'session expired';
    exit;
endif;
$post = filter_input_array(INPUT_POST);
if (isset($post) && !empty($post)) {
    $connection = new DB();
    $connection->getConnection();
    if (isset($post['email']) && !empty($post['email'])) {
        if (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
            echo 'invalid email';
            exit;
        }
        if ($post['email'] == $_SESSION['email']) {
            echo 'old email';
            exit;
        }
        $sql = "UPDATE `tc_users` SET `email` = '" . $post['email'] . "' WHERE `tc_users`.`user_id` = " . $_SESSION['user_id'] . ";";
        try {
            $change_email = $connection->query($sql);
        } catch (PDOException $ex) {
            echo 'Error: ' . $ex;
        }
        if (!$change_email) {
            echo 'Database update error : ' . $connection->db->errorInfo();
            exit;
        }
        $_SESSION['email'] = $post['email'];
        echo 'email changed';
        exit;
    }
    if ((isset($post['password']) && !empty($post['password'])) && (isset($post['re-password']) && !empty($post['re-password']))) {
        if (strlen($post['password']) < 6) {
            echo 'too small';
            exit;
        }
        if ($post['password'] != $post['re-password']) {
            echo 'mismatch';
            exit;
        }
        $password = trim($post['password']);
        $update = "UPDATE `tc_users` SET `password` = '" . md5($password) . "' WHERE `tc_users`.`user_id` =" . $_SESSION['user_id'] . ";";
        try {
            $change_password = $connection->query($update);
        } catch (PDOException $ex) {
            echo 'Error: ' . $ex;
        }
        if (!$change_password) {
            echo 'Database update error : ' . $connection->db->errorInfo();
            exit;
        }
        echo 'password changed';
        exit;
    }
    if (isset($post['sid']) || !empty($post['sid'])) {
        $sid = strip_tags(stripslashes(trim($post['sid'])));
        $center = trim($post['center']);
        $query = "SELECT count(*) FROM `tc_download` WHERE `sid`='{$sid}'";
        try {
            $checkSid = $connection->query($query);
        } catch (PDOException $ex) {
            echo 'Error: ' . $ex;
        }
        $sidExist = $checkSid->fetch(PDO::FETCH_NUM);
        if ($sidExist[0] != 0) {
            echo 'exists';
            exit;
        }
        $sql = "INSERT INTO `tc_download` (`id` ,`sid`,`center`) VALUES ('' , '{$sid}', '{$center}');";
        try {
            $updateSid = $connection->runQuery($sql);
        } catch (PDOException $ex) {
            echo 'Error: ' . $ex;
        }
        if (!$updateSid) {
            echo 'error';
            exit;
        }
        echo 'sid updated';
        exit;
    }
    if (isset($post['delSid']) || !empty($post['delSid'])) {
        $id = trim($post['delSid']);
        $statement = "DELETE FROM `tc_download` WHERE `tc_download`.`id` = $id";
        try {
            $deleted = $connection->query($statement);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
        if(!$deleted){
            echo "Error on deleting item $id from password list. \n";exit;
        }
        echo 'deleted';
        exit;
    }
} else {
    echo 'script access restricted';
}
?>
