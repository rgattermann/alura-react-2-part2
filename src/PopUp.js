import M from "materialize-css";

const PopUp = {
  showMessage: (type, message) => {
    M.toast({
      html: message,
      classes: type === "success" ? "green" : "red",
      displayLength: 2000
    });
  }
};

export default PopUp;
