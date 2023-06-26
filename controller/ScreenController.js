clearAll();
showCustomers();


function clearAll() {
    /*Hid the heading Item Manager.*/
    $("#heading2").css("display", "none");

    /*Hid the heading Item Manager - buttons.*/
    $(".buttonContainer2").css("display", "none");

    /*Hid the heading Item Manager - Table.*/
    $("#itemTable").css("display", "none");

    /*Hid the heading Order Manager.*/
    $("#heading3").css("display", "none");

    /*Hid the heading Order Manager - buttons.*/
    $(".buttonContainer3").css("display", "none");

    /*Hid the heading Item Manager - Table.*/
    $("#orderTable").css("display", "none");

    /*Hid the heading Invoice Manager.*/
    $("#heading4").css("display", "none");

    /*Hid the Invoice container.*/
    $(".invoiceContainer").css("display", "none");


    /*Hid the heading Invoice Manager.*/
    $("#heading1").css("display", "none");

    /*Hid the Invoice container.*/
    $(".buttonContainer").css("display", "none");

    /*Hid the Customer table.*/
    $("#customerTable").css("display", "none");

}


/*Button actions.*/

/*Home Button.*/
$("#homeButton").on("click", function () {
    window.location.reload();
});

/*Managing Customers.*/
$("#manageCustomers").on("click", function () {
    clearAll()
    showCustomers();
});
/*Managing Items.*/

$("#manageItems").on("click", function () {
    clearAll();
    showItems();


});

function showCustomers() {
    /*Shows the heading Item Manager.*/
    $("#heading1").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#customerTable").css("display", "inline-table");

}

function showItems() {
    /*Shows the heading Item Manager.*/
    $("#heading2").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer2").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#itemTable").css("display", "inline-table");
    /*Adjusting the CSS.*/
    $("#heading2").position("position", "relative");
    $("#heading2").css("top", "150px");
    $(".buttonContainer2").css("position", "relative");
    $(".buttonContainer2").css("top", "150px");
    $("#itemTable").css("position", "relative");
    $("#itemTable").css("top", "200px");


}

function showOrders() {
    /*Shows the heading Item Manager.*/
    $("#heading3").css("display", "block");

    /*Shows the heading Item Manager - buttons.*/
    $(".buttonContainer3").css("display", "flex");

    /*Shows the heading Item Manager - Table.*/
    $("#orderTable").css("display", "inline-table");
    /*Adjusting the CSS.*/
    $("#heading3").position("position", "relative");
    $("#heading3").css("top", "100px");
    $(".buttonContainer3").css("position", "relative");
    $(".buttonContainer3").css("top", "150px");
    $("#orderTable").css("position", "relative");
    $("#orderTable").css("top", "200px");

}

$("#manageOrders").on("click", function () {
    clearAll();
    showOrders();

});

/*Hiding the info modal.*/
$("#showInfo").css("display", "none");