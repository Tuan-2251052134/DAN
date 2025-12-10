import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../../../components/searchBar/SearchBar";
import { authApiUtil, end_point } from "../../../../utils/apiUtil";
import { handleError } from "../../../../utils/errorAlertUtil";
import "./styles.css";

const JobseekerCVList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [list, setList] = useState([]);
  const [params, setParams] = useState({});
  const getData = async () => {
    try {
      let url = `${end_point["cv"]}?`;
      Object.keys(params).forEach((key) => {
        url += `&${key}=${params[key]}`;
      });
      const res = await authApiUtil().get(url);
      setList(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const fields = [
    {
      type: "text",
      key: "name",
      label: "Tên",
    },
  ];

  const navigateToCreate = () => {
    navigate("/jobseeker/cv/create");
  };

  return (
    <div className="container">
      <div className="d-flex mt-3">
        <SearchBar fields={fields} setParentParams={setParams} />
        <button onClick={navigateToCreate} className="btn btn-primary w-80px">
          tạo mới
        </button>
      </div>
      <div className="d-flex flex-wrap mt-5">
        {list.map((item) => (
          <div class="card" style={{ width: "18rem" }}>
            <iframe class="card-img-top" src={item.url} alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">{item.name}</h5>
              <a
                class="btn btn-primary"
                onClick={async () => {
                  const jobId = searchParams.get("jobId");
                  if (jobId) {
                    const apply = { jobId: jobId, cvId: item.id };
                    try {
                      await authApiUtil().post(end_point["apply"], apply);
                      alert("đã tạo thành công");
                    } catch (ex) {
                      handleError(ex);
                    }
                  } else {
                    navigate(`/jobseeker/cv/${item.id}`);
                  }
                }}
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobseekerCVList;
