import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import DataTable from "../../components/DataTable/DataTable";
import ApiService from "../../utils/ApiService";
import PopUp from "../../utils/PopUp"

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
