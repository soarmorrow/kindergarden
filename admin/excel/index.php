<?php
/* * *********************************
 *  Export to excel script
 * *********************************
 * @file   : excel/index.php
 * @author : Vineeth N K(me@vineethkrisknan.in) * 
 */
session_start();
if ((!isset($_SESSION['username']) && empty($_SESSION['username'])) || (!isset($_SESSION['email']) && empty($_SESSION['email']))):
    header('Location: /');
    exit;
endif;
require_once '../../assets/ajax/db.class.php';
$db = new DB();
$db->getConnection();
if (PHP_SAPI == 'cli')
    die('This example should only be run from a Web Browser');

require_once '../class/PHPExcel.php';
date_default_timezone_set('Asia/Singapore');

$PHPExcel = new PHPExcel();

$cacheMethod = PHPExcel_CachedObjectStorageFactory::cache_in_memory;
PHPExcel_Settings::setCacheStorageMethod($cacheMethod);

PHPExcel_Shared_Font::setAutoSizeMethod(PHPExcel_Shared_Font::AUTOSIZE_METHOD_EXACT);

$cell = array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L");

$PHPExcel->getProperties()->setCreator("BrightChild Dashboard")
    ->setLastModifiedBy($_SESSION['username'])
    ->setTitle("Student Registration Details")
    ->setSubject("Student Registration Details")
    ->setDescription("Exported student details from brightchild dashboard")
    ->setKeywords("bright child student registration details")
    ->setCategory("Registration details");

$PHPExcel->setActiveSheetIndex(0)
    ->setCellValue("A1", "  Student ID")
    ->setCellValue("B1", "  Full Name")
    ->setCellValue("C1", "  Chinese Name")
    ->setCellValue("D1", "  Centre")
    ->setCellValue("E1", "  Address Line 2")
    ->setCellValue("F1", "  City")
    ->setCellValue("G1", "  Zip")
    ->setCellValue("H1", "  Home Phone Number")
    ->setCellValue("J1", "  Date of Birth")
    ->setCellValue("K1", "  MyKid Number")
    ->setCellValue("L1", "  Parent's Email");

$db->setAssoc();
$row = 3;

foreach ($db->query("SELECT * FROM tc_registered_students") as $student) {
    $col = 0;
    foreach ($student as $key => $value) {
        $PHPExcel->getActiveSheet()
            ->setCellValueByColumnAndRow($col, $row, "  " . stripslashes($value));
        $col++;
    }
    $row++;
}

$PHPExcel->getActiveSheet()
    ->getStyle("A1:AK1")
    ->getFont()
    ->setBold(true);
foreach ($cell as $columnID) {

    $PHPExcel->getActiveSheet()
        ->getColumnDimension($columnID)
        ->setAutoSize(true);
}

$PHPExcel->getActiveSheet()
    ->getStyle("A1:AK1")
    ->getFill()
    ->applyFromArray(array('type' => PHPExcel_Style_Fill::FILL_SOLID, 'startcolor' => array('rgb' => 'D1D1D1')));

$PHPExcel->setActiveSheetIndex(0);

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="RegistrationDetails.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($PHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;
?>
