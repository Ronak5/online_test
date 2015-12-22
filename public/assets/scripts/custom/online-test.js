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




          $("#save_answer_btn").click(function(){
            if (!$("input[name='optionsRadios']:checked").val()) {
              bootbox.alert('Nothing is selected , first select answer to save !');
              return false;
            }
            else
            {
              save_answer_and_move_next();
            }
          })

          var save_answer_and_move_next = function(){
            var user_id = $("#current_user").attr('data_user_id');
            var question_id = $("#question_caption").attr('data_question_id');
            var option_id =$('input[name=optionsRadios]:checked').attr("data_option_id");
            var input_data = {user_id : user_id,question_id : question_id , option_id : option_id};
            $.ajax({
              url : "/results",
              type: "POST",
              format: "JSON",
              data: {authenticity_token:AUTH_TOKEN, result:input_data},
              success: function(data, textStatus, jqXHR)
              {
                $.gritter.add({
                  position: 'top-right',
                  title: 'Success!',
                  text: 'Answer submitted successfully !',
                  sticky: false,
                  time: 4000
                });
              },
              error: function (jqXHR, textStatus, errorThrown)
              {
                $.gritter.add({
                  position: 'top-right',
                  title: 'Something went wrong!',
                  text: 'Answer could not be added !',
                  sticky: false,
                  time: 4000
                });
              }
            });
            fetch_question();
          }

          $("#next_question_btn").click(function(){
            fetch_question();
          })

          $("#start_test_button").click(function(){
            bootbox.confirm("As soon as you click on OK , your time will start <br/> <ol><li>Try to attempt as many question as you can.</li><li>You have 30 Minutes.</li><li>Your Form will be locked & you will be loged out after 30mins automatically.</li><li>No negative marking.</li><li>Click SAVE to submit your answer & move next</li><li>Click NEXT if you DONT want to save your answer & move next.</li><li>Click SUBMIT if you are done before time gets over.</li><li>Dont play around login/logout , its ONE TIME LOGIN</li></ol><b style='color: red'>Note : Do not open any other tab or search in other window your test will be auto submitted & session will be expired.</b>", function (result) {
              if (result == true) {
                  show_question_screen();
                  fetch_question();
                  start_timer();
                }
            });
          });

          var fetch_question  = function(){
            $.ajax({
              url : "/questions/get_random_question",
              type: "GET",
              format: "JSON",
              success: function(data, textStatus, jqXHR)
              {
                $("#question_caption").html(data.description);
                $("#question_caption").attr("data_question_id",data.id);

                jQuery.each(data.get_options, function(index, item) {
                  console.log(index)
                  var x = index+1
                  $("#option_desc_"+x).html(item.description);
                  $("#optionsRadios"+x).attr("data_option_id",item.id);
                  console.log(item)

                  // do something with `item` (or `this` is also `item` if you like)
                });

              },
              error: function (jqXHR, textStatus, errorThrown)
              {

              }
            });
          }

          var show_question_screen = function(){
            $("#welcome_screen").hide();
            $("#question_container_screen").show();
          }


          var start_timer = function(){
            var counter = 30;
            $("#timer_container").html(counter);
            var interval = setInterval(function() {
              counter--;
              // Display 'counter' wherever you want to display it.
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