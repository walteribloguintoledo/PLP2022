<?php
 include('db/db_conn.php');

  $value="";
  $value='<table class="table table-striped table-dark">
          <thead>
          <tr>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Lastname</th>
              <th scope="col">Firstname</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
          </tr>
          </thead>';
  $query = "SELECT * FROM users";
  $results = mysqli_query($conn,$query);

  while($row=mysqli_fetch_assoc($results)){
    $value.='<tr>
              <th scope="col">'.$row['id'].'</th>
              <th scope="col">'.$row['email'].'</th>
              <th scope="col">'.$row['lastname'].'</th>
              <th scope="col">'.$row['firstname'].'</th>
              <th scope="col">'.$row['age'].'</th>
              <th scope="col">'.$row['address'].'</th>
              <th scope="col"><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Edit" id="btnEdit" data-id ='.$row['id'].'><span>EDIT</span></button></th>
              <th scope="col"><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Delete" id="btnDelete" data-id2 ='.$row['id'].'><span>Delete</span></button></th>
            </tr>';         
  }
    $value.='</table>';
    echo json_encode(['status'=>'success','html'=>$value]);