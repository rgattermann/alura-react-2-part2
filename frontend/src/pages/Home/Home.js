import React, {Component} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "./Home.css";
import Table from "../../components/Table/Table";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import PopUp from "../../utils/PopUp";
import ApiService from "../../utils/ApiService";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: []
    };
  }

  removeAuthor = id => {
    const { authors } = this.state;

    const authorsUpdated = authors.filter(author => author.id !== id);

    ApiService.removeAuthor(id)
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
      .then(res => {
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

export default Home;
