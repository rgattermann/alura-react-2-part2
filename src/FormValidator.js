import validator from "validator";

class FormValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(state) {
    const fieldValue = state[this.rules.fieldName.toString()];
    const validationMethod = validator[this.rules.validationMethod.toString()];

    if (validationMethod(fieldValue, [], state)) {
      console.log("invalid");
      return false;
    } else { console.log("valid"); return true;}
  }
}

export default FormValidator;
