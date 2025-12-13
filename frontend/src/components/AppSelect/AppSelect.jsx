import Select from "react-select";
import { handleError } from "../../utils/errorAlertUtil";
import { apiUtil, end_point } from "../../utils/apiUtil";
import { useEffect, useState } from "react";

const AppSelect = ({
  setValue,
  endPointKey,
  defaultValue = [],
  value,
  extraQueryKey,
  extraQueryValue,
}) => {
  const [data, setData] = useState(defaultValue);
  const [offset, setOffset] = useState({ value: 0 });
  const [keyword, setKeyword] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (check) {
      setValue(null);
    }
    setCheck(true);
  }, [extraQueryValue]);

  const getData = async (offset, keyword) => {
    try {
      let url = `${end_point[endPointKey]}?`;
      if (keyword) {
        url += `&keyword=${keyword}`;
      }

      if (extraQueryKey) {
        url += `&${extraQueryKey}=${extraQueryValue}`;
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
    setValue(value.id, value.name);
  };

  const onInputChange = (value) => {
    setKeyword(value);
  };

  const onMenuScrollToBottom = () => {
    setOffset({ value: offset.value + 1 });
  };

  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        offset.value = 0;
        getData(0, keyword);
      }, 1000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [keyword]);

  useEffect(() => {
    if (offset && isOpen) {
      getData(offset.value, keyword);
    }
  }, [offset]);

  useEffect(() => {
    if (isOpen) {
      offset.value = 0;
      getData(0, keyword);
    }
  }, [isOpen]);

  return (
    <Select
      data-testid="app-select"
      value={data.filter((item) => item.id === value)[0] ?? 0}
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
