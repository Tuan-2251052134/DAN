import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authApiUtil, end_point } from "../../../../../utils/apiUtil";
import { handleError } from "../../../../../utils/errorAlertUtil";

const BusinessApplyList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [applies, setApplies] = useState([]);
  const getData = async () => {
    try {
      const res = await authApiUtil().get(`${end_point["apply"]}?jobId=${id}`);
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
          <div class="card" style={{ width: "20rem" }}>
            <iframe
              class="card-img-top"
              src={item["cv.url"]}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{item["cv.name"]}</h5>
              <p class="card-text">Ngày ứng tuyển: {item.createdDate}</p>
              <p class="card-text">Trạng thái: {item.status}</p>
              <a
                class="btn btn-primary"
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
