<?php
 include('db/db_conn.php');

 $db=$conn;
// fetch query
function fetch_data($db){

  $query="SELECT * from users";
  $results=mysqli_query($db, $query);
  if(mysqli_num_rows($results)>0){
    $row= mysqli_fetch_all($results, MYSQLI_ASSOC);
    return $row;
  }else{
    echo '<script>alert("No users database.")</script>';
    return $row=[];
  }
}
$fetchData=fetch_data($db);
show_data($fetchData);

function show_data($fetchData){
 echo '<table class="table table-bordered table-hover table-striped table-light">
        <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Age</th>
            <th>Birthdate</th>
            <th>Contact</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>';

foreach($fetchData as $data){

  echo '<tr>
          <td>'.$data['id'].'</td>
          <td>'.$data['firstname'].'</td>
          <td>'.$data['lastname'].'</td>
          <td>'.$data['username'].'</td>
          <td>'.$data['email'].'</td>
          <td>'.$data['password'].'</td>
          <td>'.$data['age'].'</td>
          <td>'.$data['birthdate'].'</td>
          <td>'.$data['contact'].'</td>
          <td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#Edit" id="btnEdit" data-id ='.$data['id'].'><span>EDIT</span></button></td>
          <th scope="col"><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Delete" id="btnDelete" data-id2 ='.$data['id'].'><span>Delete</span></button></th>
   </tr>';
    }
}
  echo "</table>";