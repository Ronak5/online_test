var OnlineTest = function () {

    return {
        //main function to initiate the module
        init: function () {
          var question_attempted = 0;
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

          var show_alert_and_logout = function(){
            var user_id = $("#current_user").attr('data_user_id');
            $.ajax({
              url : "/results/"+user_id+"/get_attempts",
              type: "GET",
              format: "JSON",
              success: function(data, textStatus, jqXHR)
              {

                $.ajax({
                  url : "/user_sign_out",
                  type: "DELETE",
                  format: "JSON",
                  async: true,
                  success: function(data, textStatus, jqXHR)
                  {

                  },
                  error: function (jqXHR, textStatus, errorThrown)
                  {
                  }
                });
                bootbox.alert(' <h2>Congratulation :)</h2><ul><li>Your Test is submitted.</li><li>Your User ID is '+user_id+'.</li><li><h3>You attempted '+data+' question(s) out of 45.</h3></li></ul>',function(){
                  location.reload();
                });

              },
              error: function (jqXHR, textStatus, errorThrown)
              {

              }
            });
          }
          $("#submit_btn").unbind();
          $("#submit_btn").click(function(){
            bootbox.confirm("<h3>As you sure you want to finish you test !!! </h3><br/><b style='color: red'>Note : once logout you cannot login again.</b>", function (result) {
              if (result == true) {
                show_alert_and_logout();
              }
            });
          })
          $("#save_answer_btn").unbind();
          $("#save_answer_btn").click(function(){
            if (!$("input[name='optionsRadios']:checked").val() && question_attempted < 45) {
              bootbox.alert('Nothing is selected , first select answer to save !');
              return false;
            }
            else if(question_attempted >= 45)
            {
              show_alert_and_logout();
            }
            else
            {
              question_attempted = question_attempted +1;
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
              async: true,
              data: {authenticity_token:AUTH_TOKEN, result:input_data},
              beforeSend: function() {
                modal_box = bootbox.dialog({
                  closeButton: false,
                  message: '<img src="/assets/img/booking_loading.gif"/><b>Please wait ! Question is loading ...</b>'
                });
              },
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
            modal_box.modal('hide');
            fetch_question();
          }

          $("#next_question_btn").unbind();
          $("#next_question_btn").click(function(){
            fetch_question();
          })


          $("#start_test_button").unbind();
          $("#start_test_button").click(function(){
            bootbox.confirm("As soon as you click on OK , your time will start <br/> <ol><li>Try to attempt as many question as you can ,out of 45 questions.</li><li>You have 30 Minutes.</li><li>Your Form will be locked & you will be loged out after 30mins automatically.</li><li>No negative marking.</li><li>Click SAVE to submit your answer & move next</li><li>Click NEXT if you DONT want to save your answer & move next.</li><li>Click FINISH TEST if you are done before time gets over.</li><li>Dont play around login/logout , its ONE TIME LOGIN</li></ol><b style='color: red'>Note : Do not open any other tab or search in other window your test will be auto submitted & session will be expired.</b>", function (result) {
              if (result == true) {
                  show_question_screen();
                  fetch_question();
                  start_timer();
                }
            });
          });

          var fetch_question  = function(){
            var user_id = $("#current_user").attr('data_user_id');
            $.ajax({
              url : "/questions/"+user_id+"/get_random_question",
              type: "GET",
              format: "JSON",
              async: false,
              beforeSend: function() {
                modal_box = bootbox.dialog({
                  closeButton: false,
                  message: '<img src="/assets/img/booking_loading.gif"/><b>Please wait ! Question is loading ...</b>'
                });
              },
              success: function(data, textStatus, jqXHR)
              {
               if (data && data.id > 0) {
                 $("#question_caption").html(data.description);
                 $("#question_caption").attr("data_question_id", data.id);

                 jQuery.each(data.get_options, function (index, item) {
                   var x = index + 1
                   $("#option_desc_" + x).html(item.description);
                   $("#optionsRadios" + x).attr("data_option_id", item.id);

                   // do something with `item` (or `this` is also `item` if you like)
                 });
               }

               modal_box.modal('hide');
              },
              error: function (jqXHR, textStatus, errorThrown)
              {
                modal_box.modal('hide');
                show_alert_and_logout();
              }
            });
          }

          var show_question_screen = function(){
            $("#welcome_screen").hide();
            $("#question_container_screen").show();
          }


          var start_timer = function(){
            var counter = 15;
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
                show_alert_and_logout();
                clearInterval(interval);
              }
            }, 60000);
          }

        }

    };

}();