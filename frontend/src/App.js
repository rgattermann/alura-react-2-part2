import React, {Component} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import PopUp from "./PopUp";
import ApiService from "./ApiService";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: []
    };
  }

  removeAuthor = id => {
    const { authors } = this.state;

    this.setState({
      authors: authors.filter((author) => author.id !== id)
    });

    PopUp.showMessage("success", "Autor removido com sucesso!");
    ApiService.removeAuthor(id)
  }

  handleSubmit = author => {
    ApiService.createAuthor(JSON.stringify(author))
      .then(res => res.data)
      .then(author => {
        this.setState({authors: [...this.state.authors, author]});
        PopUp.showMessage("success", "Autor adicionado com sucesso!");
      });
  };

  componentDidMount() {
    ApiService.AuthorsList()
      .then(res => {
        this.setState({authors: [...this.state.authors, ...res.data]});
      });
  }

  render() {
    return <React.Fragment>
      <Header />
      <div className="container mb-10">
        <h1> Casa do código</h1>
        <Table
        authors={this.state.authors}
        removeAuthor={this.removeAuthor}/>
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    </React.Fragment >;
  }
}

export default App;
