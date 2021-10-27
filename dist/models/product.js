"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    // Initial Product data
    constructor(code, title, price, available, status, userID, imageURL = '') {
        this.code = code;
        this.title = title;
        this.price = price;
        this.available = available;
        this.status = status;
        this.userID = userID;
        this.imageURL = imageURL;
    }
    // Get data in format JSON
    fromJson() {
        return {
            "code": this.code,
            "title": this.title,
            "price": this.price,
            "available": this.available,
            "status": this.status,
            "userID": this.userID,
            "imageURL": this.imageURL
        };
    }
}
exports.default = Product;
//# sourceMappingURL=product.js.map