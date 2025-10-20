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
  const [region, setRegion] = useState([]);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // Fetch all countries on mount and sort alphabetically
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,languages,currencies,population,cca3"
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAll(sorted);
        setRegion(sorted);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  // Search by country name
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true&fields=name,capital,flags,subregion,languages,currencies,population`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          const c = data[0];
          setResult({
            name: c.name.common,
            capital: c.capital ? c.capital[0] : "unknown",
            flag: c.flags.png,
            population: c.population,
            subregion: c.subregion,
            language: c.languages ? Object.values(c.languages)[0] : "unknown",
            currency: c.currencies
              ? Object.values(c.currencies)[0].name
              : "unknown",
          });
          setShow(true);
          setCountry("");
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true));
  };

  // Click on flag to show info
  const handleFlagClick = (e) => {
    const countryName = e.target.alt;
    fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,flags,subregion,languages,currencies,population`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          const c = data[0];
          setResult({
            name: c.name.common,
            capital: c.capital ? c.capital[0] : "unknown",
            flag: c.flags.png,
            population: c.population,
            subregion: c.subregion,
            language: c.languages ? Object.values(c.languages)[0] : "unknown",
            currency: c.currencies
              ? Object.values(c.currencies)[0].name
              : "unknown",
          });
          setShow(true);
        }
      });
  };

  // Filter countries by region and sort alphabetically
  const filterByRegion = (regionName) => {
    let filtered;
    if (regionName === "All") {
      filtered = all;
    } else {
      filtered = all.filter(
        (c) => c.subregion && c.subregion.includes(regionName)
      );
    }
    const sorted = filtered.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setRegion(sorted);
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
            <Form.Label htmlFor="country" style={{ fontWeight: "bold" }}>
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
          {["Asia", "Europe", "Australia", "Africa", "America", "All"].map(
            (regionName) => (
              <Button
                key={regionName}
                onClick={() => filterByRegion(regionName)}
                variant={
                  regionName === "Asia"
                    ? "warning"
                    : regionName === "Europe"
                    ? "success"
                    : regionName === "Australia"
                    ? "white"
                    : regionName === "Africa"
                    ? "danger"
                    : regionName === "America"
                    ? "dark"
                    : "info"
                }
                style={
                  regionName === "Australia"
                    ? { border: "1px solid black", backgroundColor: "white" }
                    : {}
                }
              >
                {regionName}
              </Button>
            )
          )}
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
          {region.length > 0 &&
            region.map((country) => (
              <ListItem
                key={country.cca3}
                value={country.name.common}
                onClick={handleFlagClick}
              >
                <img src={country.flags.png} alt={country.name.common} />
                <span>{country.name.common}</span>
              </ListItem>
            ))}
        </AllFlags>
      </Wrapper>
    </>
  );
}

export default App;
