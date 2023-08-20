var app = angular.module("myapp", ['ngCookies']);
app.controller("myappCtrl", function($scope, $cookies, $cookieStore, $http) 
{
	
/****************************************************************************/
/************************** Get Admin Details ***********************************/
/****************************************************************************/	
	$scope.cook_admin_email = $cookieStore.get("cook_admin_email");
	$scope.cook_user_email = $cookieStore.get("cook_user_email");
	$scope.cook_user_ward = $cookieStore.get("cook_user_ward");

	$scope.user_logout = function() 
	{
		if(confirm("Are You Sure?"))
		{
			$cookies.cook_user_email = "";
			$cookies.cook_user_ward = "";
			$cookies.cook_admin_email = "";
			window.location = "index.html";
			return;
		}
		else
		{
			return false;
		}
	}
	/****************************************************************************/
/************************** Generate OTP  *************************************/
/****************************************************************************/
	// sign in button
	$scope.generate_otp = function() 
	{		
        $http.post('generate_otp.php', 
			{'email': $scope.cook_user_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("OTP Sent Successful");
				window.location = "post_otp.html";  // Home Page
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				//alert("OTP Sent Successful");
				window.location = "post_otp.html";  // Home Page
				return;				
			}
        });
    }

/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.match_otp = function() 
	{		
		$http.post('match_otp.php', {
		'field_1':$scope.field_1,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("OTP Matched Created Successfully");
				window.location = "submit_vote.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
			{
				alert("OTP Not Matched");
			}
        });
    }
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.save_vote = function() 
	{		
		$http.post('save_vote.php', {
		'field_1':$scope.field_1,'ward':$scope.cook_user_ward,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Voting Submitted");
				window.location = "user_home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 4)
			{
				alert("Already Vote Submitted");
			}
			else
			{
				alert("OTP  Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_student = function() 
	{		
		$http.post('create_student.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'email':$scope.cook_admin_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Mobile No");
			}
			else
			{
				alert("Please Fill All Fields");
			}
        });
    }
/****************************************************************************/
/************************** Add Complaint *********************************/
/****************************************************************************/
	$scope.create_voter = function() 
	{		
		$http.post('create_voter.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'field_6':$scope.field_6,
		'field_7':$scope.field_7,'field_8':$scope.field_8,'field_9':$scope.field_9,
		'field_10':$scope.field_10,'field_11':$scope.field_11,'field_12':$scope.field_12,
		'email':$scope.cook_admin_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Created Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 3)
			{
				alert("Enter 10 Digit Number");
			}
			else if(data.success == 5)
			{
				alert("Voter ID Already Exist");
			}
			else if(data.success == 6)
			{
				alert("Enter 6 Pincode Number");
			}
			else
			{
				alert("Un Successfully");
			}
        });
    }
/****************************************************************************/
/************************** admin Details *********************************/
/****************************************************************************/
	$http.post('admin_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.admin_details = data.details;
		}
		else
		{
			$scope.admin_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get Feedback *********************************/
/****************************************************************************/
	$http.post('feedback_get.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.feedback_details = data.details;
		}
		else
		{
			$scope.feedback_details = "No Data Found !!!";
		}
    });
/****************************************************************************/
/************************** Get All details  *********************************/
/****************************************************************************/
	$http.post('get_voter.php')
	.success(function(data, status, headers, config) 
	{
			$scope.details = data.details;
    });
	
	$http.post('get_sport.php')
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.sport_details = data.details;
		}
		else
		{
			$scope.sport_details = "No Data Found !!!";
		}
    });
	
	$http.get('get_conference.php')
	.success(function (response) 
	{
		$scope.conf_details = response.details;
	});
	$http.get('get_placement.php')
	.success(function (response) 
	{
		$scope.place_details = response.details;
	});
	$http.get('get_cultural.php')
	.success(function (response) 
	{
		$scope.cultural_details = response.details;
	});
	
	$http.get('get_candidate.php')
	.success(function (response) 
	{
		$scope.candidate_details = response.details;
	});
	
		$scope.update_image = function(cus_id) 
			{
				$cookieStore.put("cook_app_id",cus_id);
				window.location = "file.html";
				return;
			}
		$scope.cook_app_id = $cookieStore.get("cook_app_id");
