<?php
  include 'functions.loader.php';

  $app = new Slim();
// admin side
  $app->post('/add',function(){
    $question = $_POST['Question'];
    $choice1 =  $_POST['Choice1'];
    $choice2 =  $_POST['Choice2'];
    $choice3 =  $_POST['Choice3'];
    $choice4 =  $_POST['Choice4'];
    $answer =$_POST['Answer'];
    $category = $_POST['Category'];
    $subject =  $_POST['Subject'];
    $level =  $_POST['Level'];

    if(checkQuestion($question)) {
      echo json_encode(array('success' => 0));
      exit();
    }

    addQuestion($question, $choice1, $choice2, $choice3, $choice4, $answer, $category, $subject, $level);
    echo json_encode(array('success' => 1));
  });

  $app->get('/view',function(){
    $viewdata = view();
    foreach($viewdata as $view) {
      $info[] = array(
        "id" => $view->id,
        "question" => $view->question,
        "choice1" => $view->choice1,
        "choice2" => $view->choice2,
        "choice3" => $view->choice3,
        "choice4" => $view->choice4,
        "answer" => $view->answer,
        "category" => $view->category,
        "subject" => $view->subject,
        "level" => $view->level
      );
    }

      $response = array(
        "status" => 'success',
        "html" => $info
      );

      echo json_encode($response);              
    });

  $app->get('/getData',function(){

  $userID = $_GET['userID'];
  $data = getData($userID);

  $response = array(
    "id" => $data->id,
    "question" => $data->question,
    "choice1" => $data->choice1,
    "choice2" => $data->choice2,
    "choice3" => $data->choice3,
    "choice4" => $data->choice4,
    "answer" => $data->answer,
    "category" => $data->category,
    "subject" => $data->subject,
    "level" => $data->level
  );

  echo json_encode($response);
  });

  $app->post('/update',function(){
    $updateId = $_POST['UID'];
    $updateQuestion = $_POST['QQuestion'];
    $updatChoice1 = $_POST['QChoice1'];
    $updatChoice2 = $_POST['QChoice2'];
    $updatChoice3 = $_POST['QChoice3'];
    $updatChoice4 = $_POST['QChoice4'];
    $updateAnswer = $_POST['QAnswer'];
    $updateCategory = $_POST['QCategory'];
    $updateSubject = $_POST['QSubject'];
    $updateLevel = $_POST['QLevel'];

    if(checkUpdateQuestion($updateQuestion)) {
      echo json_encode(array('success' => 0));
      exit();
    }

    updateQuestion($updateId, $updateQuestion,  $updatChoice1, $updatChoice2, $updatChoice3, $updatChoice4, $updateAnswer, $updateCategory, $updateSubject, $updateLevel);
    echo json_encode(array('success' => 1));
  });

  $app->post('/delete',function(){
    $userID = $_POST['ID'];

    $user_delete = deleteUser($userID);

    if($user_delete){
      echo json_encode('Your record has been deleted.') ;
    }else{
      echo json_encode('Something went wrong.') ;
    }
  });

// user side
  $app->post('/addUser',function(){
    $firstname = $_POST['Firstname'];
    $lastname =  $_POST['Lastname'];
    $email =  $_POST['Email'];
    $birthdate =  $_POST['Birthdate'];
    $contact =  $_POST['Contact'];

    if(checkEmail($email)) {
      echo json_encode(array('success' => 0));
      exit();
    }

    insertUser($firstname, $lastname, $email, $birthdate, $contact);
    echo json_encode(array('success' => 1));
  });

    $app->get('/viewUser',function(){
    $viewdata = viewUser();
    foreach($viewdata as $view) {
      $info[] = array(
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
        "html" => $info
      );

      echo json_encode($response);              
    });


$app->run();