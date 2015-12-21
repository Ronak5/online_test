var OnlineTest = function () {

    return {
        //main function to initiate the module
        init: function () {
          $("#question_container_screen").hide();
            var getParams = function() {
                var params = {},
                    pairs = document.URL.split('?')
                        .pop()
                        .split('&');

                for (var i = 0, p; i < pairs.length; i++) {
                    p = pairs[i].split('=');
                    params[ p[0] ] =  p[1];
                }
                return params;
            }

            var params = getParams();
//            var role = unescape(params["role"]);
//            if (role == 'admin') {
//                $('.admin-panel').removeClass("hidden");
//                $('.exam-panel').addClass("hidden");
//            }
//            else {
                $('.exam-panel').removeClass("hidden");
                $('.admin-panel').addClass("hidden");
//            }

            // save question for student

            $('#save_answer').click(function() {
                var question_id = $('.test-question').val();
                //var option_id = $('.add-question').val();
            });

            var answer = function() {
                var params = getParams();
                var auth_token = unescape(params["token"]);
                console.log(auth_token);
                $.ajax({
                    url: '',
                    type: "POST",
                    headers : {
                        'Authorization' : auth_token
                    },
                    success: function (data) {

                    },
                    complete: function () {

                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
            }


          $("#start_test_button").click(function(){
            bootbox.confirm("As soon as you click on OK , your time will start <br/> <ol><li>No negative marking</li><li>Time durartion is 30mins</li><li>Total 45 questions</li></ol><b style='color: red'>Note : Do not open any other tab or search in other window your test will be auto submitted & session will be expired.</b>", function (result) {
              if (result == true) {
                  show_question_screen();
                  start_timer();
                }
            });
          });

          var show_question_screen = function(){
            $("#welcome_screen").hide();
            $("#question_container_screen").show();
            start_timer();
          }


          var start_timer = function(){
            console.log("timer")
            var counter = 30;
            $("#timer_container").html(counter);
            var interval = setInterval(function() {
              console.log("yes")
              counter--;
              // Display 'counter' wherever you want to display it.
              console.log(counter)
              $("#timer_container").html(counter);

              if (counter > 20) {
                $(".timer_body").removeClass('bg-danger')
                $(".timer_body").removeClass('bg-warning')
                $(".timer_body").addClass('bg-success')
              }else if(counter > 10){
                $(".timer_body").removeClass('bg-danger')
                $(".timer_body").addClass('bg-warning')
                $(".timer_body").removeClass('bg-success')
              }else if(counter > 5){
                $(".timer_body").addClass('bg-danger')
                $(".timer_body").removeClass('bg-warning')
                $(".timer_body").removeClass('bg-success')
              }

              if (counter == 0) {
                // Display a login box
                clearInterval(interval);
              }
            }, 60000);
          }

        }

    };

}();