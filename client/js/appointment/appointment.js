var brand, service;

$('#brandForm input').on('change', function() {
    var value = $('input[name=brandRadio]:checked', '#brandForm').val()

    if (value !== "")
        brand = value; 
    console.log(brand)
});

$("input").keyup(function() {
    var value = $('input[name=brandRadio]:checked', '#brandForm').val()
    if (value === "") {
        brand = $( this ).val();
    }
}).keyup();

$("#servicesForm").on('change', function () {
    var value = $('#servicesForm option:selected').text()
    service = value
    console.log(service)
    populateOperations(brand, service)
}) 

$(document).ready(function () {
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
        success: function (data) {
            populateServices(data)
            console.log(data);
        },
        error() {
            window.location.replace("http://localhost:3000/503.html");
        }
    })
})

function populateServices(services) {
    var select = document.getElementById("servicesForm");

    for(index in services) {
        select.options[select.options.length] = new Option(services[index], index);
    }
}

function getOperations(brand, service) {

}