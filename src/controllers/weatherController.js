let axios = require("axios");

let getCities = async function (req, res) {
  try {
    let city = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let result1 = [];
    for (let i = 0; i < city.length; i++) {
      
      let mk = { msg: city[i] };
      var options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=9cfd48069ef659510af6171c1c8c0532`,
      };
      let result = await axios(options);
      console.log(result.data);
      mk.temp = result.data.main.temp;
      result1.push(mk);
    }
    result1.sort(function (first, last) {
      return first.temp - last.temp;
    });
    res.status(200).send({ data: result1 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getCities = getCities;
