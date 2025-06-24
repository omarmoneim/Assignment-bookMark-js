//? Global variables
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var books = [];

if (localStorage.getItem("bookmarker")) {
  var books = JSON.parse(localStorage.getItem("bookmarker"));
  displayData();
}

//* create level (ADD LEVEL)
function createBook() {
  if (validateName() && validateUrl()) {
  
    if(isExisted() == true){    
    
      var bookMark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    books.push(bookMark);
    localStorage.setItem("bookmarker", JSON.stringify(books));
    displayData();
    console.log(books);
    emptyData();


    }
    else{
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Data Is Already Existed!",
});
    }

    }

  }

// check is existed 
function isExisted(){
    for(var i = 0; i < books.length ;i++ ){
      if(siteName.value == books[i].name || siteUrl.value == books[i].url){
        
        
        return false;
      }
    }
    return true;
  }

  //~ empty data after filling
function emptyData() {
  siteName.value = null;
  siteUrl.value = null;
}
//& display Data
function displayData() {
  var dataContainer = "";
  for (var i = 0; i < books.length; i++) {
    dataContainer += ` 
          <tr>
              <th scope="row">${i + 1}</th>

              <td>${books[i].name}</td>

              <td>
               <a href="${books[i].url}" target="_blank">
                  <button class="btn btn-success">
                    <i class="fa-solid fa-eye"></i> Visit
                  </button>
              </a>
              </td>

              <td>
                <button onclick="deleteData(${i})" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
        `;
  }
  document.getElementById("information").innerHTML = dataContainer;
}
//! delete level
function deleteData(index) {
  books.splice(index, 1);
  localStorage.setItem("bookmarker", JSON.stringify(books));
  displayData();
}
//* validation
function validateName() {
  var msgName = document.getElementById("namemsg");
  var regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,17}$/;
  var text = siteName.value;
  if (regex.test(text)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
        msgName.classList.remove("d-none");
    return false;
  }
}
function validateUrl() {
    var msgUrl = document.getElementById("urlmsg");
    var regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  var text = siteUrl.value;
  if (regex.test(text)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    msgUrl.classList.add("d-none")
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    msgUrl.classList.remove("d-none")
    return false;
  }
}
