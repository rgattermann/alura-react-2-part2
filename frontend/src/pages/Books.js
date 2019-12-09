import React, { Fragment } from 'react';
import Header from '../Header';
import DataTable from "../DataTable";

class Books extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      ],
      title: "Books",
    };
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Books</h1>
          <DataTable data={this.state.authors} title={this.state.title} columns={['book']} />
        </div>
      </Fragment>
    );
  }
}

export default Books;
