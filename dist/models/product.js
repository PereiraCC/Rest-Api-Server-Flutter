"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    // Initial Product data
    constructor(code, title, price, available, status, userID, profile_image = '') {
        this.code = code;
        this.title = title;
        this.price = price;
        this.available = available;
        this.status = status;
        this.userID = userID;
        this.profile_image = profile_image;
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
            "profile_image": this.profile_image
        };
    }
}
exports.default = Product;
//# sourceMappingURL=product.js.map