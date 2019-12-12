const ApiService = {
  AuthorsList: () => {
    return fetch("http://localhost:8000/api/author")
      .then(res => ApiService.handleErrors(res))
      .then(res => res.json());
  },
  createAuthor: author => {
    return fetch("http://localhost:8000/api/author", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: author,
    })
    .then(res => ApiService.handleErrors(res))
    .then(res => res.json());
  },
  nameList: () => {
    return fetch("http://localhost:8000/api/author/name")
      .then(res => ApiService.handleErrors(res))
      .then(res => res.json());
  },
  bookList: () => {
    return fetch("http://localhost:8000/api/author/books")
      .then(res => ApiService.handleErrors(res))
      .then(res => res.json());
  },
  removeAuthor: id => {
    return fetch(`http://localhost:8000/api/author/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then(res => ApiService.handleErrors(res))
      .then(res => res.json());
  },
  handleErrors: res => {
    if (res.ok === false) {
      throw Error(res.responseText);
    }
    return res;
  }
};

export default ApiService;
