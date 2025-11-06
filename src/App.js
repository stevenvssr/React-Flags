import "./App.css";
import React, { useState, useEffect, useRef } from "react";

// Components
import { HeaderWrapper, Title, FlagText } from "./Components/Header";
import Wrapper from "./Components/Wrapper";
import ListItem from "./Components/ListItem";
import AllFlags from "./Components/AllFlags";
import ButtonGrid from "./Components/ButtonGrid";
import FilterButton from "./Components/FilterButton";
import CountryModal from "./Components/CountryModal";
import {
  SuggestionContainer,
  SuggestionItem,
} from "./Components/SuggestionList";

// Dependencies
import { Button, Form } from "react-bootstrap";
import { FcGlobe } from "react-icons/fc";

// --- API Endpoints ---
const ALL_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,languages,currencies,population,cca3,region";
const SINGLE_COUNTRY_URL = "https://restcountries.com/v3.1/name/";

// --- Helper: Format country data consistently ---
const formatCountryData = (c) => ({
  name: c.name.common,
  capital: c.capital?.[0] || "unknown",
  flag: c.flags.png,
  population: c.population,
  subregion: c.subregion,
  language: Object.values(c.languages || {})[0] || "unknown",
  currency: Object.values(c.currencies || {})[0]?.name || "unknown",
});

function App() {
  // Data state
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);

  // Search & suggestions
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Modal
  const [modalResult, setModalResult] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Errors & region
  const [isError, setIsError] = useState(false);
  const [activeRegion, setActiveRegion] = useState("All");

  const inputRef = useRef(null);

  const handleCloseModal = () => setShowModal(false);

  // 1. Fetch all countries on mount
  useEffect(() => {
    fetch(ALL_COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setAllCountries(sorted);
        setDisplayedCountries(sorted);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  // 2. Update suggestions on input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsError(false);
    setFocusedIndex(-1);

    if (value.length > 1) {
      const filtered = allCountries
        .filter((c) =>
          c.name.common.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((c) => c.name.common)
        .slice(0, 8);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // 3. Click suggestion
  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setSuggestions([]);
    setFocusedIndex(-1);
    processSearch(name);
  };

  // 4. Search processing
  const processSearch = async (searchName) => {
    setIsError(false);
    setSuggestions([]);

    if (!searchName) return;

    const exactMatch = allCountries.find(
      (c) => c.name.common.toLowerCase() === searchName.toLowerCase()
    );

    if (exactMatch) {
      setModalResult(formatCountryData(exactMatch));
      setShowModal(true);
      setSearchQuery("");
      return;
    }

    try {
      const res = await fetch(
        `${SINGLE_COUNTRY_URL}${searchName}?fullText=true`
      );
      const data = await res.json();
      if (!data[0]) throw new Error("Country not found");
      setModalResult(formatCountryData(data[0]));
      setShowModal(true);
      setSearchQuery("");
    } catch {
      setIsError(true);
    }
  };

  // 5. Handle keyboard navigation
  // --- KeyDown Handler for Input (FIX APPLIED HERE) ---
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      // FIX: Stop propagation to prevent the modal's document listener
      // from instantly closing the newly opened modal.
      e.stopPropagation();
      e.preventDefault(); // Prevent form submission

      let selected;
      if (focusedIndex >= 0) {
        // 1. A suggestion is actively highlighted using arrow keys
        selected = suggestions[focusedIndex];
      } else if (suggestions.length > 0) {
        // 2. No suggestion is highlighted, but suggestions exist: use the top suggestion
        selected = suggestions[0];
      } else {
        // 3. No suggestions visible: search the raw input text
        selected = searchQuery;
      }

      setSearchQuery(selected);
      setSuggestions([]);
      setFocusedIndex(-1);
      processSearch(selected);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setFocusedIndex(-1);
    }
  };

  // --- Form Submit Handler ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    processSearch(searchQuery);
    setSuggestions([]);
    setFocusedIndex(-1);
  };

  // 7. Flag click
  const handleFlagClick = (cca3) => {
    const clickedCountry = allCountries.find((c) => c.cca3 === cca3);
    if (clickedCountry) {
      setModalResult(formatCountryData(clickedCountry));
      setShowModal(true);
    }
  };

  // 8. Filter by region
  const filterByRegion = (regionName) => {
    setActiveRegion(regionName);
    if (regionName === "All") {
      setDisplayedCountries(allCountries);
      return;
    }
    const filtered = allCountries.filter(
      (c) => c.region && c.region.toLowerCase() === regionName.toLowerCase()
    );
    setDisplayedCountries(filtered);
  };

  return (
    <>
      <HeaderWrapper>
        <Title>
          <FlagText>Fun with Flags</FlagText>
          <FcGlobe style={{ fontSize: "2.5rem" }} />
        </Title>
      </HeaderWrapper>

      <Wrapper>
        {/* Search Form */}
        <Form
          onSubmit={handleFormSubmit}
          style={{
            background: "linear-gradient(145deg, #181c2e, #0c101d)",
            padding: "25px",
            width: "100%",
            maxWidth: "550px",
            borderRadius: "10px",
            color: "#f0f0f0",
            boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
          }}
        >
          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label htmlFor="country" style={{ fontWeight: "bold" }}>
              Search by Country:
            </Form.Label>
            <Form.Control
              id="country"
              type="text"
              placeholder="Enter full country name..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              style={{
                backgroundColor: "#0c101d",
                color: "#f0f0f0",
                border: "1px solid #ffb830",
                boxShadow: "0 0 5px rgba(255, 184, 48, 0.5)",
              }}
            />

            {suggestions.length > 0 && (
              <SuggestionContainer>
                {suggestions.map((name, index) => (
                  <SuggestionItem
                    key={name}
                    onClick={() => handleSuggestionClick(name)}
                    className={index === focusedIndex ? "focused" : ""}
                  >
                    {name}
                  </SuggestionItem>
                ))}
              </SuggestionContainer>
            )}
          </Form.Group>
          <Button onClick={handleFormSubmit} variant="warning">
            Search
          </Button>
          {isError && (
            <span style={{ color: "#ff8c8c", marginLeft: "10px" }}>
              Country not found.
            </span>
          )}
        </Form>

        <br />

        {/* Region Buttons */}
        <ButtonGrid>
          {["Asia", "Europe", "Oceania", "Africa", "Americas", "All"].map(
            (regionName) => (
              <FilterButton
                key={regionName}
                onClick={() => filterByRegion(regionName)}
                className={activeRegion === regionName ? "active" : ""}
              >
                {regionName}
              </FilterButton>
            )
          )}
        </ButtonGrid>
        <br />

        {/* Modal */}
        <CountryModal
          show={showModal}
          onClose={handleCloseModal}
          result={modalResult}
        />

        {/* Flags Grid */}
        <AllFlags>
          {displayedCountries.length > 0 ? (
            displayedCountries.map((country) => (
              <ListItem
                as="button"
                key={country.cca3}
                onClick={() => handleFlagClick(country.cca3)}
                aria-label={`Show info for ${country.name.common}`}
              >
                <img src={country.flags.png} alt={country.name.common} />
                <span>{country.name.common}</span>
              </ListItem>
            ))
          ) : (
            <p
              style={{
                color: "white",
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              No countries found for this region.
            </p>
          )}
        </AllFlags>
      </Wrapper>
    </>
  );
}

export default App;
