var email, password;

$("#inputEmail").change(function() {
    email = $('#inputEmail').val()
});

$("#inputPassword").change(function() {
    password = $('#inputPassword').val()
});

$("#loginButton").click( function() {
    $.ajax({
        url: 'http://localhost:9000/auth/login', 
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
                    window.location.replace("http://localhost:3000/index.html");
                }   
                else {
                    alert("Email does not exist")
                }
            }
            alert("Wrong Password")
        },
        error(e) {
            console.log("Client-error: ", e)
            window.location.replace("http://localhost:3000/503.html");
        }
    })
});
