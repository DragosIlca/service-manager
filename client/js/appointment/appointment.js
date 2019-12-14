var brand, service;

$('#brandForm input').on('change', function() {
    var value = $('input[name=brandRadio]:checked', '#brandForm').val()

    if (value !== "")
        brand = value; 
    console.log("Client-brand: ", brand)
});

$("input").keyup(function() {
    var value = $('input[name=brandRadio]:checked', '#brandForm').val()
    if (value === "") {
        brand = $( this ).val();
    }
}).keyup();

$('#brandForm input').on('change', function() {
    $.ajax({
        url: 'http://localhost:9000/services/get', 
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
            brand: brand
        },
        success: function (data) {
            populateServices(data)
            console.log("Client: ", data);
        },
        error(e) {
            console.log("Client-error: ", e)
            window.location.replace("http://localhost:3000/503.html");
        }
    })
})

$('#servicesForm').change(function () {
    service = $(this).find("option:selected").text();

    console.log("Client-service: ", service)
    $.ajax({
        url: 'http://localhost:9000/operations/get', 
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
            brand: brand,
            service: service
        },
        success: function (data) {
            populateOperations(data)
            console.log("Client: ", data);
        },
        error(e) {
            console.log("Client-error: ", e)
            window.location.replace("http://localhost:3000/503.html");
        }
    })
});

function populateServices(services) {
    servicesForm = document.getElementById("servicesForm")

    for (index in servicesForm.options) {
        servicesForm.options[index] = null;
    }
    
    for(index in services) {
        var option = new Option(services[index], index);
        servicesForm.options[index] = option
    }
}

function populateOperations(operations) {
    operationsForm = document.getElementById("operationsSelection")

    for (index in operationsForm.options) {
        operationsForm.options[index] = null;
    }
    
    for(index in operations) {
        var option = new Option(operations[index], index);
        operationsForm.options[index] = option
    }
}