import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../app/actions";

let isFirst = true;
function Search() {
  const [searchValue, setSearchValue] = useState("");
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchValue) {
        if (isFirst) {
          return (isFirst = false);
        } else {
          return dispatch(search(data));
        }
      }

      const filteredData = data.filter((item) => {
        if (!item.trackName) {
          if (!item.artistName) {
            return false;
          }
          item.artistName = item.artistName.toLowerCase();
          return item.artistName.includes(searchValue.toLowerCase());
        }
        
        let { artistName, trackName } = item;

        artistName = artistName.toLowerCase();
        trackName = trackName.toLowerCase();
        return (
          artistName.includes(searchValue.toLowerCase()) ||
          trackName.includes(searchValue.toLowerCase())
        );
      });

      dispatch(search(filteredData));
    }, 800);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Input
      size="large"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search in this list"
    />
  );
}

export default Search;
