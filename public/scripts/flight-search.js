function showSuggestion(fromId) {
  const fromInput = document.getElementById(fromId);
  const searchInput = document.getElementById(`${fromId}-searchInput`);
  const popup = document.getElementById(`${fromId}-popup`);
  const suggestionsContainer = document.getElementById(`${fromId}-suggestions`);
  const airportDetails = document.getElementById(`${fromId}-airport`);
  openPopup();

  searchInput.addEventListener("input", async function () {
    const inputValue = searchInput.value.trim();

    if (inputValue.length > 0) {
      const resp = await fetch(`/api/get-airports?keyword=${inputValue}`);
      if (resp.status == 200) {
        const airports = await resp.json();
        displaySuggestions(airports);
      }
    } else {
      suggestionsContainer.innerHTML = "";
    }
  });

  window.addEventListener("click", (event) => {
    if (
      !event.target.matches(`#${fromId}`) &&
      !event.target.matches(`.${fromId}-searchInput`)
    ) {
      closePopup();
    }
  });

  function openPopup() {
    popup.style.display = "block";
    fromInput.style.display = "none";
    searchInput.focus();
  }

  function closePopup() {
    popup.style.display = "none";
    fromInput.style.display = "block";
  }

  function displaySuggestions(suggestions) {
    const suggestionsList = suggestions
      .map(
        (airport) =>
          `<li>
            <span id="cityName" style="font-size: 15px; font-weight: 400;">${airport?.address?.cityName}(
              <span id="iataCode">${airport.iataCode}</span>)</span> 
              <p id="airportName" style="font-size: 12px; font-weight: 300; margin-top: -5px;">${airport.name}</p>
          </li>`,
      )
      .join("");
    suggestionsContainer.innerHTML = suggestionsList;

    const suggestionItems = suggestionsContainer.querySelectorAll("li");
    suggestionItems.forEach((item) => {
      const iataCodeElement = item.querySelector("#iataCode");
      const cityNameElement = item.querySelector("#cityName");
      const airporNameElement = item.querySelector("#airportName");
      item.addEventListener("click", function () {
        const iataCode = iataCodeElement.textContent;
        const cityName = cityNameElement.textContent;
        const airporName = airporNameElement.textContent;
        fromInput.value = iataCode;
        airportDetails.innerHTML = `${cityName}, ${airporName}`;
        closePopup();
      });
    });
  }
}

async function submitSearch(event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById("flight-search-form"));
  const flightLitsContainer = document.getElementById("flight-list-container");
  const inputValues = Object.fromEntries(formData.entries());
  const payload = {
    departureDate: inputValues.date,
    departureLocation: inputValues.from,
    arrivalLocation: inputValues.to,
    adults: inputValues.adults,
    children: inputValues.children,
    infants: inputValues.infants,
    travelClass: inputValues.class,
  };

  try {
    const resp = await fetch(`/api/get-flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (resp.status == 200) {
      const flights = await resp.json();
      const flightList = flights
        .map(
          (item) => `<div style="border: 2px solid black;">
            <div class="row" style="width: 60vw;">
              <div class="col" style="text-align: left;">${item.itineraries[0]?.segments[0]?.departure?.iataCode}</div>
              <div class="col" style="text-align: left;">---${item?.itineraries[0]?.duration}---</div>
              <div class="col" style="text-align: right;">${item.itineraries[0]?.segments[0]?.arrival?.iataCode}</div>
            </div>
            <div class="row" style="width: 60vw;">
              <div class="col" style="text-align: left;">${item.itineraries[0]?.segments[0]?.departure?.at}</div>
              <div class="col" style="text-align: left;">${item?.price?.total}</div>
              <div class="col" style="text-align: right;">${item.itineraries[0]?.segments[0]?.arrival?.at}</div>
            </div>
          </div>`,
        )
        .join("");
      flightLitsContainer.innerHTML = flightList;
    }
  } catch (err) {
    console.log(err);
  }
}
