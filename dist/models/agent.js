"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Agent {
    // Initial agent data
    constructor(identification, name, lastname, email, phone, userID, status) {
        this.identification = identification;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.userID = userID;
        this.status = status;
    }
    // Get data in format JSON
    fromJson() {
        return {
            "identification": this.identification,
            "name": this.name,
            "lastname": this.lastname,
            "email": this.email,
            "phone": this.phone,
            "userID": this.userID,
            "status": this.status
        };
    }
}
exports.default = Agent;
//# sourceMappingURL=agent.js.map