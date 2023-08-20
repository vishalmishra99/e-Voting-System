<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_password = ($data->email);

if(empty($get_password))
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM voter WHERE field_1 = '$get_password' ");
	$Alldetails = mysqli_fetch_array($result);
	$get_ward = $Alldetails["field_10"];
	
	$result1 = mysqli_query($conn,"SELECT * FROM candidate WHERE field_3 = '$get_ward' ");
				
if(mysqli_num_rows($result1))
{
	$response["details"] = array();	

	while($Alldetails1 = mysqli_fetch_array($result1))
	{
		// temp user array
		$details = array();
		$details = $Alldetails1;
		array_push($response["details"],$details);
	}	
	$response["success"] = 1;
	echo json_encode($response);

}
		else
		{
			// success	
			$response["success"] = 0;
			// echoing JSON details
			echo json_encode($response);
		}
}
?>