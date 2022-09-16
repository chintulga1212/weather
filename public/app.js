const findCountry = async () => {
  document.querySelector("ol").innerHTML = "";
  const searchInput = document.querySelector("#search").value;
  const getData = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput}.json?access_token=pk.eyJ1IjoidHVydXV1dSIsImEiOiJjbDBhZW15ZHAwMGhjM2RtZjB6dnltZnhjIn0.HSb4dmJFSM2USxDkTsScDg`
  );
  const data = await getData.json();

  console.log(data);

  const listCountry = document.querySelector("ol");
  for (let i = 0; i < data.features.length; i++) {
    const findBtn = document.createElement("button");
    findBtn.innerText = "FIND";
    findBtn.onclick = () => {
      findWeather(data.features[i].center, data.features[i].place_name);
    };
    const liTag = document.createElement("li");
    // console.log(data.features[i].place_name);
    liTag.innerHTML = data.features[i].place_name;
    liTag.append(findBtn);
    listCountry.append(liTag);
  }
};

const findWeather = (center, place_name) => {
  secFunction(center[1], center[0], place_name);
};

const secFunction = async (lat, lng, place_name) => {
  try {
    const getData = await fetch(
      `https://api.darksky.net/forecast/81d38b9c958eb018e01083a72b0926b5/${lat},${lng}`
    );

    const data = await getData.json();
    console.log(data);
    const today = data.daily.data[0];
    const celsMax = parseInt(((today.temperatureMax - 32) * 5) / 9);
    const celsMin = parseInt(((today.temperatureMin - 32) * 5) / 9);
    //Date
    console.log(new Date(today.time * 1000).toDateString());
    document.querySelectorAll("p")[0].innerText = new Date(
      today.time * 1000
    ).toDateString();
    document.querySelectorAll("p")[1].innerText = new Date(
      today.time * 1000
    ).toDateString();
    // location
    document.querySelectorAll("h1")[0].innerText = place_name;
    document.querySelectorAll("h1")[1].innerText = place_name;
    //high temp
    console.log(celsMax);
    document.querySelector(".high").innerHTML = celsMax + "°";
    console.log(celsMin);
    document.querySelector(".low").innerHTML = celsMin + "°";
    // icon
    console.log(today.icon);
    document.querySelectorAll(".state")[0].innerHTML =
      today.icon[0].toUpperCase() + today.icon.slice(1);
    document.querySelectorAll(".state")[1].innerHTML =
      today.icon[0].toUpperCase() + today.icon.slice(1);
    //image
    switch (today.icon) {
      case "rain":
        document.querySelectorAll(".weather-icon")[0].src = "./Day Rain.png";
        document.querySelectorAll(".weather-icon")[1].src = "./Night Rain.png";
        break;
      case "cloudy":
        document.querySelectorAll(".weather-icon")[0].src =
          "./Day Wind.png";
        document.querySelectorAll(".weather-icon")[1].src =
          "./Night Wind.png ";
        break;
      default:
        document.querySelectorAll(".weather-icon")[0].src =
          "./Day Sun.png";
        document.querySelectorAll(".weather-icon")[1].src =
          "./Night Moon.png";
        break;
        case "snow":
        document.querySelectorAll(".weather-icon")[0].src = "./Day Snow.png";
        document.querySelectorAll(".weather-icon")[1].src = "./Night Snow.png";
        break;
        case "thunder":
          document.querySelectorAll(".weather-icon")[0].src = "./Day Storm.png";
          document.querySelectorAll(".weather-icon")[1].src = "./Night Rain.png";
          break;
    }
  } catch (error) {
    console.log(error);
  }
};
