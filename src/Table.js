import React, {Component} from "react";

const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>Autor</th>
          <th>Título</th>
          <th>Preço</th>
          <th>Remover</th>
        </tr>
      </thead>
    );
};

const TableBody = props => {
  const lines = props.authors.map((line, index) => {
    return (
      <tr key={index}>
        <td>{line.name}</td>
        <td>{line.title}</td>
        <td>{line.price}</td>
        <td>
          <button
            className="waves-effect waves-light btn indigo lighten-2"
            onClick={() => props.removeAuthor(index)}>Remover</button>
        </td>
      </tr>
    );
  });

  return <tbody>{lines}</tbody>;
}

class Table extends Component {
  render() {
    const { authors, removeAuthor } = this.props;

    return (
      <table className="centered highlight">
        <TableHead />
        <TableBody authors={authors} removeAuthor={removeAuthor} />
      </table>
    );
  }
}

export default Table;
