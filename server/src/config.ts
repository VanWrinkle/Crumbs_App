import path from "path";

export const reactDir = path.join(__dirname, '..', '..', 'client', 'build');
export const usernameRequirements = RegExp("^(?=[a-z]{4,30}$)");
export const passwordRequirements = RegExp("^(?=.*[a-zA-Z])(?=.*\\d).{8,}");
export const numberOfSaltRounds = 5;