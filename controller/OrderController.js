import {custArray} from "./CustomerController.js";
import {itemArray, ItemController, itemData} from "./ItemController.js";
import {Order} from "../model/Order.js";
import {AlertController} from "./AlertController.js";
import {LocalStorageDB} from "../db/LocalStorageDB.js";

export class OrderController {
    constructor() {
        this.sendEmail.bind(this);
        this.addOrdersToTable.bind(this);
        this.clearOrderTable.bind(this);
        this.addOrder.bind(this);
        this.findOrderId.bind(this);
        $(document).ready(this.addOrdersToTable.bind(this));
        $("#aoButton").on("click", this.addOrder.bind(this))
        $("#cIdDropdown").on("click", "li", this.setCId.bind(this));
        $("#iIdDropDown").on("click", "li", this.setIId.bind(this));
        $("#iNameDropDown").on("click", "li", this.setIName.bind(this));
        $("#addOrderButton").on("click", this.addOrderDataToArray.bind(this));
        $("#orderTable tbody").on("click", "tr", this.selectOrder.bind(this));
        $("#updateOrderButton").on("click", this.updateOrder.bind(this));
        $("#updateOrdersButton").on("click", this.updateOrderArray.bind(this));
        $("#uCidDropDown").on("click", "li", this.setUCId.bind(this));
        $("#uIidDropDown").on("click", "li", this.setUIId.bind(this));
        $("#uInDropDown").on("click", "li", this.setUIName.bind(this));
        $("#deleteOrderButton").on("click", this.deleteOrderFromArray.bind(this));
        $("#deleteOrderModalButton").on("click", this.deleteOrder.bind(this));
        $("#getAllOrdersButton").on("click", this.getAllOrders.bind(this));
        $("#searchOrderButton").on("click", this.searchOrder.bind(this));


    }

    deleteOrderFromArray() {
        let index = this.findOrderId($("#oId2").val());
        if (index !== -1) {
            orderArray.splice(index, 1);
            new LocalStorageDB().updateLocalStorage(data, orderArray);
            this.addOrdersToTable();
            new AlertController().showAlert("success", "Order deleted successfully.");
        } else {
            new AlertController().showAlert("error", "Order ID is invalid!");
        }
    }

    clearOrderTable() {
        $("#orderTable tbody").empty();
    }

    addOrdersToTable() {
        this.clearOrderTable();
        if (localStorage.getItem(data)) {
            orderArray = JSON.parse(localStorage.getItem(data));
            for (let i = 0; i < orderArray.length; i++) {
                $("#orderTable tbody").append("<tr><td>" + orderArray[i]._oId + "</td><td>" + orderArray[i]._cId + "</td><td>" + orderArray[i]._iId + "</td><td>" + orderArray[i]._iName + "</td><td>" + orderArray[i]._iPrice + "</td><td>" + orderArray[i]._iQty + "</td><td>" + orderArray[i]._total + "</td></tr>");
            }
        }
    }

    addOrder() {
        $("#cIdDropdown").empty();
        //Loading necessary data to the dropdowns.
        custArray.forEach(function (c) {
            $("#cIdDropdown").append("<li><a class='dropdown-item'>" + c._id + "</a></li>")
        })
        $("#iIdDropDown").empty();
        $("#iNameDropDown").empty();
        new ItemController();
        itemArray.forEach(function (i) {
            $("#iIdDropDown").append("<li><a class='dropdown-item'>" + i._item_id + "</a></li>");
            $("#iNameDropDown").append("<li><a class='dropdown-item'>" + i._item_name + "</a></li>");

        });
    }

    setCId(event) {
        $("#cIdButton").empty();
        $("#cIdButton").text($(event.currentTarget).text());
    }

    setIId(event) {
        $("#iIdButton").empty();
        $("#iIdButton").text($(event.currentTarget).text());
    }

    setIName(event) {
        $("#iNameButton").empty();
        $("#iNameButton").text($(event.currentTarget).text());
    }

