import Select from "react-select";
import { handleError } from "../../utils/errorAlertUtil";
import { apiUtil, end_point } from "../../utils/apiUtil";
import { useEffect, useState } from "react";

const AppSelect = ({ setValue, endPointKey, defaultValue = [], value }) => {
  const [data, setData] = useState(defaultValue);
  const [offset, setOffset] = useState(0);
  const [keyword, setKeyword] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultValue[0]?.id) {
      setData(defaultValue);
    }
  }, [defaultValue]);

  const getData = async (offset, keyword) => {
    try {
      let url = `${end_point[endPointKey]}?`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }
      if (offset) {
        url += `&offset=${offset}`;
        const res = await apiUtil.get(url);
        setData([...data, ...res.data.data]);
      } else {
        const res = await apiUtil.get(url);
        setData(res.data.data);
      }
    } catch (ex) {
      handleError(ex);
    }
  };

  const onMenuOpen = () => {
    setIsOpen(true);
  };

  const onMenuClose = () => {
    setIsOpen(false);
  };

  const onChange = (value) => {
    setValue(value.id);
  };

  const onInputChange = (value) => {
    setKeyword(value);
  };

  const onMenuScrollToBottom = () => {
    setOffset(offset + 1);
  };

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        setOffset(0);
        getData(0, keyword);
      }, 1000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [keyword]);

  useEffect(() => {
    if (offset) {
      getData(offset, keyword);
    }
  }, [offset]);

  useEffect(() => {
    if (isOpen) {
      setOffset(0);
      getData(0, keyword);
    }
  }, [isOpen]);

  return (
    <Select
      value={data.filter((item) => item.id === value)[0]}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      onInputChange={onInputChange}
      options={data}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      onChange={onChange}
      onMenuScrollToBottom={onMenuScrollToBottom}
    />
  );
};

export default AppSelect;
