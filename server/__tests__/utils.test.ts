
import {MockUserRegistrationDatabase} from "../src/user/registration/persistence/MockUserRegistrationDatabase/MockUserRegistrationDatabase";
import {RegistrationService} from "../src/user/registration/RegistrationService/RegistrationService";
import {MockGraphPersistence} from "../src/user/content/socialGraph/MockGraphPeristence/MockGraphPersistence";

const loginService = new RegistrationService(new MockUserRegistrationDatabase(), new MockGraphPersistence())
test('legal username and password', () => {
    const username = 'myusername'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(true);
});

test('username too short', () => {
    const username = 'myu'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('password too short', () => {
    const username = 'myusername'
    const password = 'Short1'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('password does not contain number', () => {
    const username = 'myusername'
    const password = 'atLeastOneLetterButNoNumber'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('Username too long', () => {
    const username = 'myusernamethatcontinuesonforeverandeverandever'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('username containing special character', () => {
    const username = 'myusername!'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('username containing space', () => {
    const username = 'my username'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});

test('username containing capital letter', () => {
    const username = 'myUsername'
    const password = 'atLeastOneLetterAnd1Number'
    expect(loginService.validateCredentialRequirements(username, password)).toBe(false);
});
