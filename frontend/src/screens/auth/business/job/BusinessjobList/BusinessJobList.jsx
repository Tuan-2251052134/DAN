import { useContext, useEffect, useState } from "react";
import Form from "../../../../../components/form/Form";
import { apiUtil, authApiUtil, end_point } from "../../../../../utils/apiUtil";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { handleError } from "../../../../../utils/errorAlertUtil";
import UserContext from "../../../../../context";
import SearchBar from "../../../../../components/searchBar/SearchBar";

const BusinessJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [params, setParams] = useState({});
  const { user } = useContext(UserContext);
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

  const navigateToCreate = () => {
    navigate(`/business/job/create`);
  };

  const getJobs = async () => {
    if (user) {
      try {
        let url = `${end_point["job"]}?`;
        Object.keys(params).forEach((key) => {
          url += `&${key}=${params[key]}`;
        });
        url += `&userId=${user.id}`;

        const res = await authApiUtil().get(url);
        setJobs(res.data.data);
      } catch (ex) {
        handleError(ex);
      }
    }
  };

  useEffect(() => {
    getJobs();
  }, [params, user]);

  return (
    <div className="container">
      <div className="d-flex gap-2 mt-2 pb-2">
        <SearchBar fields={fields} setParentParams={setParams} />
        <button className="btn btn-primary w-90px" onClick={navigateToCreate}>
          tạo mới
        </button>
      </div>
      {jobs.map((job) => (
        <div class="card mt-2">
          <div class="card-header">{job.typeId}</div>
          <div class="card-body">
            <h5 class="card-title">{job.name}</h5>
            <p class="card-text">ngày tạo: {job.createdDate}</p>
            <p class="card-text">ngày hết hạn: {job.expiredDate}</p>
            <p class="card-text">trạng thái: {job.status}</p>
            <button
              onClick={() => navigate(`/business/job/${job.id}`)}
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

export default BusinessJobList;
