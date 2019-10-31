import React, {Component} from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        name: "",
        book: "",
        price: "",
    };

    this.state = this.initialState;
  }

  onSubmit = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
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
