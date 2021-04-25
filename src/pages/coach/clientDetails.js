import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, Media } from 'reactstrap';
import { Modal, Button } from 'react-bootstrap';


import ButtonCarousel from '../../components/ButtonCarousel';
import DailyMenu from '../../components/DailyMenu';
import DailyChecklist from '../../components/DailyChecklist';
import Prescription from '../../components/Prescription';

import MedicalReports from '../../components/MedicalReports'

import Appointment from '../../components/Appointment'
import {
    CardList,
    CardChecklist,
    FileEarmarkBarGraph,
    CalendarPlus,
    ChatRightText,
    Eject,
} from 'react-bootstrap-icons';

import './clientDetails.scss';

import "../../components/CustomComponent.css"
import axios from 'axios';
// import Calendar from '@fullcalendar/core/Calendar';

// const [show, setShow] = useState(false);

// const handleShow = () => setShow(true);
// const handleClose = async () => {
//     setShow(false);
// };

class ClientDetails extends React.Component {

    constructor() {
        console.log(localStorage.getItem("currUserId"), "??????>>>>>>>>>>>>>>>>")

        super();

        this.state = { dailyChecklist: true, dailyMenu: false, prescription: false, show: false, buttonNumber: 1, reports: false, appointment: false, modal: false, date: "01-04-2021" };
    }

