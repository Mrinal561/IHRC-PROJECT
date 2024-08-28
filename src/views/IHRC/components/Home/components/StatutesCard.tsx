import React from "react";
import { ScrollBar, Timeline } from "../../../../../components/ui";
import TimeLineItem from "../../../../../components/ui/Timeline/TimeLineItem";

const StatutesCard = () => {
    const paragraphs = [
    "Kerala Panchayat Raj Act, 1994 and Kerala Panchayat Raj (Profession Tax) Rules, 1996",
    "Apprentices Act, 1961 and Apprenticeship Rules, 1992",
    "Contract Labour (Regulation and Abolition) Act, 1970 & Bihar Contract Labour (Regulation and Abolition) Rules, 1972 (Applicable to Jharkhand)",
    "Factories Act, 1948 and State Factories Rules",
    "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
    "Payment of Gratuity Act, 1972 and Payment of Gratuity (Central) Rules, 1972",
    "Minimum Wages Act, 1948 and State Minimum Wages Rules",
    "Payment of Wages Act, 1936 and State Payment of Wages Rules",
    "Industrial Disputes Act, 1947 and Industrial Disputes (Central) Rules, 1957",
    "Maternity Benefit Act, 1961 and Maternity Benefit (Mines and Circus) Rules, 1963",
    "Equal Remuneration Act, 1976 and Equal Remuneration Rules, 1976",
    "Employee's Compensation Act, 1923 (formerly Workmen's Compensation Act)",
    "Child and Adolescent Labour (Prohibition and Regulation) Act, 1986",
    "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    "Trade Unions Act, 1926 and Trade Unions Regulations, 1938"
    ];
  
    return (
      <div className='border rounded-lg'>
        <div className='p-4'>
          <h1 className='font-semibold text-lg'>Applicable Statutes ({paragraphs.length})</h1>
        </div>
        <div className='h-[350px] py-4'>
          <ScrollBar autoHide>
            <div className='px-4'>
              <Timeline>
                {paragraphs.map((paragraph, index) => (
                  <TimeLineItem
                    key={index}
                    media={<div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />}
                  >
                    <p className='text-sm text-[#7583a2]'>{paragraph}</p>
                  </TimeLineItem>
                ))}
              </Timeline>
            </div>
          </ScrollBar>
        </div>
      </div>
    );
  };

export default StatutesCard;