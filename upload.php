<?php
$target_dir = "";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$excelFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if excel file is a actual excel or fake excel
if(isset($_POST["submit"])) {
        $uploadOk = 1;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($excelFileType != "xlsx" && $excelFileType != "xls") {
    echo "Sorry, only XLSX,XLS files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		header('Location: product_import.php');
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

				  
?>