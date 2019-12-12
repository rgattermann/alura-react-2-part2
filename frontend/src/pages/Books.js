import React, { Fragment } from 'react';
import Header from '../Header';
import DataTable from "../DataTable";
import ApiService from "../ApiService";
import PopUp from "../PopUp";

class Books extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      title: "Books",
    };
  }

  componentDidMount() {
    ApiService.bookList()
      .then(res => ApiService.handleErrors(res))
      .then(res => {
        if (res.message === "success") {
          this.setState({ books: [...this.state.books, ...res.data] });
        }
      })
      .catch(err => PopUp.showMessage("error", "Erro na comunicação com a API ao tentar listar livros!"));
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Books</h1>
          <DataTable data={this.state.books} title={this.state.title} columns={['book']} />
        </div>
      </Fragment>
    );
  }
}

export default Books;
