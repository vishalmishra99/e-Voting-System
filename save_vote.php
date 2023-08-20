<?php
/*********************
**** CPanel ******************
*********/

/* Following register will admin login credentials */

// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));

$get_id = ($data->ward);
$get_email = ($data->email);
$get_field_1 = ($data->field_1);
$get_created_date =date('Y-m-d');


$result1 = mysqli_query($conn,"SELECT * FROM candidate WHERE field_1 = '$get_field_1'   ");

			$Allresponse = mysqli_fetch_array($result1);
			// temp user array
			//$details = array();
			$get_year = $Allresponse["field_4"];
			$get_date = $Allresponse["field_5"];
			
			
$result4 = mysqli_query($conn,"SELECT * FROM results WHERE email='$get_email' and field_2='$get_year' and field_3='$get_date' ");


if( empty($get_field_1) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else if(mysqli_num_rows($result4))
{
	$response["success"] = 4;	
	echo json_encode($response);
}
else
{

	$result = mysqli_query($conn,"INSERT INTO results( email, field_1,field_2, field_3,  created_date	)
					VALUES(	'$get_email','$get_field_1','$get_year', '$get_date','$get_created_date')");
			
	// check for empty result
	if($result)
	{
	
	 mysqli_query($conn,"UPDATE candidate SET field_10=field_10+1 WHERE field_1 = '$get_field_1' ");

		// success
		$response["success"] = 1;		
		// echoing JSON response
		echo json_encode($response);
		
		
	}
	else 
	{
		// unsuccess
		$response["success"] = 0;		
		// echoing JSON response
		echo json_encode($response);
	}
}
?>