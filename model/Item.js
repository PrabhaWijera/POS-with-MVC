export class Item {
    _

    constructor(item_id, item_name, item_price, item_qty) {
        this._item_id = item_id;
        this._item_name = item_name;
        this._item_price = item_price;
        this._item_qty = item_qty;

    }

    get item_id() {
        return this._item_id;
    }

    set item_id(value) {
        this._item_id = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {

        this._item_name = value;

    }

    get item_price() {
        return this._item_price;
    }

    set item_price(value) {
        this._item_price = value;

    }

    get item_qty() {
        return this._item_qty;


    }

    set item_qty(value) {
        this._item_qty = value;
    }

}