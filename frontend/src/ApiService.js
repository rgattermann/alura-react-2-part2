const ApiService = {
  AuthorsList: () => {
    return fetch("http://localhost:8000/api/autor")
      .then(res => res.json());
  },
  createAuthor: author => {
    return fetch("http://localhost:8000/api/autor", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: author,
    })
      .then(res => res.json());
  },
  nameList: () => {
    return fetch("http://localhost:8000/api/autor/nome")
      .then(res => res.json());
  },
  bookList: () => {
    return fetch("http://localhost:8000/api/livro")
      .then(res => res.json());
  },
  removeAuthor: id => {
    return fetch(`http://localhost:8000/api/author/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then(res => res.json());
  }
};

export default ApiService;
