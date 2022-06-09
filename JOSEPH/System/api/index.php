<?php
  include 'functions.loader.php';

  $app = new Slim();
// admin side

//category
  $app->post('/addCategory',function(){
    $uid = $_POST['UID'];
    $course =  $_POST['Course'];
    $subject = $_POST['Subject'];
    $str = str_pad($uid,4,0,STR_PAD_LEFT);

    addCategory($str, $course, $subject);
    echo json_encode(array('success' => 0));
  });

  $app->get('/viewCategory',function(){

    $viewcategory = viewCategory();
    
    foreach($viewcategory as $view) {
      $category[] = array(
        "id" => $view->id,
        "uid" => $view->uid,
        "course" => $view->course,
        "subject" => $view->subject
      );
    }
    $response = array(
      "status" => 'success',
      "html" => $category
    );

    echo json_encode($response);              
  });

  $app->get('/getCategory',function(){

    $categoryID = $_GET['categoryID'];
    $data = getCategory($categoryID);

    $response = array(
      "id" => $data->id,
      "course" => $data->course,
      "subject" => $data->subject
    );

    echo json_encode($response);
  });

  $app->post('/updateCategory',function(){

    $updateID = $_POST['CID'];
    $updateCourse = $_POST['CCourse'];
    $updateSubject = $_POST['CSubject'];

    updateCategory($updateID, $updateCourse, $updateSubject);
    echo json_encode(array('success' => 0));
  });

  $app->post('/deleteCategory',function(){
    $categoryID = $_POST['categoryID'];

    $deleteCategory = deleteCategory($categoryID);

    if($deleteCategory){
      echo json_encode('Record has been deleted.') ;
    }else{
      echo json_encode('Something went wrong.') ;
    }
  });


// exam
  $app->get('/viewCourse',function(){
    
    $viewCourse = viewCourse();
    foreach($viewCourse as $view) {
      $courses[] = array(
        "course" => $view->course
      );
    }
    $response = array(
      "status" => 'success',
      "html" => $courses
    );

    echo json_encode($response);  
  });

  $app->get('/viewSubject',function(){
    
    // $course = $_GET['Course'];
    $data = viewSubject();

    foreach($data as $view) {
      $subjects[] = array(
        "id" => $view->id,
        "course" => $view->course,
        "subject" => $view->subject
      );
    }

    $response = array(
      "status" => 'success',
      "html" => $subjects
    );

    echo json_encode($response);  
  });

  $app->post('/addExam',function(){
    $exam_id =  $_POST['Exam_ID'];
    $exam_key = $_POST['Exam_Key'];
    $exam_value =  $_POST['Exam_Value'];
    $exam_level =  $_POST['Exam_Level'];

    addExam($exam_id, $exam_key, $exam_value, $exam_level);
    echo json_encode(array('success' => 0));
  });

  $app->post('/examID',function(){
    $id =  $_POST['id'];
    $exam_key = $_POST['Exam_Key'];

    if(checkExamKey($exam_key)) {
    echo json_encode(array('success' => 1));
    exit();
    }

    examID($exam_id, $exam_key, $exam_value, $exam_level);
    echo json_encode(array('success' => 0));
  });

  $app->get('/viewExam',function(){
    $viewexam = viewExam();
    foreach($viewexam as $view) {
      $exam[] = array(
        "id" => $view->id,
        "exam_id" => $view->exam_id,
        "exam_key" => $view->exam_key,
        "exam_value" => $view->exam_value,
        "exam_level" => $view->exam_level
      );
    }
    $response = array(
      "status" => 'success',
      "html" => $exam
    );

    echo json_encode($response);              
  });

  $app->get('/getExam',function(){

    $examID = $_GET['examID'];
    $data = getExam($examID);

    $response = array(
      "id" => $data->id,
      "exam_id" => $data->exam_id,
      "exam_key" => $data->exam_key,
      "exam_value" => $data->exam_value,
      "exam_level" => $data->exam_level
    );

    echo json_encode($response);
  });

  $app->post('/updateExam',function(){
    $updateId = $_POST['EID'];
    $updateExam_ID = $_POST['EExam_ID'];
    $updateExam_Key = $_POST['EExam_Key'];
    $updateExam_Value = $_POST['EExam_Value'];
    $updateExam_Level = $_POST['EExam_Level'];

    updateExam($updateId, $updateExam_ID, $updateExam_Key, $updateExam_Value, $updateExam_Level);
    echo json_encode(array('success' => 1));
  });

  $app->post('/deleteExam',function(){
    $examID = $_POST['ID'];

    $question_delete = deleteQuestion($examID);

    if($question_delete){
      echo json_encode('Your record has been deleted.') ;
    }else{
      echo json_encode('Something went wrong.') ;
    }
  });

  $app->get('/showQuestion',function(){

    $data = showQuestion();

    $response = array(
      "id" => $data->id,
      "question" => $data->choice4,
      "choice1" => $data->choice1,
      "choice2" => $data->choice2,
      "choice3" => $data->choice3,
      "choice4" => $data->choice4
    );

    echo json_encode($response);
  });

  $app->get('/viewRanking',function(){
    
    $viewRanking = viewRanking();
    foreach($viewRanking as $view) {
      $ranking[] = array(
        "id" => $view->id,
        "firstname" => $view->firstname,
        "lastname" => $view->lastname,
        "course" => $view->course,
        "subject" => $view->subject,
        "score" => $view->score
      );
    }

    $response = array(
      "status" => 'success',
      "html" => $ranking
    );

    echo json_encode($response);              
  });

  $app->get('/viewUser',function(){
    $viewdata = viewUser();
    foreach($viewdata as $view) {
      $userData[] = array(
        "id" => $view->id,
        "firstname" => $view->firstname,
        "lastname" => $view->lastname,
        "email" => $view->email,
        "birthdate" => $view->birthdate,
        "contact" => $view->contact
      );
    }
    $response = array(
      "status" => 'success',
      "html" => $userData
    );

    echo json_encode($response);              
  });


// user side
  $app->post('/addUser',function(){
    $firstname = $_POST['Firstname'];
    $lastname =  $_POST['Lastname'];
    $email =  $_POST['Email'];
    $birthdate =  $_POST['Birthdate'];
    $contact =  $_POST['Contact'];

    insertUser($firstname, $lastname, $email, $birthdate, $contact);
    echo json_encode(array('success' => 0));
  });

$app->run();