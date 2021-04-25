import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = () => {
	const [records,setRecords]=useState({})
	useEffect(() => {
    (async () => {
				const branches = await axios.get(
            `${process.env.REACT_APP_API_URL}/sAdmin/branches`
				);
				let myBranches = branches?.data?.filter(b=>b.adminId===localStorage.getItem('id'))
				const clients = await axios.get(
            `${process.env.REACT_APP_API_URL}/bAdmin/myClients/${localStorage.getItem('id')}`
				);
				const coaches = await axios.get(
            `${process.env.REACT_APP_API_URL}/sAdmin/coaches`
        );
        setRecords({branches:myBranches.length,coaches:coaches.data?.length,user:clients.data.length});
    })();
		}, []);
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="All My Branches"
                        title={records?.branches || 0}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '10.21%',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="All Coaches"
                        title={records?.coaches || 0}
                        colors={['#f77e53']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="All My Clients"
                        title={records?.user || 0}
                        colors={['#43d39e']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '25.16%',
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
