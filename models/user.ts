
class User {

    // Properties
    private identification : string;
    private name           : string;
    private email          : string;
    private pass           : string;
    private status         : boolean;
    private google         : boolean;
    private profile_image  : string;

    // Initial user data
    constructor(identification: string, name: string, email: string, pass: string, status : boolean, google : boolean, profile_image : string = '') {
        this.identification = identification;
        this.name           = name;
        this.email          = email;
        this.pass           = pass;
        this.status         = status;
        this.google         = google;
        this.profile_image  = profile_image
    }

    // Get data in format JSON
    fromJson(){
        return {
            "identification" : this.identification,
            "name"           : this.name,
            "email"          : this.email,
            "pass"           : this.pass,
            "status"         : this.status,
            "google"         : this.google,
            "profile_image"  : this.profile_image
        }
    }


}

export default User;