import { body, param } from 'express-validator';

const nameRegex = /^[A-Za-z\-']{2,20}$/;

export const signUp = [
    body('first_name', 'should be alphabets between 2 and 20 characters')
      .matches(nameRegex)
      .trim(),
    body('email', 'Please provide a valid email')
      .isEmail()
      .not()
      .isEmpty(),
    body('address', 'Please provide a valid email')
      .not()
      .isEmpty()
      .escape(),
    body('password', 'Password should be at least 6 characters')
     .isLength({min: 6}),
    body('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    })
];

export const signIn = [
  body('email', 'Please provide a valid mail')
    .isEmail()
    .not()
    .isEmpty(),
  body('password', 'password should be at least 6 characters')
    .isLength({ min: 6 })
    .not()
    .isEmpty(),
];