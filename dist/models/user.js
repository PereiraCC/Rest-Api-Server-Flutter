"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    // Initial user data
    constructor(identification, name, email, pass, status, google) {
        this.identification = identification;
        this.name = name;
        this.email = email;
        this.pass = pass;
        this.status = status;
        this.google = google;
    }
    // Get data in format JSON
    fromJson() {
        return {
            "identification": this.identification,
            "name": this.name,
            "email": this.email,
            "pass": this.pass,
            "status": this.status,
            "google": this.google
        };
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map