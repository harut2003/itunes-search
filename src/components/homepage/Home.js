import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MusicCard from "../music-card/MusicCard";
import Search from "../search/Search";
import styles from "./home.module.css";
function Home() {
  const information = useSelector(({ data }) => data);
  const filteredData = useSelector(({ filteredData }) => filteredData);
  const items = [];

  let [data, setData] = useState([]);
  for (let i = 0; i < 50; i++) {
    items.push(
      <Col key={i}>
        <MusicCard />
      </Col>
    );
  }

  useEffect(() => {
    if (!information.length) return;
    setData([...information]);
  }, [information]);

  useEffect(() => {
    if (filteredData) {
      setData([...filteredData]);
    }
  }, [filteredData]);

  return (
    <div>
      <Row className={styles.search_row} justify="space-around">
        <Col span={23}>
          <Search />
        </Col>
      </Row>

      <Row
        className={styles.row}
        gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}
        justify="space-around"
      >
        {information.length
          ? data.map((song, i) => (
              <Col key={i}>
                <MusicCard
                  artist={song.artistName}
                  track={song.trackName}
                  picture={song.artworkUrl100}
                  previewURL={song.previewUrl}
                  itunesURL={song.trackViewUrl}
                />
              </Col>
            ))
          : items}
      </Row>
    </div>
  );
}

export default Home;
