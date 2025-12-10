import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authApiUtil, end_point } from "../../../../utils/apiUtil";
import { handleError } from "../../../../utils/errorAlertUtil";
import "./styles.css";

const JobseekerCVDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  console.log(data);
  const getData = async () => {
    try {
      const res = await authApiUtil().get(end_point["cv-detail"](id));
      setData(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("cvFile", data.cvFile);
      formData.append("name", data.name);
      const res = await authApiUtil().patch(
        end_point["cv-detail"](id),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("cập nhật thành công");
    } catch (ex) {
      handleError(ex);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <form onSubmit={submit} className={`form col-9`}>
          <div>tên CV</div>
          <input
            className="form-control"
            value={data?.name}
            onChange={(event) => {
              setData({ ...data, name: event.target.va });
            }}
          />
          <iframe src={data?.url} className="iframe" />
          <input
            className="form-control"
            type={"file"}
            onChange={(event) => {
              setData({ cvFile: event.target.files[0], ...data });
            }}
          />
          <div className="w-100 text-center">
            <button className="btn btn-primary" type="submit">
              cập nhật
            </button>
          </div>
        </form>

        <div className="mt-4 mb-4 radius-20 col-7 form">
          {data?.applys.map((apply) => (
            <div className="item gap-4 p-2 d-flex justify-content-between">
              <div className="itemStatus">{apply.status}</div>
              <div clasName="itemJobName">{apply.job.name}</div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/job/${apply.job.id}`);
                  }}
                >
                  xem công việc
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobseekerCVDetail;
