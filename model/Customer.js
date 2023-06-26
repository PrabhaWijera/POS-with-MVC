export class Customer {
    constructor(id, name, address, salary) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._salary = salary;

    }

    get id() {
        return this._id;

    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;

    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;

    }

    set address(value) {
        this._address = value;
    }

    get salary() {
        return this._salary;

    }

    set salary(value) {
        this._salary = value;
    }

}
new Customer();