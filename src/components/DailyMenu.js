import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Row, Col } from "reactstrap";

import { isFinite } from "lodash";

import "./ClientMenu/clientMenu.scss";

const DailyMenu = ({ buttonNumber }) => {
  const [fetch, setFetch] = useState(false);
  const [records, setRecords] = useState({});
  useEffect(() => {
    (async () => {
      // const result = await Axios.get(
      //   `${process.env.REACT_APP_API_URL
      //   }/${buttonNumber}/${localStorage.getItem("currUserId")}`
      // );
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL
        }/coach/getMenu/${buttonNumber}/${localStorage.getItem("currUserId")}`
      );
      if (result) setRecords(result.data);
    })();
  }, [buttonNumber, fetch]);

  const [breakFast, setBreakFast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [formData, setFormData] = useState({});
  const [showCopyNextDay, setshowCopyNextDay] = useState(false)
  const [inputNumber, setinputNumber] = useState(1)

  // const handleCloseCopyNextDay = () => {
  //   setshowCopyNextDay(false)
  // }
  const OpenModalForInputNumber = () => {
    setshowCopyNextDay(true)
    console.log("ok")
  }
  const CopyForNextDay = () => {
    // setshowCopyNextDay(true)
    // console.log(inputNumber)
    const start = parseInt(buttonNumber) + 1
    // console.log(records, "<<<this is records")
    const end = parseInt(buttonNumber) + inputNumber
    for (let index = start; index <= end; index++) {
      records.breakFast.map(async breakfast => {
        let res = await Axios.post(
          `${process.env.REACT_APP_API_URL
          }/coach/addMenu/${index}/${localStorage.getItem(
            "currUserId"
          )}/breakFast`,
          { name: breakfast.name, quantity: breakfast.quantity, unit: breakfast.unit }
        );
      })
      records.lunch.map(async breakfast => {
        let res = await Axios.post(
          `${process.env.REACT_APP_API_URL
          }/coach/addMenu/${index}/${localStorage.getItem(
            "currUserId"
          )}/lunch`,
          { name: breakfast.name, quantity: breakfast.quantity, unit: breakfast.unit }
        );
      })
      records.dinner.map(async breakfast => {
        let res = await Axios.post(
          `${process.env.REACT_APP_API_URL
          }/coach/addMenu/${index}/${localStorage.getItem(
            "currUserId"
          )}/dinner`,
          { name: breakfast.name, quantity: breakfast.quantity, unit: breakfast.unit }
        );
      })

    }
    // alert(`Menu has set for next ${inputNumber} days`)


    // const value = buttonNumber + 1
    // const limit = buttonNumber + parseInt(inputNumber)
    // // console.log(value + parseInt(inputNumber))
    // for (let index = value; index <= limit; index++) {

    //   records.map(async rec => {
    //     try {
    //       await Axios.post(
    //         `${process.env.REACT_APP_API_URL
    //         }/coach/addChecklist/${index}/${localStorage.getItem(
    //           "currUserId"
    //         )}`,
    //         { name: rec.name, quantity: rec.quantity, unit: rec.unit }
    //       ).then(result => {
    //         console.log(result);
    //         setFetch(!fetch)
    //       }).catch(e => {
    //         console.log(e)
    //       })
    //     } catch (e) { console.log(e) }
    //   })

    // }

    alert(` Successfully coppied for next ${inputNumber} day`)
    setshowCopyNextDay(false)
  }


  const handleCloseCopyNextDay = () => {
    setshowCopyNextDay(false)
  }

  const breakFastHandler = function () {
    setBreakFast(true);
  };

  const lunchHandler = function () {
    setLunch(true);
  };

  const dinnerHandler = function () {
    setDinner(true);
  };
  const breakFastSubmitHandler = async () => {
    const { name, quantity } = formData;
    if (!name || !quantity) {
      alert("Fill All the Fileds");
      return;
    }
    // console.log(formData, "<<<<<<<<<<<<<<<<<<<<")
    let res = await Axios.post(
      // `${process.env.REACT_APP_API_URL
      //   }/coach/addMenu/${buttonNumber}/${localStorage.getItem(
      //     "currUserId"
      //   )}/breakFast`,
      //   { ...formData }
      // );
      `${process.env.REACT_APP_API_URL
      }/coach/addMenu/${buttonNumber}/${localStorage.getItem(
        "currUserId"
      )}/breakFast`,
      { ...formData }
    );
    if (res.data.massage === "done") {
      if (formData._id) {
        alert("Breakfast Updated");
      } else {
        alert("Breakfast Added successfully");
      }
      setBreakFast(false);
      setFetch(!fetch);
      return;
    } else {
      alert("Validation error");
      return;
    }
  };

  const lunchSubmitHandler = async () => {
    const { name, quantity } = formData;
    console.log(formData)
    if (!name || !quantity) {
      alert("Fill All the Fileds");
      return;
    }
    let res = await Axios.post(
      `${process.env.REACT_APP_API_URL
      }/coach/addMenu/${buttonNumber}/${localStorage.getItem(
        "currUserId"
      )}/lunch`,
      { ...formData }
    );
    if (res.data.massage === "done") {
      if (formData._id) {
        alert("Lunch Updated");
      } else {
        alert("Lunch Added successfully");
      }
      setLunch(false);
      setFetch(!fetch);
      return;
    } else {
      alert("Validation error");
      return;
    }
  };

  let dinnerSubmitHandler = async () => {
    const { name, quantity } = formData;
  
    if (!name || !quantity) {
      alert("Fill All the Fileds");
      return;
    }
    // let res = await Axios.post(
    //   `${process.env.REACT_APP_API_URL
    //   }/${buttonNumber}/${localStorage.getItem(
    //     "currUserId"
    //   )}/dinner`,
    //   { ...formData }
    // );
     let res = await Axios.post(
      `${process.env.REACT_APP_API_URL
      }/coach/addMenu/${buttonNumber}/${localStorage.getItem(
        "currUserId"
      )}/dinner`,
      { ...formData }
    );
    console.log(res.data)
    if (res.data.massage === "done") {
      if (formData._id) {
        alert("Lunch Updated");
      } else {
        alert("Lunch Added successfully");
      }
      setLunch(false);
      setFetch(!fetch);
      return;
    } else {
      alert("Validation error");
      return;
    }
  };

  const handleClose = () => {
    setDinner(false);
    setBreakFast(false);
    setLunch(false);
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="text-center">
        <h4>Menu Of Day {buttonNumber}</h4>
        <button
          className="btn btn-success"
          onClick={OpenModalForInputNumber}
          style={{ width: "200px", marginLeft: "50px", fontSize: "1.2rem" }}
        >
          Copy for next day
            </button>
        {/* <button onClick={OpenModalForInputNumber}>copy for next day</button> */}
      </div>
      <div className="container daily-list-container d-flex flex-row justify-content-center mt-3">
        <div className="day-item mt-2 p-0 d-flex flex-row justify-content-between">
          {/* <h1>djgfsgdy</h1> */}
          <div class="card text-center food-list">
            <div class="card-header text-center">
              <h3>Breakfast</h3>
            </div>
            {records.breakFast?.length ? (
              <div class="card-body">
                <ul>
                  {records.breakFast.map((b) => {
                    const unit = isFinite(parseInt(b.quantity)) ? "" : "";
                    return (
                      <>
                        <li className="d-flex justify-content-around">
                          <h6>{b.name}</h6>
                          <h6>
                            {b.quantity} 
                          </h6>
                          <h6>
                            {b.unit} 
                          </h6>
                        </li>
                        <hr />
                      </>
                    );
                  })}
                </ul>
              </div>
            ) : (
                <h4>No Breakfast</h4>
              )}
            <button
              className="btn btn-success"
              onClick={breakFastHandler}
              style={{ width: "120px", marginLeft: "50px" }}
            >
              Add BreakFast
            </button>
          </div>

          <div class="card text-center food-list">
            <div class="card-header">
              <h3>Lunch</h3>
            </div>
            {records.lunch?.length ? (
              <div class="card-body">
                <ul>
                  {records.lunch.map((b) => {
                    const unit = isFinite(parseInt(b.quantity)) ? "" : "";
                    return (
                      <>
                        <li className="d-flex justify-content-around">
                          <h6>{b.name}</h6>
                          <h6>
                            {b.quantity} 
                          </h6>
                          <h6>
                            {b.unit} 
                          </h6>
                        </li>
                        <hr />
                      </>
                    );
                  })}
                </ul>
              </div>
            ) : (
                <h4>No Lunch</h4>
              )}
            <button
              className="btn btn-success"
              onClick={lunchHandler}
              style={{ width: "120px", marginLeft: "50px" }}
            >
              Add Lunch
            </button>
          </div>
          <div class="card text-center food-list">
            <div class="card-header">
              <h3>Dinner</h3>
            </div>
            {records.dinner?.length ? (
              <div class="card-body">
                <ul>
                  {records.dinner.map((b) => {
                    const unit = isFinite(parseInt(b.quantity)) ? "" : "";
                    return (
                      <>
                        <li className="d-flex justify-content-around">
                          <h6>{b.name}</h6>
                          <h6>
                            {b.quantity} 
                          </h6>
                          <h6>
                            {b?.unit} 
                          </h6>
                        </li>
                        <hr />
                      </>
                    );
                  })}
                </ul>
              </div>
            ) : (
                <h4>No Dinner</h4>
              )}
            <button
              className="btn btn-success"
              onClick={dinnerHandler}
              style={{ width: "120px", marginLeft: "50px" }}
            >
              Add Dinner
            </button>
          </div>
        </div>
      </div>

      <Modal show={lunch} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lunch Item for Day {buttonNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  <Form.Label>Menu Name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleFormData}
                    name="name"
                    value={formData.name}
                    placeholder="e.g Apple ,Banana etc"
                  />
                </Col>
                <Col>
                  <Form.Label>Qunatity</Form.Label>
                  <Form.Control
                    value={formData.quantity}
                    required
                    onChange={handleFormData}
                    name="quantity"
                    placeholder="e.g 4 or 5 apple"
                  />
                </Col>
                <Col>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    value={formData.unit}
                    required
                    onChange={handleFormData}
                    name="unit"
                    placeholder="e.g gram ,liter"
                  />
                </Col>
              </Row>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={lunchSubmitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={dinner} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Dinner Item for Day {buttonNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  <Form.Label>Menu Name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleFormData}
                    name="name"
                    value={formData.name}
                    placeholder="e.g Apple ,Banana etc"
                  />
                </Col>
                <Col>
                  <Form.Label>Qunatity</Form.Label>
                  <Form.Control
                    value={formData.quantity}
                    required
                    onChange={handleFormData}
                    name="quantity"
                    placeholder="e.g 4 or 5 apple"
                  />
                </Col>
                <Col>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    value={formData.unit}
                    required
                    onChange={handleFormData}
                    name="unit"
                    placeholder="e.g gram ,liter"
                  />
                </Col>
              </Row>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={dinnerSubmitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={breakFast} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add New Breakfast Item for Day {buttonNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  <Form.Label>Menu Name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleFormData}
                    name="name"
                    value={formData.name}
                    placeholder="e.g Apple ,Banana etc"
                  />
                </Col>
                <Col>
                  <Form.Label>Qunatity</Form.Label>
                  <Form.Control
                    value={formData.quantity}
                    required
                    onChange={handleFormData}
                    name="quantity"
                    placeholder="e.g 4 or 5 apple"
                  />
                </Col>
                <Col>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    value={formData.unit}
                    required
                    onChange={handleFormData}
                    name="unit"
                    placeholder="e.g gram ,liter"
                  />
                </Col>
              </Row>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={breakFastSubmitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCopyNextDay} onHide={handleCloseCopyNextDay}>
        <Modal.Header closeButton>
          <Modal.Title>How many number of days you want to copy this Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  {/* <imput type="Number" value={inputNumber} placeholder="enter value" onChange={(value) => { setinputNumber(value) }} /> */}
                  <Form.Label>Enter days</Form.Label>
                  <Form.Control
                    required
                    onChange={value => { setinputNumber(value.target.value) }}
                    name="inputNumber"
                    value={inputNumber}
                    placeholder="e.g 1,3,4"
                  />
                </Col>
                {/* <Col>
                  <Form.Label>Qunatity Or Target</Form.Label>
                  <Form.Control
                    value={formData.quantity}
                    required
                    onChange={handleFormData}
                    name="quantity"
                    placeholder="e.g 4 or 5 apple"
                  />
                </Col> */}
                {/* <Col>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control
                    required
                    onChange={handleFormData}
                    name="unit"
                    value={formData.unit}
                    placeholder="e.g gram ,kg "
                  />
                </Col> */}
              </Row>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCopyNextDay}>
            Cancel
          </Button>
          <Button variant="success" onClick={CopyForNextDay}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DailyMenu;
