import {Customer} from "../model/Customer.js";
/*import {AlertController} from "./AlertController.js";*/
import {LocalStorageDB} from "../db/LocalStorageDB.js";


export class CustomerController {
    constructor() {
        $("#customerAddButton").on("click", this.addCustomer.bind(this))
        this.addToTable.bind(this);
        this.clearTable.bind(this);
        this.findCustomerElementNo.bind(this);
        $(document).ready(this.addToTable.bind(this));
        $("#customerTable tbody").on("click", "tr", this.selectCustomer.bind(this));
        $("#updateCustomerButton").on("click", this.updateCustomer.bind(this));
        $("#cUpdateButton").on("click", this.updateCustomerArray.bind(this));
        $("#deleteCustomerButton").on("click", this.deleteCustomer.bind(this))
        $("#deleteCustomer").on("click", this.deleteCustomerFromArray.bind(this))
        $("#getAllCustomersButton").on("click", this.getAllCustomers.bind(this))
        $("#csButton").on("click", this.searchCustomer.bind(this))


    }

    addCustomer() {
        //Customer object added to the array.
        custArray.push(new Customer($("#cId").val(), $("#cName").val(), $("#cAddress").val(), $("#cSalary").val()));
        new LocalStorageDB().updateLocalStorage(data, custArray);
        this.addToTable();
        new AlertController().showAlert("success", "Customer Added Successfully!");

    }

    clearTable = () => {
        $("#customerTable tbody").empty();
    }

    addToTable() {
        this.clearTable();
        if (JSON.parse(localStorage.getItem(data))) {
            custArray = JSON.parse(localStorage.getItem(data));
            for (let i = 0; i < custArray.length; i++) {
                $("#customerTable tbody").append("<tr><td>" + custArray[i]._id + "</td><td>" + custArray[i]._name + "</td><td>" + custArray[i]._address + "</td><td>" + "Rs." + custArray[i]._salary + "</td></tr>");
            }
        } else {
            new AlertController().showAlert("error", "No Data to display!");
        }

    }


    selectCustomer(event) {

        var customer_id = $(event.currentTarget).find("td:eq(0)").text();
        var customer_name = $(event.currentTarget).find("td:eq(1)").text();
        var customer_address = $(event.currentTarget).find("td:eq(2)").text();
        var customer_salary = $(event.currentTarget).find("td:eq(3)").text();
        /*Creating an object using row data. */
        customerData = new Customer(customer_id, customer_name, customer_address, customer_salary);


    }

    updateCustomer() {
        if (!customerData) {
            $("#updateCustomerModal").removeAttr("data-bs-target");
            new AlertController().showAlert("error", "Please select a customer from the row to update!");

        } else {
            $("#updateCustomerButton").attr("data-bs-target", "#updateCustomerModal");
            // Setting the data to the input fields.
            $("#uCId").val(customerData._id);
            $("#uCName").val(customerData._name);
            $("#uCAddress").val(customerData._address);
            $("#uCSalary").val(customerData._salary);

        }

    }


    updateCustomerArray() {
        var index = this.findCustomerElementNo(customerData._id);
        if (index !== -1) {
            var updatedCustomerData = new Customer($("#uCId").val(), $("#uCName").val(), $("#uCAddress").val(), $("#uCSalary").val());
            custArray[index] = updatedCustomerData;
            new LocalStorageDB().updateLocalStorage(data, custArray);
            this.addToTable();
            new AlertController().showAlert("success", "Customer Updated Successfully!");
        } else {
            new AlertController().showAlert("error", "Enter valid customer id!");
        }

    }

    findCustomerElementNo(id) {
        for (let i = 0; i < custArray.length; i++) {
            if (custArray[i]._id === id) {
                return i;

            }
        }
        return -1;
    }

    deleteCustomer() {
        if (!customerData) {
            $("#deleteCustomerButton").removeAttr("data-bs-target");
            new AlertController().showAlert("error", "Please select a customer from the row to delete!");
        } else {
            $("#deleteCustomerButton").attr("data-bs-target", "#deleteCustomerModal");
            $("#dCId").val(customerData._id);
        }
    }

    deleteCustomerFromArray() {
        var index = this.findCustomerElementNo($("#dCId").val());
        if (index !== -1) {
            custArray.splice(index, 1)
            new LocalStorageDB().updateLocalStorage(data, custArray)
            this.addToTable();
            new AlertController().showAlert("success", "Customer Deleted Successfully!");
        } else {
            new AlertController().showAlert("error", "Enter valid customer id!");
        }
    }

    getAllCustomers() {

        new AlertController().showAlert("success", "Successfully fetched the data!");
        setInterval(() => {
            window.location.reload();
        }, 1000)

    }

    searchCustomer() {
        $("#infoBody").empty();//Clearing the info modal.
        event.preventDefault();//Prevents refreshing.
        let index = this.findCustomerElementNo($("#cidField").val());
        if (index !== -1) {
            $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
            $("#exampleModalLabel").text("Customer Details.");
            $("#infoBody").append($("<h3></h3>").text("CUSTOMER ID : " + custArray[index]._id));
            $("#infoBody").append($("<h3></h3>").text("CUSTOMER NAME : " + custArray[index]._name));
            $("#infoBody").append($("<h3></h3>").text("CUSTOMER ADDRESS : " + custArray[index]._address));
            $("#infoBody").append($("<h3></h3>").text("CUSTOMER SALARY : " + custArray[index]._salary));

        } else {
            new AlertController().showAlert("error", "Enter valid customer id!");
        }

    }

}

new CustomerController()
var customerData;
const data = "CustomerData"; //This is the key value for local storage.
export  let custArray = [];