    addOrderDataToArray() {
        orderData = new Order($("#oId").val(), $("#cIdButton").text(), $("#iIdButton").text(), $("#iNameButton").text(), $("#iPriceField").val(), $("#iQtyField").val(), parseFloat($("#iPriceField").val()) * parseFloat($("#iQtyField").val()));

        /* Checking current stock.*/
        for (let i = 0; i < itemArray.length; i++) {
            if (itemArray[i]._item_id === orderData._iId) {
                if (itemArray[i]._item_qty < orderData._iQty) {
                    return new AlertController().showAlert("error", "We only have " + itemArray[i]._item_qty + " " + itemArray[i]._item_name + "'s in stock. Please reduce the quantity.");

                }
            }

        }

        /*Updating the item qty.*/
        itemArray.forEach((item, index) => {
            if (itemArray[index]._item_id === orderData._iId) {
                itemArray[index]._item_qty = itemArray[index]._item_qty - parseFloat(orderData._iQty);
                new LocalStorageDB().updateLocalStorage(itemData, itemArray);
                /*Loading the item Table.*/
                new ItemController().addToItemTable();

            }

        })

        /**Adding the order to the order array and updating the local storage.*!/*/
        orderArray.push(orderData);
        new LocalStorageDB().updateLocalStorage(data, orderArray);
        //Updating the table.
        this.addOrdersToTable();
        new AlertController().showAlert("success", "Order added successfully.");
        let name = "";
        custArray.forEach(function (c) {
            if(c._id === orderData._cId){
                name = c._name;
            }


        });
        this.sendEmail(orderData._cId, name, orderData._total);



    }
    sendEmail(customerId, customerName, totalInInvoice) {
        // Prepare the email parameters
        const templateParams = {
            message: "Your order summary as per below : ",
            customer_id: customerId,
            owner: "orderCloud",
            customer_name: customerName,
            total_in_invoice: totalInInvoice,
            customer_email: $("#customerEmail").val(),
            reply_to: "drpeiris3@gmail.com"
        };

        // Send the email using EmailJS.
        emailjs.send('service_kvc2vmj', 'template_k5h2r7h', templateParams)
            .then(function (response) {
                swal("Done!", "Email sent successfully!💡", "success");
            }, function (error) {
                swal("OOPS!", "Email sending failed!🚨 : "+error, "error");
            });
    }

    selectOrder(event) {
        var oId = $(event.currentTarget).find("td:eq(0)").text();
        var cId = $(event.currentTarget).find("td:eq(1)").text();
        var iId = $(event.currentTarget).find("td:eq(2)").text();
        var iName = $(event.currentTarget).find("td:eq(3)").text();
        var iPrice = $(event.currentTarget).find("td:eq(4)").text();
        var iQty = $(event.currentTarget).find("td:eq(5)").text();
        var total = $(event.currentTarget).find("td:eq(6)").text();
        orderData = new Order(oId, cId, iId, iName, iPrice, iQty, total);

    }

    updateOrder() {
        if (!orderData) {
            new AlertController().showAlert("error", "Please select an order from the table to update.");
        } else {
            $("#uOId").val(orderData._oId)
            //Loading necessary data to the dropdowns.
            $("#uCidDropDown").empty();

            custArray.forEach(function (c) {
                $("#uCidDropDown").append("<li><a class='dropdown-item'>" + c._id + "</a></li>")
            })
            $("#uIidDropDown").empty();
            $("#uInDropDown").empty();
            new ItemController();
            itemArray.forEach(function (i) {
                $("#uIidDropDown").append("<li><a class='dropdown-item'>" + i._item_id + "</a></li>");
                $("#uInDropDown").append("<li><a class='dropdown-item'>" + i._item_name + "</a></li>");

            });

            $("#upriceField").val(orderData._iPrice)
            $("#uqtyField").val(orderData._iQty)


        }
    }

