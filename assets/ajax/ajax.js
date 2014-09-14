/* 
    Document   : ajax
    Created on : 27 Nov, 2013, 12:11:19 PM
    Author     : Vineeth Krishnan (me@vineethkrisknan.in)
*/
jQuery(document).ready(function() {
    $("#tc_dob").datepicker({
        showAnim: "slideDown",
        autoSize: true,
        showOn: "both",
        buttonImage: "assets/registration/images/calendar.png",
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
        navigationAsDateFormat: true,
        yearRange: "2000:2014"
    });
    //$("#tc_registration").validate();
    $("#tc_name").tooltip({
        pplacement: 'top',
        title: "Name should be in block letters"
    });
    $("#tc_cn").tooltip({
        pplacement: 'top',
        title: "This field is optional."
    });
    $("#tc_name").on('keyup', function() {
        $(this).val($(this).val().toUpperCase());
    });
    
    $ssize = 0;
    var $data;
    $("#saveForm").on("click", function(e) {
        if (checkEmpty()) {
            $("#error-status .error-data").append($errorData);
            $("#error-response").slideDown(1000);
        } else {
            $("#dialog-confirm").dialog({
                resizable: false,
                height: 250,
                width: 650,
                modal: true,
                open: function  open(event, ui) {
                    $(".ui-dialog-buttonset button").addClass("btn btn-default").html("<i class='fa fa-refresh'></i> Recheck");
                    $(".ui-dialog-buttonset button:first-child").html("<i class='fa fa-edit'></i> Submit");
                });
	}
   });
    $("#forgot").on('click', function(e) {
        $(".password-field").fadeOut();
        $admin = $("#adminname").val();
        $("#login").attr('disabled', true);
        if ($admin === "") {
            $("[aria-labelledby='admin-login']").addClass('logged-in');
            $("#response").empty().append("<div class='alert alert-error'><i class='fa fa-exclamation-circle'></i> Enter an admin name or registered email to recover your password</div>").hide().slideDown();
            return false;
        }
        $.ajax({
            'url': 'assets/ajax/passwordRecovery.php',
            'type': 'POST',
            'data': {'admin': $admin},
            success: function(response) {
                $loggedin = response.slice(0, 13);
                if ($loggedin === "logged in as ") {
                    $user = response.slice($loggedin.length, response.length);
                    $("[aria-labelledby='admin-login']").addClass('logged-in');
                    $("#response").empty().append("<div class='alert alert-success'><i class='fa fa-user'></i> You are already logged in as <strong>" + $user + "</strong><br /><button type='button' class='btn btn-small btn-success' onclick='window.location.href= \"admin\"'><i class='fa fa-dashboard'> </i> &nbsp;" + $user + " Dashboard</button></div>").hide().slideDown();
                    $("#admin-login-section").fadeOut(900, function() {
                        $(this).remove();
                    });
                }
                if (response === "invalid admin") {
                    $("[aria-labelledby='admin-login']").addClass('logged-in');
                    $("#response").empty().append("<div class='alert alert-error'><strong><i class='fa fa-exclamation-circle'></i> " + $admin + "</strong> is not registered.</div>").hide().slideDown();
                    $("#adminname").val("");
                }
                if (response === "request error") {
                    $("[aria-labelledby='admin-login']").addClass('logged-in');
                    $("#response").empty().append("<div class='alert alert-error'><strong><i class='fa fa-exclamation-circle'></i></strong>Error occured while processing request.<br />Try later. .</div>").hide().slideDown();
                }
                if (response === "request granted") {
                    $("[aria-labelledby='admin-login']").addClass('logged-in');
                    $("#response").empty().append("<div class='alert alert-success'><strong><i class='fa fa-check-circle'> </i> &nbsp;Reset link emailed</strong></div>").hide().slideDown();
                    $(".password-field").fadeIn();
                    $("#login").attr('disabled', false);
                }
            },
            error: function(response) {
                $("#response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Something went wrong!!</strong> <br />Server is currently unreachable check your network connection and try again later.<br/>Error Response : " + response + "</div>").hide().slideDown();
            }
        });
        e.preventDefault();
    });
});

