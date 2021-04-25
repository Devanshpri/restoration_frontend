import React, { useState } from "react";

import axios from "axios";

export default () => {
  const [isFetchingOrders, setFetchingOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorFetchingOrder, setErrorFetchingOrder] = useState("");

  const fetchOrder = async () => {
    try {
      setFetchingOrders(true);
      setOrders([]);
      setErrorFetchingOrder("");
      const url = `${process.env.REACT_APP_API_URL}/userOrder`;
      // const { data } = await axios.get(url);
      const { data } = await axios.get("https://restorationbackend.herokuapp.com/api/userOrder");
      data.map(data => {
        return setOrders(prev => {
          return [...prev, { ...data, userId: data.userId?._id, name: data.userId?.full_name, phoneNumber: data.userId?.phone_number }]
        })
      })


      setFetchingOrders(false);
      // console.log(data);
      // setOrders(data);
    } catch (error) {
      setFetchingOrders(false);
      setOrders([]);
      setErrorFetchingOrder("");
    }
  };

  return [isFetchingOrders, orders, errorFetchingOrder, fetchOrder];
};
