<?php
/* * *********************************
 *  Download authentication script
 * *********************************
 * @file   : download.php
 * @author : Vineeth N K(me@vineethkrisknan.in)
 * 
 * Variables
 * $sid  : student ID , serves as password for download
 * $file : Name of file to be downloaded
 * $category : specify which centre
 * 
 */
require_once './assets/ajax/db.class.php';
if (isset($_GET) || !empty($_GET)) {
    if (!isset($_GET['sid']) || $_GET['sid'] == "" || empty($_GET['sid'])) {
        header('Location: /');
        exit;
    }
    if (!isset($_GET['file']) || $_GET['file'] == "" || empty($_GET['file'])):
        
        header('Location: /');
        exit;
    endif;
    if (!isset($_GET['category']) || $_GET['category'] == "" || empty($_GET['category'])):
        
        header('Location: /');
        exit;
    endif;
    $db = new DB();
    $db->getConnection();
    $sid = addslashes(strip_tags($_GET['sid']));
    $category = stripslashes(strip_tags($_GET['category']));
    switch ($category) {
        case "all": $path = "downloads/all_centres/";
            $center = 'all';
            break;
        case "tc": $path = "downloads/tadika_cerah/";
            $center = 'Tadika Cerah';
            break;
        case "eb": $path = "downloads/era_baru/";
            $center = 'Tadika Era Baru';
            break;
        case "sb": $path = "downloads/si_bijak/";
            $center = 'Tadika Si Bijak';
            break;
    }
    $queryConstraint = ($center != 'all')?" AND `center`='$center';":";";
    $query = "SELECT `sid` FROM `tc_download`  WHERE `sid`='$sid'".$queryConstraint;
    try {
        $verifyStudent = $db->query($query);
    } catch (PDOException $ex) {
        echo 'Error : ' . $ex->getMessage();
        exit;
    }
    if (!$verifyStudent) {
        echo print_r($db->db->errorInfo());
    }
    $db->setAssoc();
    $verified = $verifyStudent->fetch(PDO::FETCH_ASSOC);
    if ($verified['sid'] == NULL) {
        
        header('Location: /');
        exit;
    }
    if (strcmp($sid, $verified['sid']) !== 0) {
        
        header('Location: /');
        exit;
    }
    $filename = preg_replace('#[^-\w]#', '', $_GET['file']);
    $file = $path . "{$filename}.pdf";
    if (file_exists($file)) {
        header('Cache-Control: public');
        header('Content-Description: File Transfer');
        header("Content-Disposition: attachment; filename={$filename}.pdf");
        header('Content-Type: application/pdf');
        header('Content-Transfer-Encoding: binary');
        readfile($file);
        exit;
    } else {
        
        header('Location: /');
        exit;
    }
}
die("ERROR: invalid file or you don't have permissions to download it.");
?>
