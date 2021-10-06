
class User {

    // Properties
    private identification : string;
    private name           : string;
    private email          : string;
    private pass           : string;
    private status         : boolean;
    private google         : boolean;

    // Initial user data
    constructor(identification: string, name: string, email: string, pass: string, status : boolean, google : boolean) {
        this.identification = identification;
        this.name           = name;
        this.email          = email;
        this.pass           = pass;
        this.status         = status;
        this.google         = google;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "identification" : this.identification,
            "name"           : this.name,
            "email"          : this.email,
            "pass"           : this.pass,
            "status"         : this.status,
            "google"         : this.google
        }
    }


}

export default User;