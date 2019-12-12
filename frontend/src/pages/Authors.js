import React, { Fragment } from 'react';
import Header from '../Header';
import DataTable from "../DataTable";
import ApiService from "../ApiService";
import PopUp from "../PopUp"

class Authors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: [],
      title: "Autores",
    };
  }

  componentDidMount() {
    ApiService.nameList()
      .then(res => ApiService.handleErrors(res))
      .then(res =>  {
        if (res.message === "success") {
          this.setState({names: [...this.state.names, ...res.data]})
        }
      })
      .catch(err => PopUp.showMessage("error", "Erro na comunicação com a API ao tentar listar autores!"));
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <h1>Authors</h1>
          <DataTable data={this.state.names} title={this.state.title} columns={['name']} />
        </div>
      </Fragment>
    );
  }
}

export default Authors;
