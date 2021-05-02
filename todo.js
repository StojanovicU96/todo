var todoItems = $("li");
var numOfTodos = $("#num-of-todos");

numOfTodos.html(todoItems.length);//update the number of todo-s

//drag and drop
$( function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
} );

function btnTxtColorToggle(button) {
  $(".sort-section-desk-info").find("p").css("color","hsl(233, 14%, 35%)");
  button.css("color","hsl(220, 98%, 61%)");
}

//delete all completed todos
$(".clear-btn").on("click", function() {
  $(".completedTodo").remove();
  numOfTodos.html($("li").length);
});

//btn for showing all todo-s
$(".all-btn").on("click", function() {
  btnTxtColorToggle($(this));
  $("li").show();
});

//btn for showing only active todo-s
$(".active-btn").on("click",function() {
  btnTxtColorToggle($(this));
  $("li").show();
  $(".completedTodo").hide();
});

//btn for showing only completed todo-s
$(".completed-btn").on("click",function() {
  btnTxtColorToggle($(this));
  $("li").hide();
  $(".completedTodo").show();
  numOfTodos.html($("li").length);
});

//cross,grey out and check selected todo
$("ul").on("click","li",function() {
  $(this).toggleClass("completedTodo");
  $(this).find("p").toggleClass("completedTodoText");

  if($(this).find("input").prop("checked")){
    $(this).find("input").prop("checked", false);
  }else{
    $(this).find("input").prop("checked", true);
  }
});

//delete todo
$("ul").on("click","img", function(e) {
  $(this).parentsUntil("li").parent().remove();
  numOfTodos.html($("li").length);
  e.stopPropagation();
});

//add new todo depending on which mode is curently on
$('[type=text]').keypress(function(event) {
  if(!($(this).val()==="")){
    if(event.which === 13){
      if($("#change-img").attr("src") === "images/icon-sun.svg"){
        //add for dark mode
        $("ul").append("<li class='todo-item dark-form-check'>"+
                          "<div class='row'>"+
                              "<div class='col-auto mr-auto'>"+
                                  "<input type='checkbox' disabled='true' id='6'>"+
                                  "<label for='6'></label>"+
                                  "<p class='dark-todo-item-description'>"+$(this).val()+"</p>"+
                                "</div>"+
                                "<div class='col-auto'>"+
                                  "<img class='cross-img' src='images/icon-cross.svg' alt=''>"+
                              "</div>"+
                            "</div>"+
                          "</li>");
      }else{
        //add for light mode
        $("ul").append("<li class='todo-item  dark-form-check light-form-check'>"+
                          "<div class='row'>"+
                              "<div class='col-auto mr-auto'>"+
                                  "<input type='checkbox' disabled='true' id='6' class='light-new-todo'>"+
                                  "<label for='6'></label>"+
                                  "<p class='dark-todo-item-description light-todo-item-description'>"+$(this).val()+"</p>"+
                                "</div>"+
                                "<div class='col-auto'>"+
                                  "<img class='cross-img' src='images/icon-cross.svg' alt=''>"+
                              "</div>"+
                            "</div>"+
                          "</li>");
      }
      $(this).val('');
    }
  }
  numOfTodos.html($("li").length);
});

$("ul").on("mouseenter","li",function(e) {
  $(this).find("label").css("border-color", "hsl(280, 87%, 65%)");
  e.stopPropagation();
});

$("ul").on("mouseleave","li",function(e) {
  $(this).find("label").css("border-color", "hsl(234, 11%, 52%)");
  e.stopPropagation();
});

//theme setting
$("#change-img").on("click", function() {
  if($(this).attr("src") === "images/icon-sun.svg"){
    $(this).attr("src","images/icon-moon.svg");
  }else{
    $(this).attr("src","images/icon-sun.svg");
  }
  $("body").toggleClass("body-light");
  $("#new-todo-section").toggleClass("light-new-todo-section");
  $("input").toggleClass("light-new-todo");
  $(".dark-form-check").toggleClass("light-form-check");
  $(".dark-todo-section").toggleClass("light-todo-section");
  $(".dark-todo-item-description").toggleClass("light-todo-item-description");
  $(".dark-sort-section-mob").toggleClass("light-sort-section-mob");
  $(".btnHover").toggleClass("lightBtnHover");
});
