import { validateSignupForm, validateLoginForm, validateForm } from '../utils/validation.helper';

import { testData  } from './DummyData'

/*
Note due to Chakra UI, validation functions return 'true' for non-validation: this is to disable the form submit button... 
*/

const { email, password, name, surname, title, content } = testData; 

describe('Sign Up Validation', () => {

  it('Returns false for validation pass', () => {
    expect(validateSignupForm(email, password, name, surname)).toEqual(false);})
  it('Returns true for validation fail', () => {
    expect(validateSignupForm(email, password, name)).toEqual(true);
    expect(validateSignupForm(email, password)).toEqual(true);
    expect(validateSignupForm(email)).toEqual(true);
  })  

})

describe('Login Validation', () => {

  it('Returns false for validation pass', () => {
    expect(validateLoginForm(email, password)).toEqual(false);})
  it('Returns true for validation fail', () => {
    expect(validateLoginForm(email)).toEqual(true);
  })  

})

describe('Form Validation', () => {

  it('Returns false for validation pass', () => {
    expect(validateForm(title, content)).toEqual(false);})
  it('Returns true for validation fail', () => {
    expect(validateForm(title)).toEqual(true);
  }) 
})

