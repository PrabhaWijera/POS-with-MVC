export class Order {
    constructor(oId, cId, iId, iName, iPrice, iQty, total) {
        this._oId = oId
        this._cId = cId
        this._iId = iId
        this._iName = iName
        this._iPrice = iPrice
        this._iQty = iQty
        this._total = total;
    }

    get oId() {
        return this._oId
    }

    set oId(oId) {
        this._oId = oId
    }

    get cId() {
        return this._cId
    }

    set cId(cId) {
        this._cId = cId
    }

    get iId() {
        return this._iId
    }

    set iId(iId) {
        this._iId = iId
    }

    get iName() {
        return this._iName
    }

    set iName(iName) {
        this._iName = iName
    }

    get iPrice() {
        return this._iPrice
    }

    set iPrice(iPrice) {
        this._iPrice = iPrice
    }

    get iQty() {
        return this._iQty
    }

    set iQty(iQty) {
        this._iQty = iQty
    }

    get total() {
        return this._total

    }

    set total(total) {
        this._total = total
    }

}