    findOrderId(id) {
        for (let i = 0; i < orderArray.length; i++) {
            if (orderArray[i]._oId === id) {
                return i;
            }

        }
        return -1;
    }


    updateOrderArray() {
        orderData = new Order($("#uOId").val(), $("#uCustomerIds").text(), $("#uItemIds").text(), $("#uItemNames").text(), $("#upriceField").val(), $("#uqtyField").val(), parseFloat($("#upriceField").val()) * parseFloat($("#uqtyField").val()));
        let index = this.findOrderId($("#uOId").val());
        if (index !== -1) {
            /* Checking current stock.*/
            for (let i = 0; i < itemArray.length; i++) {
                console.log(itemArray[i]._item_id);
                if (itemArray[i]._item_id === orderData._iId) {
                    if (itemArray[i]._item_qty < orderData._iQty) {
                        return new AlertController().showAlert("error", "We only have " + itemArray[i]._item_qty + " " + itemArray[i]._item_name + "'s in stock. Please reduce the quantity.");

                    }
                }

            }
            orderData = new Order($("#uOId").val(), $("#uCustomerIds").text(), $("#uItemIds").text(), $("#uItemNames").text(), $("#upriceField").val(), $("#uqtyField").val(), parseFloat($("#upriceField").val()) * parseFloat($("#uqtyField").val()));
            orderArray[index] = orderData;
            new LocalStorageDB().updateLocalStorage(data, orderArray);
            this.addOrdersToTable();
            /*Updating the item qty.*/
            itemArray.forEach((item, index) => {
                if (itemArray[index]._item_id === orderData._iId) {
                    itemArray[index]._item_qty = itemArray[index]._item_qty - parseFloat(orderData._iQty);
                    new LocalStorageDB().updateLocalStorage(itemData, itemArray);
                    /*Loading the item Table.*/
                    new ItemController().addToItemTable();

                }

            })
            new AlertController().showAlert("success", "Order updated successfully.");
        } else {
            new AlertController().showAlert("error", "Order ID is invalid!");
        }
    }

    setUCId(event) {

        $("#uCustomerIds").empty();
        $("#uCustomerIds").text($(event.currentTarget).text());
    }

    setUIId(event) {
        $("#uItemIds").empty();
        $("#uItemIds").text($(event.currentTarget).text());
    }

    setUIName(event) {
        $("#uItemNames").empty();
        $("#uItemNames").text($(event.currentTarget).text());
    }

    deleteOrder() {
        if (!orderData) {
            new AlertController().showAlert("error", "Please select an order from the table to delete.");

        } else {
            $("#oId2").val(orderData._oId);
        }

    }

    getAllOrders() {
        new AlertController().showAlert("success", "Successfully fetched the data.");
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    searchOrder() {
        $("#infoBody").empty();//Clearing the info modal.
        event.preventDefault();//Prevents refreshing.
        let index = this.findOrderId($("#oidField").val())
        if (index !== -1) {
            $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
            $("#exampleModalLabel").text("Order Details.");
            $("#infoBody").append($("<h3></h3>").text("ORDER ID : " + orderArray[index]._oId));
            $("#infoBody").append($("<h3></h3>").text("CUSTOMER ID : " + orderArray[index]._cId));
            $("#infoBody").append($("<h3></h3>").text("ITEM ID : " + orderArray[index]._iId));
            $("#infoBody").append($("<h3></h3>").text("ITEM NAME : " + orderArray[index]._iName));
            $("#infoBody").append($("<h3></h3>").text("ITEM PRICE : " + orderArray[index]._iPrice));
            $("#infoBody").append($("<h3></h3>").text("ITEM QTY : " + orderArray[index]._iQty));
            $("#infoBody").append($("<h3></h3>").text("TOTAL : " + orderArray[index]._total));


        } else {
            new AlertController().showAlert("error", "Order ID is invalid!");
        }

    }

}

new OrderController()
var orderData;
const data = "OrderData"; //This is the key value for local storage.
let orderArray = [];