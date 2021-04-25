import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = () => {
	const [records,setRecords]=useState({})
	useEffect(() => {
    (async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/coach/myClients/${localStorage.getItem('id')}`);
        if (result.data) setRecords(result.data);
    })();
		}, []);
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="My All Clients "
                        title={records?.length || 0}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '10.21%',
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
