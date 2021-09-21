
class Agent {

    // Properties
    private identification : string;
    private name           : string;
    private lastname       : string;
    private email          : string;
    private phone          : string;

    // Initial agent data
    constructor(identification: string, name: string, lastname: string, email: string, phone: string) {
        this.identification = identification;
        this.name           = name;
        this.lastname       = lastname;
        this.email          = email;
        this.phone          = phone;
    }

    // Get data in format JSON
    fromJson(){
        return {
            "identification" : this.identification,
            "name"           : this.name,
            "lastname"       : this.lastname,
            "email"          : this.email,
            "phone"          : this.phone,
        }
    }
}

export default Agent;