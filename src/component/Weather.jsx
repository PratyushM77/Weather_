import React, { useState, useEffect } from "react";

function Weather() {
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("Varanasi");
  const [error, setError] = useState(null);
  const [today, setToday] = useState("");
  const [tomorrow1, setTomorrow1] = useState("");
  const [tomorrow2, setTomorrow2] = useState("");
  const [tomorrow3, setTomorrow3] = useState("");
  const [tomorrow4, setTomorrow4] = useState("");
  const key = import.meta.env.VITE_API_KEY;
  const apiurl = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=5&aqi=yes&alerts=yes`;
  // used api of https://www.weatherapi.com/

  useEffect(() => {
    const daysofWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const today1 = today.getDay() % 7;
    setToday(daysofWeek[today1]);
    const tomorrowIndex1 = (today.getDay() + 1) % 7;
    setTomorrow1(daysofWeek[tomorrowIndex1]);
    const tomorrowIndex2 = (today.getDay() + 2) % 7;
    setTomorrow2(daysofWeek[tomorrowIndex2]);
    const tomorrowIndex3 = (today.getDay() + 3) % 7;
    setTomorrow3(daysofWeek[tomorrowIndex3]);
    const tomorrowIndex4 = (today.getDay() + 4) % 7;
    setTomorrow4(daysofWeek[tomorrowIndex4]);
  }, []);

  var date = new Date();

  console.log(cityData);

  const search = () => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          let response = await fetch(apiurl);
          let data = await response.json();
          if (response.ok) {
            setCityData(data);
          } else {
            setError(alert(data.error.message || "City not found."));
            error;
          }
        } catch (error) {
          console.error("Error fetching the weather data:", error);
        }
      };
      fetchData();
    });
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="mb-3 pt-5 xl:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              spellCheck="false"
              type="text"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search your City"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />

            {/* <!--Search icon--> */}
            <span
              className="input-group-text flex items-center cursor-pointer whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-900 dark:text-neutral-500"
              id="basic-addon2"
            >
              <svg
                onClick={() => search(cityName)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mt-16 lg:mt-35 lg:px-40 justify-center container mx-auto">
        <div className="flex flex-wrap w-full lg:w-auto">
          <div
            className="w-full lg:w-1/2 flex rounded-lg bg-auto"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80')",
            }}
          >
            <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
              <div className="mb-20">
                <h2 className="font-bold text-3xl leading-none pb-1">
                  {today}
                </h2>

                {cityData && (
                  <h3 className="leading-none pb-2 pl-1">
                    {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
                  </h3>
                )}
                {cityData && (
                  <p className="flex items-center opacity-85">
                    <svg
                      className="w-4 inline mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 425.963 425.963"
                    >
                      <path
                        d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
                        fill="white"
                      />
                    </svg>
                    {`${cityData.location.name.toUpperCase()}, ${cityData.location.country.toUpperCase()}`}
                  </p>
                )}
              </div>
              <div>
                <svg
                  className="w-16 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 129 129"
                >
                  <g>
                    <path
                      d="m64.5,92.6c15.5,0 28-12.6 28-28s-12.6-28-28-28-28,12.6-28,28 12.5,28 28,28zm0-47.9c11,0 19.9,8.9 19.9,19.9 0,11-8.9,19.9-19.9,19.9s-19.9-8.9-19.9-19.9c0-11 8.9-19.9 19.9-19.9z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m68.6,23.6v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m60.4,105.6v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m96.4,38.5l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m23.5,105.6c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m122.5,64.6c0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.8,4.1 4.1,4.1h12.9c2.2,1.42109e-14 4.1-1.8 4.1-4.1z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m10.6,68.7h12.9c2.3,0 4.1-1.8 4.1-4.1 0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.9,4.1 4.1,4.1z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m102.6,106.8c1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.9,1.2 2.9,1.2z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                    <path
                      d="m38.4,38.5c1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
                {cityData && (
                  <strong className="leading-none text-6xl block font-weight-bolder">
                    {cityData.current.temp_c.toFixed(0)}°C
                  </strong>
                )}
                {cityData && (
                  <b className="text-2xl block font-bold">
                    {cityData.current.condition.text}
                  </b>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex ml-0">
            <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
              <div className="flex justify-between w-full mb-4">
                <div className="w-auto font-bold uppercase text-90">
                  Precipitation
                </div>
                {cityData && (
                  <div className="text-right">
                    {cityData.current.precip_in} %
                  </div>
                )}
              </div>
              <div className="flex justify-between w-full mb-4">
                <div className="w-auto font-bold uppercase text-90">
                  Humidity
                </div>
                {cityData && (
                  <div className="text-right">
                    {cityData.current.humidity} %
                  </div>
                )}
              </div>
              <div className="flex justify-between w-full mb-8">
                <div className="w-auto font-bold uppercase text-90">Wind</div>
                {cityData && (
                  <div className="text-right">
                    {cityData.current.wind_kph} Km/h
                  </div>
                )}
              </div>

              <div className="flex flex-row">
                <div className="flex flex-col w-1/4 bg-gray-100 text-black rounded-lg pb-4">
                  <div className="text-center pt-2 mb-2">
                    <svg
                      className="w-10 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      viewBox="0 0 129 129"
                      enableBackground="new 0 0 129 129"
                    >
                      <g>
                        <path
                          d="m64.5,92.6c15.5,0 28-12.6 28-28s-12.6-28-28-28-28,12.6-28,28 12.5,28 28,28zm0-47.9c11,0 19.9,8.9 19.9,19.9 0,11-8.9,19.9-19.9,19.9s-19.9-8.9-19.9-19.9c0-11 8.9-19.9 19.9-19.9z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m68.6,23.6v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m60.4,105.6v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m96.4,38.5l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m23.5,105.6c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m122.5,64.6c0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.8,4.1 4.1,4.1h12.9c2.2,1.42109e-14 4.1-1.8 4.1-4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m10.6,68.7h12.9c2.3,0 4.1-1.8 4.1-4.1 0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.9,4.1 4.1,4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m102.6,106.8c1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.9,1.2 2.9,1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                        <path
                          d="m38.4,38.5c1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="text-center">
                    <b className="font-normal">{tomorrow1}</b>
                    <br />
                    {cityData && (
                      <strong className="text-xl">
                        {cityData.forecast.forecastday[1].day.avgtemp_c}°C
                      </strong>
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div className="text-center pt-2 mb-2">
                    <svg
                      className="w-10 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 33.062 33.062"
                      style={{ enableBackground: "new 0 0 33.062 33.062" }}
                      xmlSpace="preserve"
                    >
                      <path
                        d="M25.615,26.608H6.442C2.89,26.608,0,23.719,0,20.168c0-3.502,2.81-6.361,6.294-6.439c1.241-4.304,5.161-7.275,9.67-7.275   c3.736,0,7.101,2.023,8.866,5.306c0.26-0.026,0.522-0.04,0.784-0.04c4.106,0,7.446,3.339,7.446,7.443   C33.062,23.268,29.721,26.608,25.615,26.608z M6.527,14.732C3.437,14.732,1,17.17,1,20.168c0,2.999,2.441,5.439,5.442,5.439h19.173   c3.555,0,6.446-2.892,6.446-6.445c0-3.553-2.892-6.443-6.446-6.443c-0.314,0-0.63,0.022-0.939,0.066   c-0.229,0.063-0.469-0.046-0.574-0.259c-1.545-3.13-4.663-5.073-8.137-5.073c-4.183,0-7.803,2.839-8.804,6.904   c-0.056,0.228-0.278,0.372-0.498,0.381l-0.127-0.007C6.533,14.732,6.53,14.732,6.527,14.732z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <b className="font-normal">{tomorrow2}</b>
                    <br />
                    {cityData && (
                      <strong className="text-xl">
                        {cityData.forecast.forecastday[2].day.avgtemp_c}°C
                      </strong>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div className="text-center pt-2 mb-2">
                    <svg
                      className="w-10 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 33.062 33.062"
                      style={{ enableBackground: "new 0 0 33.062 33.062" }}
                      xmlSpace="preserve"
                    >
                      <path
                        d="M25.615,26.608H6.442C2.89,26.608,0,23.719,0,20.168c0-3.502,2.81-6.361,6.294-6.439c1.241-4.304,5.161-7.275,9.67-7.275   c3.736,0,7.101,2.023,8.866,5.306c0.26-0.026,0.522-0.04,0.784-0.04c4.106,0,7.446,3.339,7.446,7.443   C33.062,23.268,29.721,26.608,25.615,26.608z M6.527,14.732C3.437,14.732,1,17.17,1,20.168c0,2.999,2.441,5.439,5.442,5.439h19.173   c3.555,0,6.446-2.892,6.446-6.445c0-3.553-2.892-6.443-6.446-6.443c-0.314,0-0.63,0.022-0.939,0.066   c-0.229,0.063-0.469-0.046-0.574-0.259c-1.545-3.13-4.663-5.073-8.137-5.073c-4.183,0-7.803,2.839-8.804,6.904   c-0.056,0.228-0.278,0.372-0.498,0.381l-0.127-0.007C6.533,14.732,6.53,14.732,6.527,14.732z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <b className="font-normal">{tomorrow3}</b>
                    <br />
                    {cityData && (
                      <strong className="text-xl">
                        {cityData.forecast.forecastday[3].day.avgtemp_c}°C
                      </strong>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-1/4 bg-gray-100 text-black rounded-lg pb-4">
                  <div className="text-center pt-2 mb-2">
                    <svg
                      className="w-10 mx-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 129 129"
                    >
                      <g>
                        <path
                          d="m64.5,92.6c15.5,0 28-12.6 28-28s-12.6-28-28-28-28,12.6-28,28 12.5,28 28,28zm0-47.9c11,0 19.9,8.9 19.9,19.9 0,11-8.9,19.9-19.9,19.9s-19.9-8.9-19.9-19.9c0-11 8.9-19.9 19.9-19.9z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m68.6,23.6v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m60.4,105.6v12.9c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1,1.8-4.1,4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m96.4,38.5l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m23.5,105.6c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8,0l-9.1,9.1c-1.6,1.6-1.6,4.2 0,5.8z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m122.5,64.6c0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.8,4.1 4.1,4.1h12.9c2.2,1.42109e-14 4.1-1.8 4.1-4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m10.6,68.7h12.9c2.3,0 4.1-1.8 4.1-4.1 0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3,0-4.1,1.8-4.1,4.1 0,2.3 1.9,4.1 4.1,4.1z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m102.6,106.8c1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.9,1.2 2.9,1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                        <path
                          d="m38.4,38.5c1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l9.1,9.1c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2z"
                          data-original="#000000"
                          className="active-path"
                          data-old_color="#000000"
                          fill="#FFFFFF"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="text-center">
                    <b className="font-normal">{tomorrow4}</b>
                    <br />
                    {cityData && (
                      <strong className="text-xl">
                        {cityData.forecast.forecastday[4].day.avgtemp_c}°C
                      </strong>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
