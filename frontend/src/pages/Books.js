import React, { Fragment } from 'react';
import Header from '../Header';
import DataTable from "../DataTable";
import ApiService from "../ApiService";

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
      .then(res => {
        this.setState({
          books: [...this.state.books, ...res.data]
        })
      });
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
