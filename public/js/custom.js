$(document).ready(function() {
    var url = window.location.href;
    $(".result-card").hide();
    $("#name").keyup(function() {
        $(".result-card").hide();
        $('.detail').html('');
        var data = { name: $('#name').val() }
            // url = url.substring(0, url.length - 2);
            // console.log(url);
            // var api = url + '/user';
        httpCall(url, data, function(result) {
            if (result.success == 0) {
                alert(result.message)
            } else {
                //console.log(result.data);
                console.log('length' + result.data.length);
                $('.detail').html('');
                for (let index = 0; index < result.data.length; index++) {
                    var name = result.data[index].name;
                    if (name != undefined) {
                        var repo = `<div class="alert alert-primary" role="alert">
                        ` + name + `
                      </div>`;
                        $('.detail').append(repo);
                        $(".result-card").show();
                        console.log(name);
                    }
                }
            }
        });
    });

    function httpCall(url, data, callback) {
        $.post(url, data)
            .done(function(data) {
                callback(data);
            });
    }
});