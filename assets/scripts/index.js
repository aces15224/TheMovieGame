$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

// Authorization Modals

$(".signUp").on("click", function(){
    $("#modal-signup").modal("toggle")
})
$(".login").on("click", function(){
    $("#modal-login").modal("toggle")
})
$("#logout").on("click", function(){
    $("#modal-signup").modal("toggle")
})
$(".account").on("click", function(){
    $("#account-modal").modal("toggle")
})