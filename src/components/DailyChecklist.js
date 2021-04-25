import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import "./ClientMenu/clientMenu.scss";

const DailyCheckList = function ({ buttonNumber }) {
  console.log(buttonNumber, ">>>>>>>>>>>>>")
  const [records, setRecords] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [inputNumber, setinputNumber] = useState(1)
  const [showCopyNextDay, setshowCopyNextDay] = useState(false)
  useEffect(() => {
    (async () => {

      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL
        }/coach/getChecklist/${buttonNumber}/${localStorage.getItem(
          "currUserId"
        )}`
      );
      console.log(buttonNumber, "pressd", result.data)
      console.log(result.data);
      if (result) setRecords(result?.data);
    })();
  }, [, buttonNumber, fetch]);


  let [showAddList, setShowAddList] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => {
    setShowAddList(false);
  };
  const handleShowAdmin = () => {
    setShowAddList(true);
  };
  const handleCloseCopyNextDay = () => {
    setshowCopyNextDay(false)
  }
  const OpenModalForInputNumber = () => {
    setshowCopyNextDay(true)
  }
  const CopyForNextDay = () => {
    // setshowCopyNextDay(true)
    console.log(inputNumber)

    const value = buttonNumber + 1
    const limit = buttonNumber + parseInt(inputNumber)
    // console.log(value + parseInt(inputNumber))
    for (let index = value; index <= limit; index++) {
    
      records.map(async rec => {
        try {
          await Axios.post(
            `${process.env.REACT_APP_API_URL
            }/coach/addChecklist/${index}/${localStorage.getItem(
              "currUserId"
            )}`,
            { name: rec.name, quantity: rec.quantity, unit: rec.unit }
          ).then(result => {
            console.log(result);
            setFetch(!fetch)
          }).catch(e => {
            console.log(e)
          })
        } catch (e) { console.log(e) }
      })

    }

    alert(` successfully coppied for next ${inputNumber} day`)
    setshowCopyNextDay(false)
  }

  const handleFormData = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  let submitForm = async () => {
    const { name, quantity } = formData;
    console.log(formData);
    if (!name || !quantity) {
      alert("Fill All the Fileds");
      return;
    }
    let res = await Axios.post(
      // console.log(formData,"sending")
      `${process.env.REACT_APP_API_URL
      }/coach/addChecklist/${buttonNumber}/${localStorage.getItem(
        "currUserId"
      )}`,
      { ...formData }
    );
    //   `http://localhost:8000/api/coach/addChecklist/${buttonNumber}/${localStorage.getItem(
    //     "currUserId"
    //   )}`,
    //   { ...formData }
    // );

    console.log(res.data)

    if (res.data.massage === "done") {
      if (formData._id) {
        alert("Checklist Updated");
      } else {
        alert("Checklist Added successfully");
      }
      setFetch(!fetch);
      setShowAddList(false);
      return;
    } else {
      console.log(res.data);
      alert("Validation error");
      return;
    }
  };

  let hanldeEdit = function (p) {
    setShowAddList(true);
    setFormData({ ...p });
  };

  let hanldeDelete = async (p) => {
    let res = await Axios.post(
      `${process.env.REACT_APP_API_URL
      }/coach/deleteChecklist/${localStorage.getItem("currUserId")}/${p._id}`
    );
    if (res.data.massage === "done") {
      alert("Checklist Deleted");
      setFetch(!fetch);
      return;
    } else {
      alert("Validation error");
      return;
    }
  };
  return (
    <div className="text-center">
      <div className="day-item m-auto">
        {records.length ? (
          <div class="card text-center check-food-list">
            <h4>Daily Checklist For Day {buttonNumber}</h4>
            <div class="card-body">
              <ul>
                {records.map((p) => {
                  console.log(p, "<<<<<<<<<<<<<<<<<<<<<this is[")
                  return (
                    <>
                      <li className="d-flex justify-content-between">
                        <h6 style={{ width: "100px" }}>{p?.name}</h6>
                        <h6 style={{ width: "100px" }}>{p?.quantity}</h6>
                        <h6 style={{ width: "100px" }}>{p?.unit}</h6>
                        <h6 style={{ width: "100px" }}>
                          {/* {(p?.percentageConsumed / 10) * 100}% Consumed */}
                          {parseInt((p?.currentValue / p.quantity) * 100)}% Consumed
                        </h6>

                        <button
                          className="btn btn-success"
                          onClick={() => {
                            hanldeEdit(p);
                          }}
                          clan
                        >
                          Edit{" "}
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            hanldeDelete(p);
                          }}
                        >
                          Delete{" "}
                        </button>
                      </li>
                      <hr />
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <h4>No Data Found for day {buttonNumber}</h4>
        )}
      </div>
      <Col className="text-center" style={{ marginTop: "10px" }}>
        <button className="btn btn-success" onClick={handleShowAdmin}>
          Add New
        </button>
        <button className="btn btn-success" onClick={OpenModalForInputNumber} style={{ marginLeft: "8px" }}>
          Copy for next day
        </button>
      </Col>
      <Modal show={showCopyNextDay} onHide={handleCloseCopyNextDay}>
        <Modal.Header closeButton>
          <Modal.Title>How many number of days you want to copy this checklist</Modal.Title>
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
      <Modal show={showAddList} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Checklist Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Row>
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    onChange={handleFormData}
                    name="name"
                    value={formData.name}
                    placeholder="e.g Apple ,Banana etc"
                  />
                </Col>
                <Col>
                  <Form.Label>Qunatity Or Target</Form.Label>
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
                    required
                    onChange={handleFormData}
                    name="unit"
                    value={formData.unit}
                    placeholder="e.g gram ,kg "
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
          <Button variant="success" onClick={submitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DailyCheckList;
