import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../../components/searchBar/SearchBar";
import { apiUtil, end_point } from "../../../utils/apiUtil";
import { handleError } from "../../../utils/errorAlertUtil";
import "./styles.css";
import JobCard from "../../../components/jobCard/JobCard";

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
      key: "type",
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
      console.log(res.data.data);
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
        <JobCard
          url={"/job"}
          id={job.id}
          typeName={job["type.name"]}
          name={job.name}
          createdDate={job.createdDate}
          expiredDate={job.expiredDate}
        />
      ))}
    </div>
  );
};

export default Home;
