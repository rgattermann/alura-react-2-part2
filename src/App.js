import React, {Component} from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import Table from "./Table";
import Form from "./Form";
import Header from "./Header";
import PopUp from "./PopUp";

class App extends Component{
  state = {
    authors: [{
      name: 'Paulo',
      book: 'React',
      price: '1000'
    },
    {
      name: 'Daniel',
      book: 'Java',
      price: '99'
    },
    {
      name: 'Marcos',
      book: 'Design',
      price: '150'
    },
    {
      name: 'Bruno',
      book: 'DevOps',
      price: '100'
    },
  ]};

  removeAuthor = index => {
    const { authors } = this.state;

    this.setState({
      authors: authors.filter((author, authorIndex) => authorIndex !== index)
    });

    PopUp.showMessage("success", "Autor removido com sucesso!");
  }

  handleSubmit = author => {
    this.setState({authors: [...this.state.authors, author]});
    PopUp.showMessage("success", "Autor adicionado com sucesso!");
  };

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
