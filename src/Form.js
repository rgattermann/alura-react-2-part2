import React, {Component} from "react";
import FormValidator from "./FormValidator";

class Form extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        fieldName: "name",
        validationMethod: "isEmpty",
        validOn: false,
        message: "Entre com um nome",
      },
      {
        fieldName: "book",
        validationMethod: "isEmpty",
        validOn: false,
        message: "Entre com um livro",
      },
      {
        fieldName: "price",
        validationMethod: "isInt",
        args: [{min: 0, max: 99999}],
        validOn: true,
        message: "Entre com um valor númerico",
      },
    ]);

    this.initialState = {
        name: "",
        book: "",
        price: "",
        validation: this.validator.valid()
    };

    this.state = this.initialState;
  }

  onSubmit = () => {
    const validation = this.validator.validate(this.state);

    if (validation.isValid) {
      this.props.handleSubmit(this.state);
      this.setState(this.initialState);
    } else {
      const {name, book, price} = validation;
      const fields = [name, book, price];

      const invalidFields = fields.filter(elm => elm.isInvalid);

      invalidFields.forEach(field => console.log(field.message));
    }
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  render() {
    const {name, book, price} = this.state;

    return(
      <form>
        <div className="row">
          <div className="input-field col s4">
            <label className="input-field" htmlFor="name">Nome</label>
            <input
              className="validate"
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field col s4">
            <label className="input-field" htmlFor="book">Livro</label>
            <input
              className="validate"
              id="book"
              type="text"
              name="book"
              value={book}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field col s4">
            <label className="input-field" htmlFor="price">Preço</label>
            <input
              className="validate"
              id="price"
              type="text"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="waves-effect waves-light btn indigo lighten-2"
            type="button" onClick={this.onSubmit}>Salvar
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
