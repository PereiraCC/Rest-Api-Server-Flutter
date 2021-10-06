
class User {

    // Properties
    private identification : string;
    private fullName       : string;
    private email          : string;
    private pass           : string;
    private status         : boolean;

    // Initial user data
    constructor(identification: string, fullName: string, email: string, pass: string, status : boolean) {
        this.identification = identification;
        this.fullName       = fullName;
        this.email          = email;
        this.pass           = pass;
        this.status         = status;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "identification" : this.identification,
            "fullName"       : this.fullName,
            "email"          : this.email,
            "pass"           : this.pass,
            "status"         : this.status
        }
    }
}

export default User;