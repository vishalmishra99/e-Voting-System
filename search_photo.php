<?php 
// array for JSON response
$response = array();

// include db connect class
require_once __DIR__ . '/db_connect.php';

// connecting to db


$data = json_decode(file_get_contents("php://input"));
$get_id_1 =$_POST['cook_user_email'];
//$get_id = substr($get_id_1, 1, -1);

	$result1 = mysqli_query($conn,"SELECT * FROM login WHERE email = '$get_id_1'");
	$Allresponse1 = mysqli_fetch_array($result1);
	$get_mobile = $Allresponse1["mobile"];
	
if (!empty( $_FILES ))
{
	
	$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $target_dir = "uploads/";
	$uploadPath = $target_dir . basename($_FILES[ 'file' ][ 'name' ]);
	$imageFileType = pathinfo($uploadPath,PATHINFO_EXTENSION);
	
    $get_file = "http://localhost/projects/voting/web/uploads/".$_FILES[ 'file' ][ 'name' ]."";
    
	$encrypted = md5($get_file); // Encrypted output 
	

			
		$result = mysqli_query($conn,"SELECT * FROM voter where field_1='$get_id_1' ");

		if(mysqli_num_rows($result))
		{
			$response["details"] = array();	

			while($Alldetails = mysqli_fetch_array($result))
			{
				// temp user array
				$details = array();
				$details = $Alldetails;
				$encrypted_old_img = $Alldetails["field_13"];
				array_push($response["details"],$details);
				if (strcmp($encrypted ,$encrypted_old_img )==0)
				{
					$otp = rand(10000,90000);
					mysqli_query($conn,"UPDATE voter SET field_14='$otp' WHERE field_1='$get_id_1' ");
					header('Location: post_otp.html');
					
			
			/////////////////////////////////////////////////
			///////////////////SMS //////////////////////////
			/////////////////////////////////////////////////
	
	// Authorisation details
	$username = "contact@arudhrainnovations.com";
	$hash = "5a920f96a12b4702b59fe996787fe7d1f9a7c61c";
	$test = "0";
	$sender = "AISOFT"; // This is who the message appears to be from.	
	$numbers = $get_mobile; // A single number or a comma-seperated list of numbers

	$message = 'Your OTP '.$get_otp.' to verify your mobile number by AISOFT';

		$message = urlencode($message);
		$data = "username=".$username."&hash=".$hash."&message=".$message."&sender=".$sender."&numbers=".$numbers."&test=".$test;
	
		$ch = curl_init('http://api.textlocal.in/send/?');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch); // This is the result from the API
		curl_close($ch);

			$response["success"] = 1;	
			echo json_encode($response);
			/////////////////////////////////////////////////
			///////////////////SMS /////////////////////
			/////////////////////////////////////////////////


					
				}
					else
					{
						echo 'No files';
					}
				
			}
				
			/*
			move_uploaded_file( $tempPath, $uploadPath );
			*/
			$answer = array( 'answer' => 'File transfer completed' );
			$json = json_encode( $answer );
			echo $json;
		}
		else
		{
			echo 'No files';
		}
		
	
	
} 

?>