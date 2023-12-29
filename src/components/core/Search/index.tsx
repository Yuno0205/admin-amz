import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { searchEmployees } from "../../../redux/employeeSlice";
import { useEffect } from "react";

// ...

const SearchComponent = () => {
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    dispatch(searchEmployees(value));
  };

  return (
    <Search placeholder="Search ..." enterButton onSearch={handleSearch} />
  );
};

export default SearchComponent;
