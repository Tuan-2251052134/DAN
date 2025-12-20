const convertToDate = (date) => {
  const d = new Date(date); // nhận Date object, ISO string hoặc timestamp

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  const res = `${day}-${month}-${year}, ${hours}:${minutes}`;
  return res;
};

export default { convertToDate };
