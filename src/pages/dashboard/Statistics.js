import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = () => {
	const [records,setRecords]=useState({})
	useEffect(() => {
    (async () => {
        const user = await axios.get(
            `${process.env.REACT_APP_API_URL}/newClients`
				);
				const branches = await axios.get(
            `${process.env.REACT_APP_API_URL}/sAdmin/branches`
				);
				const coaches = await axios.get(
            `${process.env.REACT_APP_API_URL}/sAdmin/coaches`
        );
        setRecords({user:user.data?.length,branches:branches.data?.length,coaches:coaches.data?.length});
    })();
		}, []);
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="All Branches"
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
                        description="All Clients"
                        title={records?.user || 0}
                        colors={['#43d39e']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '25.16%',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="New Clients"
                        title={records?.user || 0}
                        colors={['#ffbe0b']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%',
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
