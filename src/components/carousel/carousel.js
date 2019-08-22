import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BarLoader } from 'react-spinners';

import "./carousel.scss";
import getEmployees from "../../api/getEmployees";
import responsive from "./responsiveCarousel";

const EmployeeCarousel = () => {
  const [employees, setEmployees] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
      const fetchEmployees = async () => {
        setFetching(true);
        const response = await getEmployees();
        setEmployees(await response);
        if(response.length > 0 ){
          setFetching(false);
        }
      }
      if(!employees.length){
        fetchEmployees();
      }
  }, [employees, fetching]);


  const CustomLeftArrow = ({ onClick }) => (
    <i onClick={() => onClick()} className="custom-left-arrow" />
  );
  const CustomRightArrow = ({ onClick }) => (
    <i onClick={() => onClick()} className="custom-right-arrow" />
  );
  
    if(fetching){
      return (
        <div className="fetching-container">
          <BarLoader />
        </div>
      )
    } else {
      const employeeDiv = employees.map(employee => 
        <div className="employee_item" key={employee.email}>
          <div className="employee_item-img">
            <img 
              alt={`${employee.firstName} ${employee.lastName}`}
              src={employee.image + "?h=200"} />
          </div>
          <span className="employee_item-title">{employee.title}</span>
          <span className="employee_item-name">{employee.firstName} {employee.lastName}</span>
          <span className="employee_item-telephone">{employee.telephone}</span>
        </div>
      );

      return (
          <Carousel
            additionalTransfrom={-2 * 4}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            containerClass="carousel-container"
            infinite={true}
            partialVisbile={false}
            responsive={responsive}
          >
            {employeeDiv}
          </Carousel>
      );
    }
};
export default EmployeeCarousel;