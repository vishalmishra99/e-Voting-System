<?php
/* Following code will match admin login credentials */

//user temp array
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


// check for post data
$data = json_decode(file_get_contents("php://input"));
$get_empid = ($data->email);

if(empty($get_empid) )
{
	$response["success"] = 2;
	echo json_encode($response);
}
else
{
	$result = mysqli_query($conn,"SELECT * FROM voter WHERE field_1 = '$get_empid' ");

		if (mysqli_num_rows($result))
		{
			$Allresponse = mysqli_fetch_array($result);
			// temp user array
			$details = array();
			$details = $Allresponse;
			$get_mobile = $Allresponse["field_12"];
			$get_otp = rand(10000,99000);
			
			mysqli_query($conn,"UPDATE voter SET field_13='$get_otp' WHERE field_1 = '$get_empid' ");
			
			mysqli_query($conn,"UPDATE sms_count SET  field_1=field_1+1   ");

			array_push($response["details"],$details);
			$response["success"] = 1;
			echo json_encode($response);
			
			/////////////////////////////////////////////////
			///////////////////SMS /////////////////////
			/////////////////////////////////////////////////

	// Authorisation details
	$username = "contact@arudhrainnovations.com";
	$apiKey = urlencode('gFiNovbuwFA-Sq6GSGPLvCfzHKWRcQBbuzlt0ChGEK');
	$test = "0";

	$sender = urlencode('AISOFT');
	$numbers = $get_mobile; // A single number or a comma-seperated list of numbers

		$message = 'Your OTP '.$get_otp.' to verify your mobile number by AISOFT';


	$message = urlencode($message);
	$data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);
	
		$ch = curl_init('https://api.textlocal.in/send/');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result2 = curl_exec($ch); // This is the result from the API
		curl_close($ch);

			/////////////////////////////////////////////////
			///////////////////SMS /////////////////////
			/////////////////////////////////////////////////

		} 
		else
		{
			// success	
			$response["success"] = 0;
			// echoing JSON response
			echo json_encode($response);
		}
}
?>