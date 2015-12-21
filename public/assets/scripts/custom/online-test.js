var OnlineTest = function () {

    return {
        //main function to initiate the module
        init: function () {

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
            var role = unescape(params["role"]);
            if (role == 'admin') {
                $('.admin-panel').removeClass("hidden");
                $('.exam-panel').addClass("hidden");
            }
            else {
                $('.exam-panel').removeClass("hidden");
                $('.admin-panel').addClass("hidden");
            }


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

        }



    };

}();