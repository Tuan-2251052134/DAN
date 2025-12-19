import Select from "react-select";
import AppSelect from "../appSelect/AppSelect";
import "./styles.css";
import { handleError } from "../../utils/errorAlertUtil";
import { useEffect, useState } from "react";
import { authApiUtil, end_point } from "../../utils/apiUtil";
import { useNavigate } from "react-router-dom";
import timeUtil from "../../utils/timeUtil";
import Loading from "../Loading/Loading";

const Form = ({
  fields,
  defaultValue = {},
  id,
  col4,
  endPointKey,
  afterSubmit,
  customSubmit,
  displayDelete = true,
  extraButtons = [],
}) => {
  const textInputList = [
    "email",
    "password",
    "text",
    "number",
    "datetime-local",
  ];
  const [data, setData] = useState(defaultValue);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await authApiUtil().get(
        end_point[`${endPointKey}-detail`](id)
      );
      const foundData = res.data.data;

      if (foundData) {
        setData({ ...foundData, ...data });
      } else {
        alert("thể loại này không tồn tại");
        navigate("/admin");
      }
    } catch (ex) {
      handleError(ex);
    }
    setLoading(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (customSubmit) {
        const newData = await customSubmit(data);
        if (!id) {
          afterSubmit?.(newData);
        }
        setLoading(false);
      } else {
        if (id) {
          await authApiUtil().put(end_point[`${endPointKey}-detail`](id), data);
          alert("cập nhật thành công");
        } else {
          const res = await authApiUtil().post(end_point[endPointKey], data);
          afterSubmit?.(res.data.data);
        }
      }
    } catch (ex) {
      handleError(ex);
    }
    setLoading(false);
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await authApiUtil().delete(end_point[`${endPointKey}-detail`](id));
      alert("đã xoá thành công");
      navigate(-1);
    } catch (ex) {
      handleError(ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    id && getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={submit} className={`form ${col4 ? "col-4" : "col-8"}`}>
      {fields.map((field, index) => {
        return (
          <>
            {textInputList.includes(field.type) && (
              <div class="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <input
                  disabled={field.disabled}
                  type={field.type}
                  class="form-control"
                  id={`input${index}`}
                  value={
                    field.type === "datetime-local"
                      ? timeUtil.convertToDate(data[field.key])
                      : data[field.key]
                  }
                  onChange={(event) => {
                    setData({ ...data, [field.key]: event.target.value });
                  }}
                />
              </div>
            )}
            {field.type === "file" && (
              <div class="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <input
                  disabled={field.disabled}
                  type={field.type}
                  class="form-control"
                  id={`input${index}`}
                  onChange={(event) => {
                    setData({ ...data, [field.key]: event.target.files[0] });
                  }}
                />
              </div>
            )}
            {field.type === "checkbox" && (
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={field.value}
                  disabled={field.disabled}
                  id={`input${index}`}
                />
                <label class="form-check-label" for={`input${index}`}>
                  {field.label}
                </label>
              </div>
            )}
            {field.type === "app-select" && (
              <div class="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <AppSelect
                  defaultValue={[
                    {
                      id: data[`${field.key}Id`],
                      name: data[`${field.key}.name`],
                    },
                  ]}
                  extraQueryKey={field.extraQueryKey}
                  extraQueryValue={
                    field.extraQueryValueKey && data[field.extraQueryValueKey]
                  }
                  value={data[`${field.key}Id`]}
                  endPointKey={field.endPointKey}
                  setValue={(id, name) => {
                    setData({
                      ...data,
                      [`${field.key}Id`]: id,
                      [`${field.key}.name`]: name,
                    });
                  }}
                />
              </div>
            )}
            {field.type === "iframe" && (
              <div class="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <div id={`input${index}`}>
                  <iframe src={data[field.key]} className="w-100 h-500px" />
                </div>
              </div>
            )}
            {field.type === "image" && (
              <div class="mb-3" key={index}>
                <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
                  <img
                    src={
                      data[field.key] &&
                      (typeof data[field.key] === "string"
                        ? data[field.key]
                        : URL.createObjectURL(data[field.key]))
                    }
                    className="login-image"
                  />
                </div>
                <input
                  class="form-control mt-2"
                  disabled={field.disabled}
                  type={"file"}
                  id={`input${index}`}
                  onChange={(event) => {
                    setData({ ...data, [field.key]: event.target.files[0] });
                  }}
                />
              </div>
            )}

            {field.type === "select" && (
              <div className="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <Select
                  value={
                    field.data.filter(
                      (item) => item.value === data[field.key]
                    )[0]
                  }
                  options={field.data}
                  onChange={(item) => {
                    setData({ ...data, [field.key]: item.value });
                  }}
                />
              </div>
            )}
            {field.type === "textarea" && (
              <div class="mb-3" key={index}>
                <label for={`input${index}`} class="form-label">
                  {field.label}
                </label>
                <textarea
                  disabled={field.disabled}
                  value={data[field.key]}
                  class="form-control"
                  id={`input${index}`}
                  onChange={(value) => {
                    setData({ ...data, [field.key]: value.target.value });
                  }}
                />
              </div>
            )}
          </>
        );
      })}
      {!id ? (
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Xác nhận
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center gap-3">
          <button type="submit" className="btn btn-primary">
            Xác nhận
          </button>
          {displayDelete && (
            <button
              type="button"
              onClick={deleteHandler}
              className="btn btn-danger"
            >
              Xoá
            </button>
          )}
          {extraButtons.map((button) => (
            <button
              type="button"
              onClick={() => {
                button.click(data);
              }}
              className="btn btn-primary"
            >
              {button.name}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default Form;
