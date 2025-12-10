import { useState } from "react";
import AppSelect from "../AppSelect/AppSelect";
import "./styles.css";

const SearchBar = ({ fields, setParentParams }) => {
  const [params, setParams] = useState({});

  const submit = () => {
    setParentParams({ ...params, offset: 0 });
  };

  return (
    <div className="d-flex gap-2 align-items-center w-100 ps-2 pe-2">
      {fields.map((field, index) => (
        <>
          {field.type === "text" && (
            <div className={"w-100"}>
              <input
                type="text"
                key={index}
                class="form-control"
                id="exampleInputText"
                onChange={(event) => {
                  setParams({ ...params, [field.key]: event.target.value });
                }}
                placeholder={field.label}
              />
            </div>
          )}
          {field.type === "app-select" && (
            <div className="w-100">
              <AppSelect
                endPointKey={field.endPointKey}
                setValue={(value) => {
                  setParams({ ...params, [`${field.key}Id`]: value });
                }}
              />
            </div>
          )}
        </>
      ))}
      <div>
        <button className="btn btn-primary submit" onClick={submit}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
