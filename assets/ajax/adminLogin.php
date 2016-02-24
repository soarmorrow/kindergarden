<?php
/*****************************************
 *  Admin Login script
 * ***************************************
 * @file   : ajax/adminLogin.php
 * @author : Vineeth N K(me@vineethkrisknan.in)
 */
session_start();
require_once "db.class.php";
if (isset($_POST) && !empty($_POST)) {
    if (!isset($_POST['admin']) || empty($_POST['admin'])) {
        echo 'No admin';
        exit;
    }
    if (!isset($_POST['ss']) || $_POST['ss'] == 0) {
        echo 'No password';
        exit;
    }
    if ((isset($_SESSION['username']) && !empty($_SESSION['username'])) || (isset($_SESSION['email']) && !empty($_SESSION['email']))):
        echo 'logged in as ' . $_SESSION['username'];
        exit;
    endif;
    $connection = new DB();
    $connection->getConnection();
    $user = $_POST['admin'];
    if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
        $condition = " `email` = '$user' ";
    } else {
        $condition = "`username` = '$user' ";
    }
    $password = md5(substr($_POST['password'], $_POST['ssl'], $_POST['ss']));
    $condition .= "AND `password` = '$password'";
    $sql = "SELECT count(*) FROM `tc_users`  WHERE $condition AND `admin`=1 ";
    $admin = $connection->query($sql);
    if (!$admin) {
        echo '<pre>' . $connection->db->errorInfo() . '</pre>';
    }
    $rows = $admin->fetch(PDO::FETCH_NUM);
    if ($rows[0] == 0) {
        echo 'Invalid login';
        exit;
    }
    $admin_row = $connection->query("SELECT * FROM `tc_users`  WHERE $condition AND `admin`=1 ");
    $select_user = $admin_row->fetch(PDO::FETCH_ASSOC);
    $timezone = date_default_timezone_set("Asia/Brunei");
    $time = date('Y-m-d H:i:s', $timestamp = time());
    $update_login_time = $connection->query("UPDATE `tc_users` SET `last_time` = '$time' WHERE `tc_users`.`user_id` =" . $select_user['user_id'] . ";");
    $resetToken = md5(uniqid());
    $update = "UPDATE `tc_users` SET `token` = '" . $resetToken . "' WHERE `tc_users`.`user_id` =" . $select_user['user_id'] . ";";
    $reset_token = $connection->query($update);
    $_SESSION['user_id'] = $select_user['user_id'];
    $_SESSION['username'] = $select_user['username'];
    $_SESSION['last_time'] = $select_user['last_time'];
    $_SESSION['email'] = $select_user['email'];
    $_SESSION['suspended'] = $select_user['suspended'];
    echo 'logging in';
    exit;
} else {
    echo 'script access restricted';
}
?>