/****************************************************************************/
/************************** Add Requriments *********************************/
/****************************************************************************/
	$scope.create_requirment = function() 
	{		
		$http.post('create_sport.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Sport Created Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
/****************************************************************************/
/************************** Add create_conference *********************************/
/****************************************************************************/
	$scope.create_conference = function() 
	{		
		$http.post('create_conference.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'field_5':$scope.field_5,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Conference Created Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
/****************************************************************************/
/************************** Add create_conference *********************************/
/****************************************************************************/
	$scope.create_cultural = function() 
	{		
		$http.post('create_cultural.php', {
		'field_1':$scope.field_1,'field_2':$scope.field_2,'field_3':$scope.field_3,
		'field_4':$scope.field_4,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Conference Created Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }
/****************************************************************************/
/************************** Add Requirment ***********************************/
/****************************************************************************/
	$http.post('requirment_get.php', {'email': $scope.cook_user_email})
	.success(function(data, status, headers, config) 
	{
		if(data.success == 1)
		{
			$scope.order_details = data.details;
		}
		else
		{
			$scope.order_details = "No Data Found !!!";
		}
    });

/****************************************************************************/
/************************** Add Requriments *********************************/
/****************************************************************************/
	$scope.create_feedback = function() 
	{		
		$http.post('create_feedback.php', 
		{
		'field_1':$scope.field_1,'field_2':$scope.field_2,'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Feedback Submitted Successfully");
				window.location = "home.html";
				return;				
			}
			else if(data.success == 2)
			{
				alert("Please Fill All Fields");
			}
			else if(data.success == 0)
			{
				alert("Error In Creating");
			}
			else
				{
					alert("Un Successfully");
				}
        });
    }

	

/****************************************************************************/
/************************** Student Update *********************************/
/****************************************************************************/
$scope.update_student = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8,field_9,field_10,field_11,field_12) 
	{
		window.location = "update_voter.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		$cookieStore.put("cook_field_9",field_9);
		$cookieStore.put("cook_field_10",field_10);
		$cookieStore.put("cook_field_11",field_11);
		$cookieStore.put("cook_field_12",field_12);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");
	$scope.cook_field_9 = $cookieStore.get("cook_field_9");
	$scope.cook_field_10 = $cookieStore.get("cook_field_10");
	$scope.cook_field_11 = $cookieStore.get("cook_field_11");
	$scope.cook_field_12 = $cookieStore.get("cook_field_12");

	$scope.save_voter = function() 
	{		
		$http.post('save_voter.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,'field_5':$scope.cook_field_5,
		'field_6':$scope.cook_field_6,'field_7':$scope.cook_field_7,'field_8':$scope.cook_field_8,
		'field_9':$scope.cook_field_9,'field_10':$scope.cook_field_10,'field_11':$scope.cook_field_11,
		'field_12':$scope.cook_field_12
		
		})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_voter.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

/****************************************************************************/
/************************** Placement Update *********************************/
/****************************************************************************/
$scope.update_place = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8) 
	{
		window.location = "update_placement.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		$cookieStore.put("cook_field_6",field_6);
		$cookieStore.put("cook_field_7",field_7);
		$cookieStore.put("cook_field_8",field_8);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");
	$scope.cook_field_6 = $cookieStore.get("cook_field_6");
	$scope.cook_field_7 = $cookieStore.get("cook_field_7");
	$scope.cook_field_8 = $cookieStore.get("cook_field_8");

	$scope.save_placement = function() 
	{		
		$http.post('save_placement.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,'field_5':$scope.cook_field_5,'field_6':$scope.cook_field_6,'field_7':$scope.cook_field_7,'field_8':$scope.cook_field_8})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "view_placement.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }


/****************************************************************************/
/************************** Sport Update *********************************/
/****************************************************************************/
$scope.update_sport = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8) 
	{
		window.location = "update_sport.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");

	$scope.save_sport = function() 
	{		
		$http.post('save_sport.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Update successfully");
				window.location = "view_sports.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

	
	
/****************************************************************************/
/************************** Cultural Update *********************************/
/****************************************************************************/
$scope.update_culture = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5,field_6,field_7,field_8) 
	{
		window.location = "update_cultural.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");

	$scope.save_cultural = function() 
	{		
		$http.post('save_cultural.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Update successfully");
				window.location = "view_cultural.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

	
	
/****************************************************************************/
/************************** Conference Update *********************************/
/****************************************************************************/
$scope.update_conference = function(cus_id,field_1,field_2,field_3,
								 field_4,field_5) 
	{
		window.location = "update_conference.html";
		$cookieStore.put("cook_cus_id",cus_id);
		$cookieStore.put("cook_field_1",field_1);
		$cookieStore.put("cook_field_2",field_2);
		$cookieStore.put("cook_field_3",field_3);
		$cookieStore.put("cook_field_4",field_4);
		$cookieStore.put("cook_field_5",field_5);
		return;
	}	
	
	$scope.cook_cus_id = $cookieStore.get("cook_cus_id");
	$scope.cook_field_1 = $cookieStore.get("cook_field_1");
	$scope.cook_field_2 = $cookieStore.get("cook_field_2");
	$scope.cook_field_3 = $cookieStore.get("cook_field_3");
	$scope.cook_field_4 = $cookieStore.get("cook_field_4");
	$scope.cook_field_5 = $cookieStore.get("cook_field_5");

	$scope.save_conference = function() 
	{		
		$http.post('save_conference.php',{
		'id':$scope.cook_cus_id,'field_1':$scope.cook_field_1,'field_2':$scope.cook_field_2,
		'field_3':$scope.cook_field_3,'field_4':$scope.cook_field_4,'field_5':$scope.cook_field_5})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Update successfully");
				window.location = "view_conference.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

	
	
/****************************************************************************/
/************************** User Update *********************************/
/****************************************************************************/
	
		$http.post('get_user_info.php',
		{
			'email':$scope.cook_admin_email
		})
		.success(function(data, status, headers, config) 
		{
				$scope.userdetails = data.details;
			   
          });
		  
		$http.post('get_voting.php',
		{
			'email':$scope.cook_user_email
		})
		.success(function(data, status, headers, config) 
		{
				$scope.ward_details = data.details;
         });
		  
$scope.user_update_info = function(name,password,mobile) 
	{
		window.location = "user_info_edit.html";
		$cookieStore.put("cook_name",name);
		$cookieStore.put("cook_password",password);
		$cookieStore.put("cook_mobile",mobile);
		return;
	}	
	
	$scope.cook_name = $cookieStore.get("cook_name");
	$scope.cook_password = $cookieStore.get("cook_password");
	$scope.cook_mobile = $cookieStore.get("cook_mobile");

	$scope.save_update_info = function() 
	{		
		$http.post('user_update_info.php',{
		 'name':$scope.cook_name, 'password':$scope.cook_password,
		 'mobile': $scope.cook_mobile, 'email': $scope.cook_admin_email})
		.success(function(data, status, headers, config) 
		{
			if(data.success == 1)
			{
				alert("Submited successfully");
				window.location = "user_update_info.html";
				return;				
			}
			else
			{
				alert("Invalid Inputs");
			}   
          });
     }

	
	
});