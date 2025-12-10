export const handleError = (ex) => {
  switch (ex.status) {
    case 400:
    case 401:
    case 403:
      alert(ex.response.data.errorMessage);
      break;
    default:
      console.log(ex)
      alert("đã có lỗi từ phía server");
      break;
  }
};
 