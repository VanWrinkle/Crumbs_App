
import {MockUserDatabase} from "../src/IUserDatabase/MockUserDatabase";
import {RegistrationService} from "../src/IUserRegistrationService/RegistrationService";
import {MockGraphPersistence} from "../src/ISocialGraphPersistence/MockGraphPersistence";

const loginService = new RegistrationService(new MockUserDatabase(), new MockGraphPersistence())
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
