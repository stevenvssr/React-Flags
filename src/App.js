import "./App.css";
import { useState, useEffect } from "react";
import Wrapper from "./Components/Wrapper";
import Header from "./Components/Header";
import Flag from "./Components/Flag";
import Info from "./Components/Info";
import ListItem from "./Components/ListItem";
import AllFlags from "./Components/AllFlags";
import { Button, Form, Modal } from "react-bootstrap";
import { FcGlobe } from "react-icons/fc";
import ButtonGrid from "./Components/ButtonGrid";

function App() {
  const [country, setCountry] = useState("");
  const [result, setResult] = useState({});
  const [all, setAll] = useState([]);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [region, setRegion] = useState([]);

  const handleClose = () => setShow(false);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => response.json())
      .then((data) => {
        setAll(data);
        setRegion(data);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          const { name, capital, flag, population, subregion } = data[0];
          setResult({
            name,
            capital,
            flag,
            population,
            subregion,
            language: data[0].languages[0].name || "unknown",
            currency: data[0].currencies[0].name || "unknown",
          });
          setShow(true);
          setCountry("");
        } else {
          setIsError(true);
        }
      });
  };

  const handleFlagClick = (e) => {
    fetch(`https://restcountries.eu/rest/v2/name/${e.target.alt}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]) {
          const { name, capital, flag, population, subregion } = data[0];
          setResult({
            name,
            capital,
            flag,
            population,
            subregion,
            language: data[0].languages[0].name,
            currency: data[0].currencies[0].name,
          });
        }
      });
    setShow(true);
  };

  return (
    <>
      <Header>
        Country Info App <FcGlobe />
      </Header>
      <Wrapper>
        <Form
          onSubmit={handleFormSubmit}
          style={{
            backgroundColor: "#11324D",
            padding: "20px",
            width: "50vw",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor="country"
              style={{
                fontWeight: "bold",
              }}
            >
              Country :
            </Form.Label>
            <Form.Control
              id="country"
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleFormSubmit}>Search</Button>
          {isError && <span style={{ color: "red" }}> Country not found.</span>}
        </Form>

        <br />
        <ButtonGrid>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy.filter((c) => c.subregion.includes("Asia")));
            }}
            variant="warning"
          >
            Asia
          </Button>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy.filter((c) => c.subregion.includes("Europe")));
            }}
            variant="success"
          >
            Europe
          </Button>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy.filter((c) => c.subregion.includes("Australia")));
            }}
            variant="white"
            style={{ border: "1px solid black", backgroundColor: "white" }}
          >
            Oceania
          </Button>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy.filter((c) => c.subregion.includes("Africa")));
            }}
            variant="danger"
          >
            Africa
          </Button>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy.filter((c) => c.subregion.includes("America")));
            }}
            variant="dark"
          >
            America
          </Button>
          <Button
            onClick={() => {
              const copy = [...all];
              setRegion(copy);
            }}
            variant="info"
          >
            All
          </Button>
        </ButtonGrid>
        <br />

        {result.population && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Body
              style={{
                textAlign: "center",
                backgroundColor: "#11324D",
                color: "white",
              }}
            >
              <Flag src={result.flag} />
              <h1>{result.name}</h1>
              <Info>
                <li>Capital: {result.capital}</li>
                <li>Language: {result.language}</li>
                <li>
                  Population:{" "}
                  {result.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </li>
                <li>Subregion: {result.subregion}</li>
                <li>Currency: {result.currency}</li>
              </Info>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#11324D" }}>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <AllFlags>
          {region.map((country) => {
            return (
              <ListItem
                key={country.numericCode}
                value={country.name}
                onClick={handleFlagClick}
              >
                <img src={country.flag} alt={country.name} />
                <span>{country.name}</span>
              </ListItem>
            );
          })}
        </AllFlags>
      </Wrapper>
    </>
  );
}

export default App;
