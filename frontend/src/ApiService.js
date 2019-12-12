const ApiService = {
  AuthorsList: () => {
    return fetch("http://localhost:8000/api/author");
  },
  createAuthor: author => {
    return fetch("http://localhost:8000/api/author", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: author,
    });
  },
  nameList: () => {
    return fetch("http://localhost:8000/api/author/name");
  },
  bookList: () => {
    return fetch("http://localhost:8000/api/author/books");
  },
  removeAuthor: id => {
    return fetch(`http://localhost:8000/api/author/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
  },
  handleErrors: res => {
    if (!res.ok) {
      throw Error(res.responseText);
    }
    return res.json();
  }
};

export default ApiService;
