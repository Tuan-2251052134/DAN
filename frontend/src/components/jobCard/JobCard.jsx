import { useNavigate } from "react-router";

import statusUtil from "../../utils/statusUtil";
import timeUtil from "./timeUtil";

const JobCard = ({
  typeName,
  name,
  createdDate,
  expiredDate,
  status,
  id,
  url,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card mt-2">
      <div className="card-header">{typeName}</div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">ngày tạo: {timeUtil.convertToDate(createdDate)}</p>
        <p className="card-text">
          ngày hết hạn: {timeUtil.convertToDate(expiredDate)}
        </p>
        {status && (
          <p
            className="card-text"
            style={{ color: statusUtil.statusMap[status].color }}
          >
            trạng thái: {statusUtil.statusMap[status].name}
          </p>
        )}
        <button
          onClick={() =>
            url ? navigate(`${url}/${id}`) : navigate(`/business/job/${id}`)
          }
          className="btn btn-primary"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default JobCard;
