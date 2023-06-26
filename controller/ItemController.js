import {Item} from "../model/Item.js";
import {LocalStorageDB} from "../db/LocalStorageDB.js";
import {AlertController} from "./AlertController.js";

export class ItemController {
    constructor() {
        this.clearItemTable.bind(this);
        this.addToItemTable.bind(this);
        $(document).ready(this.addToItemTable.bind(this));
        $("#itemTable tbody").on("click", "tr", this.selectItem.bind(this));
        $("#itemAddButton").on("click", this.addItem.bind(this));
        this.findItemElementNo.bind(this);
        $("#updateItemButton").on("click", this.updateItem.bind(this));
        $("#updatedItemsButton").on("click", this.updateItemArray.bind(this));
        $("#deleteItemModalButton").on("click", this.deleteItem.bind(this));
        $("#deleteItemButton").on("click", this.deleteItemFromArray.bind(this));
        $("#getAllItemsButton").on("click", this.getAllItems.bind(this));
        $("#itemSearchButton").on("click",this.searchItem.bind(this));
    }

    clearItemTable() {
        $("#itemTable tbody").empty();
    }

    addToItemTable() {
        this.clearItemTable();
        if (localStorage.getItem(itemData)) {
            itemArray = JSON.parse(localStorage.getItem(itemData));
            for (let i = 0; i < itemArray.length; i++) {
                $("#itemTable tbody").append("<tr><td>" + itemArray[i]._item_id + "</td><td>" + itemArray[i]._item_name + "</td><td>" + itemArray[i]._item_price + "</td><td>" + itemArray[i]._item_qty + "</td></tr>");
            }
        }
    }

    addItem() {
        var item_id = $("#iId").val();
        var item_name = $("#iName").val();
        var item_price = $("#iPrice").val();
        var item_qty = $("#iQty").val();
        itemArray.push(new Item(item_id, item_name, item_price, item_qty));
        new LocalStorageDB().updateLocalStorage(itemData, itemArray);
        this.addToItemTable();
        new AlertController().showAlert("success", "Item Added Successfully!");
    }

    selectItem(event) {
        var item_id = $(event.currentTarget).find("td:eq(0)").text();
        var item_name = $(event.currentTarget).find("td:eq(1)").text();
        var item_price = $(event.currentTarget).find("td:eq(2)").text();
        var item_qty = $(event.currentTarget).find("td:eq(3)").text();

        /*Creating an object using row data. */
        itemObject = new Item(item_id, item_name, item_price, item_qty);


    }

    findItemElementNo(id) {
        for (let i = 0; i < itemArray.length; i++) {
            if (itemArray[i]._item_id === id) {
                return i;

            }

        }
        return -1;

    }

    updateItem() {
        if (!itemObject) {
            $("#updateItemButton").removeAttr("data-bs-target");
            new AlertController().showAlert("error", "Please select an item  from the row to update!");

        } else {
            $("#updateItemButton").attr("data-bs-target", "#updateItemModal");
            // Setting the data to the input fields.
            $("#uIid").val(itemObject._item_id);
            $("#uIname").val(itemObject._item_name);
            $("#uIprice").val(itemObject._item_price);
            $("#uIqty").val(itemObject._item_qty);
        }
    }

    updateItemArray() {
        let index = this.findItemElementNo($("#uIid").val());
        if (index !== -1) {
            itemArray[index] = new Item($("#uIid").val(), $("#uIname").val(), $("#uIprice").val(), $("#uIqty").val());
            new LocalStorageDB().updateLocalStorage(itemData, itemArray);
            this.addToItemTable();
            new AlertController().showAlert("success", "Item Updated Successfully!");

        } else {
            new AlertController().showAlert("error", "Enter a valid item id!");
        }
    }

    deleteItem() {
        if (!itemObject) {
            $("#deleteItemModalButton").removeAttr("data-bs-target");
            new AlertController().showAlert("error", "Please select an item  from the row to delete!");
        } else {
            $("#deleteItemModalButton").attr("data-bs-target", "#deleteItemModal");
            $("#iId2").val(itemObject._item_id);
        }

    }
    deleteItemFromArray() {
        let index = this.findItemElementNo($("#iId2").val())
        if (index !== -1) {
            itemArray.splice(index, 1);
            new LocalStorageDB().updateLocalStorage(itemData, itemArray);
            this.addToItemTable();
            new AlertController().showAlert("success", "Item Deleted Successfully!");

        }else{
            new AlertController().showAlert("error", "Enter a valid item id!");
        }
    }
    getAllItems(){

        new AlertController().showAlert("success", "Successfully fetched the data!");
        setInterval(() => {
            window.location.reload();
        }, 1000)
    }
        searchItem(){
            $("#infoBody").empty();//Clearing the info modal.
            event.preventDefault();//Prevents refreshing.
            let index = this.findItemElementNo($("#itemIdField").val());
            if(index!==-1){
                $("#exampleModal").modal("show"); //Triggering the bootstrap modal.
                $("#exampleModalLabel").text("Item Details.");
                $("#infoBody").append($("<h3></h3>").text("ITEM ID : " + itemArray[index]._item_id));
                $("#infoBody").append($("<h3></h3>").text("ITEM NAME : " + itemArray[index]._item_name));
                $("#infoBody").append($("<h3></h3>").text("ITEM PRICE : " + itemArray[index]._item_price));
                $("#infoBody").append($("<h3></h3>").text("ITEM QTY : " + itemArray[index]._item_qty));

            }else{
                new AlertController().showAlert("error", "Enter a valid item id!");
            }
        }

}

new ItemController();
var itemObject;
export let itemArray = [];
export const itemData = "ItemData";