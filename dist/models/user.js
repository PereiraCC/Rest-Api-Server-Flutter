"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    // Initial user data
    constructor(identification, fullName, email, pass, status) {
        this.identification = identification;
        this.fullName = fullName;
        this.email = email;
        this.pass = pass;
        this.status = status;
    }
    // Get data in format JSON
    fromJson() {
        return {
            "identification": this.identification,
            "fullName": this.fullName,
            "email": this.email,
            "pass": this.pass,
            "status": this.status
        };
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map