import axios from "axios";

export default async function detectCountry() {
  axios
    .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_KEY}`)
    .then((response) => response.data);
}
