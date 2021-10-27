
class Product {

    // Properties
    private code           : string;
    private title          : string;
    private price          : number;
    private available      : boolean;
    private status         : boolean;
    private userID         : string;
    private profile_image  : string;

    // Initial Product data
    constructor(code : string, title : string, price : number, available : boolean, status : boolean, userID : string, profile_image : string = '') {
        this.code           = code;
        this.title          = title;
        this.price          = price;
        this.available      = available;
        this.status         = status;
        this.userID         = userID;
        this.profile_image  = profile_image;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "code"           : this.code,
            "title"          : this.title,
            "price"          : this.price,
            "available"      : this.available,
            "status"         : this.status,
            "userID"         : this.userID,
            "profile_image"  : this.profile_image
        }
    }
}

export default Product;