    handleShow = () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: true, appointment: false, modal: false })
    };
    handleClose = async () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: false, appointment: false, modal: false })
    };

    showChecklist = () => {
        this.setState({ dailyChecklist: true, dailyMenu: false, prescription: false, show: false, appointment: false, modal: false });
    }

    showMenu = () => {
        this.setState({ dailyChecklist: false, dailyMenu: true, prescription: false, show: false, appointment: false, modal: false })
    }

    showPrescription = () => {
        this.setState({ dailyChecklist: false, dailyMenu: false, prescription: true, show: false, appointment: false, modal: false })
    }

    showRecords = () => {
        this.setState({ dailyChecklist: false, dailyMenu: false, prescription: false, show: false, reports: true, appointment: false, modal: false })
    }

    setButtonNumber = (value) => {
        this.setState({ ...this.state, buttonNumber: value })
    }

    showAppointment = () => {
        this.setState({ dailyChecklist: false, dailyMenu: false, prescription: false, show: false, reports: false, appointment: true, modal: false })
    }

    z
    handleModal = () => {
        this.setState({ ...this.state, modal: false })
    }
    doThis = async () => {
        try {
            console.log("ok")
            console.log(this.state.date, " this is dynamic date on tapping start")
            const DateToStart = this.state.date
            console.log(DateToStart.split("-"))
            await axios.get(`https://restorationbackend.herokuapp.com/api/coach/myClients/${localStorage.getItem("id")}/${localStorage.getItem("currUserId")}/${DateToStart}`).then(res => {
                console.log(res.data)
                window.location.pathname = "/branchcoach/client"
            })
        } catch (e) { console.log(e) }
    }


    startProgram = async () => {
        this.setState({ ...this.state, modal: true })

        // console.log(this.state.modal)
        //   console.log(this.state.date," this is dynamic date on tapping start")
        //   const DateToStart=this.state.date
        //   console.log(DateToStart.split("-").reverse())
        //   await  axios.get(`http://localhost:8000/api/coach/myClients/${localStorage.getItem("id")}/${localStorage.getItem("currUserId")}/${DateToStart}`).then(res => {
        //     console.log(res.data)
        //       window.location.pathname = "/branchcoach/client"
        //   })

        //         // console.log("called start progra")

        //         // console.log(this.state.modal)
        //         // const day = prompt("Enter day from where you want to start new program ")
        //         // console.log(value)

        //         console.log(localStorage.getItem("currUserDate"))
        //         const currentDate = localStorage.getItem("currUserDate")


        // const value = window.confirm(" Do you want to restart your program")
        // console.log(value)
        // if (value) {
        // console.log(res.datacon
        // axios.get(`https://restorationbackend.herokuapp.com/api/coach/myClients/${localStorage.getItem("id")}/${localStorage.getItem("currUserId")}/${currentDate}/${day}`).then(res => {
        // console.log("one finish")
        // axios.get(`https://restorationbackend.herokuapp.com/api/deleteCheck/${localStorage.getItem("currUserId")}`).then(res => {
        // console.log("in second")
        // console.log(res.data)
        // 
        // window.location.pathname = "/branchcoach/client"
        // window.location.pathname = "/branchcoach/client"
        // })
        // })
    }



    // console.log("called start progra")

    // console.log(this.state.modal)
    // const day = prompt("Enter day from where you want to start new program ")
    // console.log(value)

    // console.log(localStorage.getItem("currUserDate"))
    // const currentDate = localStorage.getItem("currUserDate")




    // }));

    // return (  <Modal show={true} >
    //     <Modal.Header closeButton>
    //       <Modal.Title>Add New Checklist Item</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //     <h5>hello</h5>
    //       {/* <Form>
    //         <Form.Row>
    //           <Row>
    //             <Col>
    //               <Form.Label>Name</Form.Label>
    //               <Form.Control
    //                 required
    //                 onChange={handleFormData}
    //                 name="name"
    //                 value={formData.name}
    //                 placeholder="e.g Apple ,Banana etc"
    //               />
    //             </Col>
    //             <Col>
    //               <Form.Label>Qunatity Or Target</Form.Label>
    //               <Form.Control
    //                 value={formData.quantity}
    //                 required
    //                 onChange={handleFormData}
    //                 name="quantity"
    //                 placeholder="e.g 4 or 5 apple"
    //               />
    //             </Col>
    //           </Row>
    //         </Form.Row>
    //       </Form> */}
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" >
    //         Cancel
    //       </Button>
    //       <Button variant="success">
    //         Submit
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>)
    // console.log(localStorage.getItem("currUserId"))
    // })



    // console.log(localStorage.getItem("id"), "this is <<<<<<<<<<<<<<<<<<<<<<<Local storage user")



    render() {

        // $( function() {
        //     $( "#datepicker" ).datepicker();
        //   } );


        console.log(this.state)
        let mainAreaContent = <h1>Hello</h1>;
        if (this.state.dailyChecklist) {
            mainAreaContent = <DailyChecklist buttonNumber={this.state.buttonNumber} className="" />;
        } else if (this.state.dailyMenu) {
            mainAreaContent = <DailyMenu buttonNumber={this.state.buttonNumber} className="daily-menu" />;
        } else if (this.state.prescription) {
            mainAreaContent = <Prescription className="" />;
        }
        else if (this.state.reports) {
            mainAreaContent = <MedicalReports />
        }
        else if (this.state.appointment) {
            mainAreaContent = <Appointment />
        }

        return (
            <div>
                <div className="client-details">
                    <br />
                    <ButtonCarousel class="" setButtonNumber={this.setButtonNumber} />
                    <Row>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card">
                                <CardBody className="p-0" >
                                    <h5 onClick={this.showChecklist} role="button">
                                        <CardChecklist className="icons mx-1" />
                                        Daily Checklist
                                    </h5>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 onClick={this.showMenu} role="button">
                                            <CardList className="icons" /> Daily Menu{' '}
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick={this.showRecords} role="button">
                                            {' '}
                                            <FileEarmarkBarGraph className="icons" /> Medical Report
                                        </h5>
                                        <Modal
                                            show={this.state.show}
                                            onHide={this.handleClose}
                                            className="text-center">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Medical Report</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Medical Report is not Available.</Modal.Body>
                                            <Modal.Footer>
                                                <div>
                                                    <Button
                                                        variant="success"
                                                        onClick={this.handleClose}
                                                        className="mr-2">
                                                        Ask for Medical Report
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={this.handleClose}
                                                        className="mr-5">
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Modal.Footer>
                                        </Modal>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick={this.showPrescription} role="button">

                                            <CalendarPlus className="icons" /> Prescription

                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                        {/* Profile */}
                        {/* <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0">
                                            <ChatRightText className="icons" /> Feedback
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col> */}
                        {/* <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0">
                                            <Eject className="icons" /> Health Progress
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col> */}

                        <Col md={2} xl={2} className="appointmentHolder">
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick={this.showAppointment} role="button">
                                            <Eject className="icons" /> Appointments
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md={2} xl={2}>
                            <Card className="client-details-card ">
                                <CardBody className="p-0">
                                    <Media body>
                                        <h5 className="mb-0" onClick={this.startProgram} role="button">
                                            Start Program
                                        </h5>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {(() => {



                    return (<Modal show={this.state.modal} onHide={this.handleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Select a day to start new program</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <Form> */}
                            {/* <input  type={Calendar}/> */}
                            <p>Date: <input type="date" id="selectDate" value={this.state.date} onChange={e => { console.log(this.setState({ ...this.state, date: e.target.value })) }} /></p>
                            {/* <Form.Row> */}
                            {/* <Row> */}
                            {/* <Col> */}
                            {/* <Form.Label>Name</Form.Label> */}
                            {/* <Form.Control
          required
          onChange={handleFormData}
          name="name"
          value={formData.name}
          placeholder="Name of disease"
        /> */}
                            {/* </Col> */}
                            {/* <Col> */}
                            {/* <Form.Label>Price</Form.Label> */}
                            {/* <Form.Control
          value={formData.price}
          required
          onChange={handleFormData}
          type="number"
          min="1"
          name="price"
          placeholder="Price"
        /> */
                            }
                            {/* </Col> */}
                            {/* </Row> */}
                            {/* </Form.Row> */}
                            {/* </Form> */}
                        </Modal.Body>
                        {/* {(()=>{ setisClickOnDelete(false)} )()} */}
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleDeleteModal}>
                                Cancel
</Button>
                            <Button variant="success" onClick={this.doThis}>
                                Start
</Button>
                        </Modal.Footer>
                    </Modal>)
                })()}


                <div className="client-details-option-expansion">
                    <br />
                    {mainAreaContent}
                </div>





            </div>
        );
    }
}
export default ClientDetails;
