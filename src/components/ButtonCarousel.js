import React, {
  useState,
} from 'react';
import Slider from 'react-slick';

import './ButtonCarousel/buttonCarousel.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ButtonCarousel ({setButtonNumber}){
		const settings = {
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 21,
				slidesToScroll: 18,
		};
		const currentUserDay = localStorage.getItem("currUserDate")
		const [currentActive, setCurrentActive] = useState(parseInt(currentUserDay))
		const buttons = [];

		const onDayChange = day => {
			setCurrentActive(day)
			setButtonNumber(day)
		}

		for (let index = 1; index < 91; index++) {
				buttons.push(<button
					onClick={() => onDayChange(index)}
					className={`btn btn-success btn-carousel-btn m-2 inactiveBtn ${index === currentActive ? " activeDay" : ""}`}>
					{index}
				</button>);
		}

		return (
				<div className="btn-carousel">
						<Slider {...settings}>
								{buttons}
						</Slider>
				</div>
		);
}

