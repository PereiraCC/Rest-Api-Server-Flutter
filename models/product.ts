
class Product {

    // Properties
    private code      : string;
    private title     : string;
    private price     : number;
    private available : boolean;
    private imageURL  : string;
    private userID    : string;

    // Initial Product data
    constructor(code : string, title : string, price : number, available : boolean, userID : string, imageURL : string = '') {
        this.code      = code;
        this.title     = title;
        this.price     = price;
        this.available = available;
        this.userID    = userID;
        this.imageURL  = imageURL;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "code"      : this.code,
            "title"     : this.title,
            "price"     : this.price,
            "available" : this.available,
            "userID"    : this.userID,
            "imageURL"  : this.imageURL
        }
    }
}

export default Product;