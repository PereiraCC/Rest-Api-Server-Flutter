"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Agent {
    // Initial agent data
    constructor(identification, name, lastname, email, phone) {
        this.identification = identification;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
    }
    // Get data in format JSON
    fromJson() {
        return {
            "identification": this.identification,
            "name": this.name,
            "lastname": this.lastname,
            "email": this.email,
            "phone": this.phone,
        };
    }
}
exports.default = Agent;
//# sourceMappingURL=agent.js.map