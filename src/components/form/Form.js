import { Button, Col, Input, Row, Select } from "antd";
import Text from "antd/lib/typography/Text";
import { Formik } from "formik";
import styles from "./form.module.css";
import { useDispatch } from "react-redux";
import { addData } from "../../app/actions";
import { useNavigate } from "react-router";
const attributes = {
  movie: ["Movie", "Actor", "Artist", "Genre"],
  podcast: ["Title", "Language", "Author", "Genre"],
  music: ["Song", "Artist", "Album", "Genre"],
  tvShow: ["Show", "Genre", "Episode", "Rating"],
  audiobook: ["Title", "Author", "Genre", "Rating"],
};

const APInames = {
  Genre: "genreIndex",
  Actor: "actorTerm",
  Artist: "artistTerm",
  Movie: "movieTerm",
  Title: "titleTerm",
  Language: "languageTerm",
  Author: "authorTerm",
  Song: "songTerm",
  Album: "albumTerm",
  Show: "showTerm",
  Episode: "tvEpisodeTerm",
  Rating: "ratingIndex",
};
function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          term: "",
          media: "",
          attribute: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.term) {
            errors.term = "Required";
          }
          if (values.attribute === "Please select what do you want") {
            errors.attribute = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const sendingValues = { ...values };
          sendingValues.term = encodeURIComponent(sendingValues.term);
          let query = "";

          for (const key in sendingValues) {
            query += `${key}=${sendingValues[key]}&`;
          }
          query = query.slice(0, query.length - 1);

          dispatch(addData(query, setSubmitting, navigate));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Row className={styles.row}>
            <Col>
              <h1>Find your favorite music, podcast or movie on this site</h1>
              <form onSubmit={handleSubmit}>
                <Input.Group size="large">
                  <Input
                    name="term"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.term}
                    placeholder="Search"
                  />
                  <Text type="danger">
                    {errors.term && touched.term && errors.term}
                  </Text>
                </Input.Group>
                <br />
                <Input.Group>
                  <Select
                    as="select"
                    name="media"
                    onChange={(value) => {
                      setFieldValue("media", value);
                      setFieldValue(
                        "attribute",
                        "Please select what do you want"
                      );
                    }}
                    onBlur={handleBlur}
                    placeholder="All"
                    defaultValue="all"
                    className={styles.select}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="music">Music</Select.Option>
                    <Select.Option value="podcast">Podcast</Select.Option>
                    <Select.Option value="movie">Movie</Select.Option>
                    <Select.Option value="tvShow">TV Show</Select.Option>
                    <Select.Option value="audiobook">Audiobook</Select.Option>
                  </Select>
                </Input.Group>
                <br />
                {values.media !== "all" && values.media ? (
                  <>
                    <Input.Group>
                      <Select
                        as="select"
                        name="attribute"
                        onChange={(value) => {
                          setFieldValue("attribute", value);
                        }}
                        onBlur={handleBlur}
                        value={values.attribute}
                        placeholder={values.attribute}
                        className={styles.select}
                      >
                        {attributes[values.media].map((attribute, i) => {
                          return (
                            <Select.Option key={i} value={APInames[attribute]}>
                              {attribute}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Input.Group>
                    {errors.attribute && touched.attribute ? (
                      <>
                        {" "}
                        <Text type="danger">{errors.attribute}</Text>
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                    <br />
                  </>
                ) : (
                  ""
                )}

                <Button
                  type="primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={styles.select}
                >
                  Submit
                </Button>
              </form>
            </Col>
          </Row>
        )}
      </Formik>
    </div>
  );
}

export default Form;
