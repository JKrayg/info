// localStorage.clear()


if (!localStorage.getItem("visit-status")) {
  localStorage.setItem("visit-status", "false");
}


$("#save-visit").on("click", function (event) {
  event.preventDefault();

  if (localStorage.getItem("visit-status") == "false") {
    localStorage.setItem("count", Number(localStorage.getItem("count")) + 1);
    localStorage.setItem("visit-status", "true");
  } else {
    this.disabled = true;
    this.value = "thank you";
  }

  // display count
  $("#visitors").text(localStorage.getItem("count"));

});


// by default display count
$("#visitors").text(localStorage.getItem("count"));