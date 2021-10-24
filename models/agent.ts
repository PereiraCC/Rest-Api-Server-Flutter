
class Agent {

    // Properties
    private identification : string;
    private name           : string;
    private lastname       : string;
    private email          : string;
    private phone          : string;
    private userID         : string;
    private status         : boolean;

    // Initial agent data
    constructor(identification: string, name: string, lastname: string, email: string, phone: string, userID : string, status : boolean) {
        this.identification = identification;
        this.name           = name;
        this.lastname       = lastname;
        this.email          = email;
        this.phone          = phone;
        this.userID         = userID;
        this.status         = status;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "identification" : this.identification,
            "name"           : this.name,
            "lastname"       : this.lastname,
            "email"          : this.email,
            "phone"          : this.phone,
            "userID"         : this.userID,
            "status"         : this.status
        }
    }
}

export default Agent;