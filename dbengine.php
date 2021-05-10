<?php

  include("server.php");
  
  $dblocation;
  $dbuser;
  $dbpassword;
  
  $error = $_SESSION["error"];
  
  $blog = mysqli_connect($dblocation,$dbuser,$dbpassword,"blog");
  $course = mysqli_connect($dblocation,$dbuser,$dbpassword,"course");
  $video = mysqli_connect($dblocation,$dbuser,$dbpassword,"video");
  $blog_req = mysqli_connect($dblocation,$dbuser,$dbpassword,"blog-req");
  $course_req = mysqli_connect($dblocation,$dbuser,$dbpassword,"course-req");
  $video_req = mysqli_connect($dblocation,$dbuser,$dbpassword,"video-req");
  $image = mysqli_connect($dblocation,$dbuser,$dbpassword,"image");
  
  function blog(){
    $data = mysqli_query($blog,"SELECT * FROM blog");
    return $data;
  }
  
  function course(){
    $data = mysqli_query($course,"SELECT * FROM course");
    return $data;
  }
  
  function video($course,$courseindex){
    $data = mysqli_query($video,"SELECT * FROM video WHERE course = '$course' AND courseindex = '$courseindex'");
    if (mysqli_num_rows($data) > 0) {
      $row = mysqli_fetch_assoc($result);
      return $row;
    } else {
      return 0;
    }
  }
  
  function add_image($title,$location){
    $data = mysqli_query($image,"SELECT from image WHERE title = '$title' OR location = '$location'");
    if(mysqli_num_rows($data)>0){
      return "alredy exists";
    }
    mysqli_query($image,"INSERT INTO image (title,location) VALUE ('$title','$location')");
    return $title;
  }
  
  function add_blog($title,$author,$content,$image_name,$location){
    $data = mysqli_query($blog,"SELECT from blog WHERE title = '$title' OR content = '$content'");
    if(mysqli_num_rows($data)>0){
      array_push($error,"blog alredy exixts");
      header("location : error.php");
    }
    $i = add_image($image_name,$location);
    mysqli_query($blog,"INSERT INTO blog (title,author,content,image) VALUE ('$title','$author','$content','$i')");
  }
  
  
?>