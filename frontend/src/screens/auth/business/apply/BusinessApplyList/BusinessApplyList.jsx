import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { authApiUtil, end_point } from "../../../../../utils/apiUtil";
import { handleError } from "../../../../../utils/errorAlertUtil";

const BusinessApplyList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [applies, setApplies] = useState([]);
  const getData = async () => {
    try {
      const res = await authApiUtil().get(`${end_point["apply"]}?jobId=${id}`);
      console.log(res.data.data);
      setApplies(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <div className="d-flex mt-3">
        {/* <SearchBar fields={fields} setParentParams={setParams} /> */}
      </div>
      <div className="d-flex flex-wrap gap-5 mb-5 mt-5">
        {applies.map((item) => (
          <div className="card" key={item.id} style={{ width: "20rem" }}>
            <iframe
              className="card-img-top"
              src={item["cv.url"]}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item["cv.name"]}</h5>
              <p className="card-text">Ngày ứng tuyển: {item.createdDate}</p>
              <p className="card-text">Trạng thái: {item.status}</p>
              <a
                className="btn btn-primary"
                onClick={async () => {
                  navigate(`/business/job/${id}/apply/${item.id}`);
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

export default BusinessApplyList;
