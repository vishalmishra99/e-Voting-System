
<?php
/************************ YOUR DATABASE CONNECTION START HERE   ****************************/
ob_start();

define('DB_USER', "root"); // db user
define('DB_PASS', ""); // db password (mention your db password here)
define('DB_NAME', "voting_otp"); // database name
define('DB_HOST', "localhost"); // db server


$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

$databasetable = "excel";

/************************ YOUR DATABASE CONNECTION END HERE  ****************************/


set_include_path(get_include_path() . PATH_SEPARATOR . 'Classes/');
include 'PHPExcel/IOFactory.php';

// This is the file path to be uploaded.
$inputFileName = 'voter_list.xlsx'; 

try {
	$objPHPExcel = PHPExcel_IOFactory::load($inputFileName);
} catch(Exception $e) {
	die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
}


$allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
$arrayCount = count($allDataInSheet);  // Here get total count of row in that Excel sheet


for($i=2;$i<=$arrayCount;$i++){
$get_field_1 = trim($allDataInSheet[$i]["A"]);
$get_field_2 = trim($allDataInSheet[$i]["B"]);
$get_field_3 = trim($allDataInSheet[$i]["C"]);
$get_field_4 = trim($allDataInSheet[$i]["D"]);
$get_field_5 = trim($allDataInSheet[$i]["E"]);
$get_field_6 = trim($allDataInSheet[$i]["F"]);
$get_field_7 = trim($allDataInSheet[$i]["G"]);
$get_field_8 = trim($allDataInSheet[$i]["H"]);
$get_field_9 = trim($allDataInSheet[$i]["I"]);
$get_field_10 = trim($allDataInSheet[$i]["J"]);
$get_field_11 = trim($allDataInSheet[$i]["K"]);
$get_field_12 = trim($allDataInSheet[$i]["L"]);
$get_created_date =  date('Y-m-d');

$insertTable=  mysqli_query($conn,"INSERT INTO voter(	field_1, field_2, field_3, field_4,
							field_5, field_6,field_7, field_8, field_9, field_10,field_11,field_12, created_date	)
					VALUES(	'$get_field_1', '$get_field_2', '$get_field_3', '$get_field_4', '$get_field_5',
							'$get_field_6','$get_field_7','$get_field_8','$get_field_9', 
							'$get_field_10','$get_field_11', '$get_field_12', '$get_created_date')");
}
header('Location:view_voter.html');
ob_flush();
?>