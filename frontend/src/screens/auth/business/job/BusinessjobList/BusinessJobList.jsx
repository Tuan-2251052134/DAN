import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import JobCard from "../../../../../components/jobCard/JobCard";
import SearchBar from "../../../../../components/searchBar/SearchBar";
import UserContext from "../../../../../context";
import { authApiUtil, end_point } from "../../../../../utils/apiUtil";
import { handleError } from "../../../../../utils/errorAlertUtil";
import "./styles.css";

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
        <JobCard
          key={job.id}
          typeName={job["type.name"]}
          name={job.name}
          createdDate={job.createdDate}
          expiredDate={job.expiredDate}
          id={job.id}
          status={job.status}
        />
      ))}
    </div>
  );
};

export default BusinessJobList;
