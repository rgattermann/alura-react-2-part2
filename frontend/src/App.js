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

    const { authorsUpdated } = authors.filter(author => author.id !== id);

    ApiService.removeAuthor(id)
      .then(res => ApiService.handleErrors(res))
      .then(res => {
        if (res.message === "deleted") {
          this.setState({authors: [...authorsUpdated]});
          PopUp.showMessage("success", "Autor removido com sucesso!");
        }
      })
      .catch(err => PopUp.showMessage("error", "Erro na comunicação com a API ao tentar remover o autor!"));
  }

  handleSubmit = author => {
    ApiService.createAuthor(JSON.stringify(author))
      .then(res => ApiService.handleErrors(res))
      .then(res => {
        if (res.message === "success") {
          this.setState({authors: [...this.state.authors, res.data]});
          PopUp.showMessage("success", "Autor adicionado com sucesso!");
        }
      })
      .catch(err => PopUp.showMessage("error", "Erro na comunicação com a API ao tentar criar o autor!"));
  };

  componentDidMount() {
    ApiService.AuthorsList()
      .then(res => ApiService.handleErrors(res))
      .then(res => {
        console.log(res);
        if (res.message === "success") {
          this.setState({authors: [...this.state.authors, ...res.data]});
        }
      })
      .catch(err => PopUp.showMessage("error", "Erro na comunicação com a API ao tentar listar os autores!"));
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
