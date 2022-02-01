import { AppleOutlined, DownloadOutlined } from "@ant-design/icons/lib/icons";
import { Card, Avatar, Skeleton, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { useSelector } from "react-redux";
import styles from "./music-card.module.css";
function MusicCard({ track, artist, picture, previewURL, itunesURL }) {
  const loading = useSelector(({ loading }) => loading);

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Button type="text" href={previewURL} className={styles.button_icon}>
          <DownloadOutlined />
        </Button>,
        <Button
          type="text"
          onClick={() => window.open(itunesURL, "_blank")}
          className={styles.button_icon}
        >
          <AppleOutlined />
        </Button>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={<Avatar src={picture} />}
          title={track}
          description={artist}
        />
      </Skeleton>
    </Card>
  );
}

export default MusicCard;
