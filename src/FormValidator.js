import validator from "validator";

class FormValidator {
  constructor(rules) {
    this.rules = rules;
  }

  validate(state) {
    let validation = this.valid();

    this.rules.forEach(rule => {
      if (!validation[rule.fieldName].isInvalid) {
        const fieldValue = state[rule.fieldName.toString()];
        const args = rule.args || [];
        const validationMethod = typeof rule.validationMethod === "string" ?
          validator[rule.validationMethod] :
          rule.validationMethod;

        if (validationMethod(fieldValue, ...args, state) !== rule.validOn) {
          validation[rule.fieldName] = {
            isInvalid: true,
            message: rule.message
          };
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {};
    this.rules.map(rule => (
      validation[rule.fieldName] = {isInvalid: false, message: ""}
    ));

    return {isValid: true, ...validation};
  }
}

export default FormValidator;
