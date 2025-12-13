import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/searchBar/SearchBar";
import { apiUtil, end_point } from "../../../utils/apiUtil";
import { handleError } from "../../../utils/errorAlertUtil";
import "./styles.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [params, setParams] = useState({});
  const navigate = useNavigate();

  const fields = [
    {
      type: "text",
      key: "name",
      label: "Tên",
    },
    {
      type: "app-select",
      endPointKey: "type",
      key: "typeId",
    },
  ];

  const getJobs = async () => {
    try {
      let url = `${end_point["job"]}?`;
      Object.keys(params).forEach((key) => {
        url += `&${key}=${params[key]}`;
      });
      url += `&status=PASS`;

      const res = await apiUtil.get(url);
      setJobs(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
  };

  useEffect(() => {
    getJobs();
  }, [params]);

  return (
    <div className="container">
      <div className="d-flex gap-2 pt-2 pb-2">
        <SearchBar fields={fields} setParentParams={setParams} />
      </div>
      {jobs.map((job) => (
        <div class="card">
          <div class="card-header">{job.typeId}</div>
          <div class="card-body">
            <h5 class="card-title">{job.name}</h5>
            <p class="card-text">ngày tạo: {job.createdDate}</p>
            <p class="card-text">ngày hết hạn: {job.expiredDate}</p>
            <button
              onClick={() => navigate(`/job/${job.id}`)}
              class="btn btn-primary"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
