import {passwordRequirements, usernameRequirements} from "./config";

function meetsCredentialRequirements(username: string, password: string): Boolean {
    const legalUsername: Boolean = username.match(usernameRequirements) != null;
    const legalPassword: Boolean = password.match(passwordRequirements) != null;
    return username !== password && legalUsername && legalPassword
}

module.exports = meetsCredentialRequirements;