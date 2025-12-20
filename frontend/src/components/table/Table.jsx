import { useNavigate } from "react-router";
import "./styles.css";
import { authApiUtil, end_point } from "../../utils/apiUtil";
import { handleError } from "../../utils/errorAlertUtil";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import Loading from "../Loading/Loading";

const map = {
  id: "id",
  name: "Tên",

  districtId: "Quận",
  address: "Địa chỉ",
  role: "Vai trò",
  email: "Email",
  avatar: "Avatar",

  cityId: "Thành phố",
  status: "Trạng thái",
};

const Table = ({ list, setList, url, endPointKey, fields, searchFields }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState({ offset: 0 });
  const [isLoading, setLoading] = useState(true);

  const getList = async () => {
    setLoading(true);

    try {
      let url = `${end_point[endPointKey]}?`;
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url += `&${key}=${params[key]}`;
        }
      });
      const res = await authApiUtil().get(url);
      setList(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
    setLoading(false);
  };

  const deleteHandler = (id) => {
    return async () => {
      setLoading(true);
      try {
        await authApiUtil().delete(end_point[`${endPointKey}-detail`](id));
        const newDataList = list.filter((item) => item.id !== id);
        setList(newDataList);
      } catch (ex) {
        handleError(ex);
      }
      setLoading(false);
    };
  };

  useEffect(() => {
    getList();
  }, [params]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      <SearchBar fields={searchFields} setParentParams={setParams} />
      <div className="table-responsive w-100">
        <table className="table table-hover">
          <thead>
            <tr>
              {fields.map((item, index) => (
                <th scope="col" key={index}>
                  {map[item]}
                </th>
              ))}
              <th>Chi tiết</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {list.map((object, index) => (
              <tr key={object.id}>
                {fields.map((field, index) => (
                  <td key={index}>
                    {field === "avatar" ? (
                      <img className="w-20px" src={object[field]} />
                    ) : (
                      object[field]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`${url}/${object.id}`);
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={deleteHandler(object.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex gap-3 justify-content-center">
          {params.offset ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setParams({ ...params, offset: params.offset - 1 });
              }}
            >
              &lt;
            </button>
          ) : (
            <></>
          )}
          {list.length ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setParams({ ...params, offset: params.offset + 1 });
              }}
            >
              &gt;
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
