var email, password;

$("#inputEmail").change(function() {
    email = $('#inputEmail').val()
});

$("#inputPassword").change(function() {
    password = $('#inputPassword').val()
});


$("#registerButton").click( function() {
    $.ajax({
        url: 'http://localhost:9000/auth/register', 
        type: 'GET',
        crossDomain: true,
        dataType: "json",
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Content-Type':'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        },
        data: { 
            email: email,
            password: password
        },
        success: function (data) {
            if(data != null) {
                if (data.value == "OK") {
                    window.location.replace("http://localhost:3000/login.html");
                }   
            }
            else {
                alert("Email already exists")
            }
        },
        error(e) {
            console.log(e)
            alert("Client-error: ", e)
            window.location.replace("http://localhost:3000/503.html");
        }
    })
});