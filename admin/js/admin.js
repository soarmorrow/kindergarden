/* 
 Document   : admin
 Created on : 2 Dec, 2013, 11:13:11 PM
 Author     : Vineeth Krishnan (me@vineethkrisknan.in)
 */
$(document).ready(function() {
    $("#hide-nav").on('click', function(evt) {
        if ($(this).closest('ul').css('left') === "225px") {
            $("#wrapper").stop().animate({'padding-left': '30px'}, 400, "easeInOutQuint");
            $(".side-nav").stop().animate({
                left: '40px'
            }, 400, "easeInOutQuint", function() {
                $("#hide-nav .direction-arrow").stop().animate({right: "-90px"}, 1500, "easeInOutElastic", function() {
                    $(this).removeClass('fa-angle-double-left').addClass("fa-angle-double-right");
                });
            });
        }
        else {
            $("#wrapper").stop().animate({'padding-left': '225px'}, 400, "easeInOutQuint");
            $(".side-nav").stop().animate({
                left: '225px'
            }, 400, "easeInOutQuint", function() {
                $("#hide-nav .direction-arrow").stop().animate({right: "0"}, 1500, "easeInOutElastic", function() {
                    $(this).removeClass('fa-angle-double-right').addClass("fa-angle-double-left");
                });
            });
        }
        evt.preventDefault();
    });
    $(".download-pdf,.view-pdf").tooltip({
        'placement': 'top'
    });
    $("#student-details-table, #payment-details-table").dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "aLengthMenu": [5, 10, 15, 20, 50, 100]
    });
    $(".sid-manage").dataTable({"bJQueryUI": true});
    $("#DataTables_Table_0_wrapper .ui-toolbar.ui-widget-header.ui-corner-tl.ui-corner-tr").append("<div style='text-align:center;position:relative;>Generated Student IDs</div>").show();
    $("#show-email-input").on('click', function(e) {
        $(this).fadeOut();
        $("#old-email").fadeOut(function() {
            $('#email, #button-mail').fadeIn();
        });
        e.preventDefault();
    });
    $("#show-pwd-input").on('click', function(e) {
        $(this).fadeOut();
        $("#old-password").fadeOut(function() {
            $('#retypepwd, #password').fadeIn();
        });
        e.preventDefault();
    });
    $("#cancel-email").on('click', function(e) {
        $("#email-response").fadeOut();
        $("#email, #button-mail").fadeOut(function() {
            $('#old-email,#show-email-input').fadeIn();
        });
        e.preventDefault();
    });
    $("#cancel-password").on('click', function(e) {
        $("#password-response").fadeOut();
        $("#retypepwd, #password").fadeOut(function() {
            $("#old-password, #show-pwd-input").fadeIn();
        });
        e.preventDefault();
    });
    $("#form-settings input[id='email']").on('focus', function() {
        $("#email-response").slideUp();
    });
    $("#form-settings input[id='password'],#form-settings input[id='re-password']").on('focus', function() {
        $("#password-response").slideUp();
    });
    $("#save-email").on('click', function(e) {
        $email = $("#email").val();
        if ($email === "") {
            $("#email-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Empty email !!</strong></div>").hide().slideDown();
            return false;
        }
        $.ajax({
            'url': "changeSettings.php",
            'type': 'POST',
            'data': {'email': $email},
            success: function(response) {
                if (response === "invalid email") {
                    $("#email-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Oops!!</strong> Use a valid email</div>").hide().slideDown();
                }
                if (response === "old email") {
                    $("#email-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;<i>" + $email + "</i></strong> is your old address</div>").hide().slideDown();
                    $("#email").val("");
                }
                if (response === "session expired") {
                    $("#email-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> Session Expired</strong>&nbsp;<br />Please re-login to change password</div>").hide().slideDown();
                    setTimeout(function(){window.location.href = "/register.html";}, 2500);
                }
                if (response === "email changed") {
                    $("#email-response").empty().append("<div class='alert alert-success'><strong><i class='fa fa-check-circle'> </i> &nbsp;New email saved</strong></div>").hide().slideDown();
                    setTimeout(function() {
                        window.location.href = "/admin";
                    }, 750);
                }
            },
            error: function(response) {
                $("#email-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Something went wrong!!</strong> <br />Server is currently unreachable check your network connection and try again later.<br/>Error Response : " + response + "</div>").hide().slideDown();
            }
        });
    });
    $("#save-password").on('click', function(e) {
        $password = $("#password").val();
        $repassword = $("#re-password").val();
        if ($password === "") {
            $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Empty password !!</strong></div>").hide().slideDown();
            return false;
        }
        if ($password !== "" && $repassword === "") {
            $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> </strong>&nbsp;Forgot to confirm password?</div>").hide().slideDown();
            return false;
        }
        if ($password.length < 6) {
            $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;weak password</strong> <br />(use minimum 6 charactors)</div>").hide().slideDown();
            return false;
        }
        if ($password !== $repassword) {
            $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> </strong>&nbsp;Password not matching!</div>").hide().slideDown();
            return false;
        }
        $.ajax({
            'url': "changeSettings.php",
            'type': 'POST',
            'data': {'password': $password, 're-password': $repassword},
            success: function(response) {
                if (response === "too small") {
                    $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;weak password</strong> <br />(use minimum 6 charactors)</div>").hide().slideDown();
                }
                if (response === "mismatch") {
                    $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> </strong>&nbsp;Password not matching!</div>").hide().slideDown();
                }
                if (response === "password error") {
                    $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Something went wrong!</strong><br />try change password again</div>").hide().slideDown();
                }
                if (response === "session expired") {
                    $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> Session Expired</strong>&nbsp;<br />Please re-login to change password</div>").hide().slideDown();
                    setTimeout(function(){window.location.href = "/register.html";}, 2500);
                }
                if (response === "password changed") {
                    $("#password-response").empty().append("<div class='alert alert-success'><strong><i class='fa fa-check-circle'> </i> &nbsp;Password changed</strong></div>").hide().slideDown();
                    setTimeout(function() {
                        window.location.href = "/admin";
                    }, 750);
                }
            },
            error: function(response) {
                $("#password-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'> </i> &nbsp;Something went wrong!!</strong> <br />Server is currently unreachable check your network connection and try again later.<br/>Error Response : " + response + "</div>").hide().slideDown();
            }
        });
    });
    $("#save-sid").on('click', function(evt) {
        $(this).addClass('disabled').text("Saving.....").prepend('<i class="fa fa-spinner"> </i> &nbsp;');
        $sid = $("#student-id").val();
        $center = $("#sid-update select[name='center'] option:selected").val();
        if (typeof $sid === 'undefined' || $sid === "") {
                $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-times'></i>&nbsp;Student ID can't be empty.</strong></div>").hide().slideDown('slow');
                $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
                shake("#student-id");
            return false;
        }
        if (!$sid.match(/^[0-9a-zA-Z#$&\-_\*]+$/)) {
            $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-times'></i>&nbsp;Student ID expect alpha-neumeric value.<br />Allowded special charactos are #&nbsp; ,&nbsp; $&nbsp; ,&nbsp; &amp; &nbsp;,&nbsp; -&nbsp; ,&nbsp; _&nbsp; ,&nbsp; *&nbsp; </strong></div>").hide().slideDown('slow');
            $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
            shake("#student-id");
            return false;
        }
        if (typeof $center === 'undefined' || $center === '') {
            $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-times'></i>&nbsp;Forgot to select center ?</strong></div>").hide().slideDown('slow');
            $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
            shake("#center");
            return false;
        }
        $.post("changeSettings.php", $("#sid-update").serialize()).done(function(data) {
            if (data === "error") {
                $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'></i>&nbsp;Something went wrong.</strong>&nbsp;Database not updated.</div>").hide().slideDown('slow');
                $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
            }
            if (data === "exists") {
                $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'></i>&nbsp;Oops !</strong>&nbsp;Password is already exists.</div>").hide().slideDown('slow');
                $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
            }
            if(data === "session expired"){
                $("#sid-response").empty().append("<div class='alert alert-danger'><strong><i class='fa fa-warning'></i>&nbsp;Session expired! </strong>&nbsp; You need to relogin to add Student ID.</div>").hide().slideDown('slow');
                $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
                setTimeout(function(){window.location.href = "/register.html";},2500);
            }
            if (data === 'sid updated') {
                $("#sid-response").empty().append("<div class='alert alert-success'><strong><i class='fa fa-check'></i>&nbsp;New Student ID Saved.</strong></div>").hide().slideDown('slow');
                $("#save-sid").removeClass('disabled').text("Save").prepend('<i class="fa fa-save"> </i> &nbsp;');
                setTimeout(function(){window.location.reload()}, 1000);
            }
        });
        evt.preventDefault();
    });
    function shake(selector) {
        $(selector).stop().animate({'margin-left': '-30px'}, 50, "swing", function() {
            $(this).css({'border-color': '#ff0000', 'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(255, 0, 0, 0.6)', 'outline': '0 none'});
            $(this).stop().animate({'margin-left': '30px'}, 50, "swing", function() {
                $(this).stop().animate({'margin-left': '0px'}, 50, "swing");
            });
        });
    }
    $("#sid-update input[id='student-id'], #sid-update select[name='center']").on('focus', function() {
        $(this).css({'border-color': '#66AFE9', 'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6)', 'outline': '0 none'});
        $("#sid-response").slideUp();
    });
    $("button[class*='delSid']").on('click', function() {
        $.post('changeSettings.php', {'delSid': $(this).data('id')}).done(function(data) {
            if (data === "deleted") {
                window.location.reload();
            } else {
                alert('Something wrong happened database query.\n Response : ' + data);
            }
        }).fail(function(data) {
            alert('operation failed\nResponse : ' + data);
        });
    });
});