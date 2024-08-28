import React, { useState } from "react";
import { Card, Dialog } from "../../../../../components/ui";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export interface Data {
    id: number;
    title: string;
    content: string;
    date: string;
    lawDescription: string;
    keyPoints: string[];
    effectiveDate: string;
}

export const UpdateData: Data[] = [
  {
    id: 1,
    title: "Income Tax Act Amendment",
    content: "Recent amendments to the Income Tax Act have introduced new provisions for claiming deductions on work-from-home expenses.",
    date: "2024-08-15",
    lawDescription: "The Income Tax Act Amendment of 2024 modernizes tax regulations to accommodate evolving work environments, particularly focusing on remote work scenarios.",
    keyPoints: [
      "New deductions available for work-from-home expenses",
      "Changed thresholds for existing deductions",
      "Introduction of digital receipt submission for claims",
      "Modified tax slabs for remote workers"
    ],
    effectiveDate: "2024-09-01",
  },
  {
    id: 2,
    title: "GST Compliance Updates",
    content: "The GST Council has approved changes to simplify the return filing process and introduce an automated refund system.",
    date: "2024-07-20",
    lawDescription: "These updates to the Goods and Services Tax (GST) framework aim to reduce compliance burden on businesses and improve the efficiency of the tax administration system.",
    keyPoints: [
      "Simplified monthly return form",
      "Automated input tax credit reconciliation",
      "New system for faster processing of refunds",
      "Enhanced data analytics for fraud detection"
    ],
    effectiveDate: "2024-10-01",
  },
  {
    id: 3,
    title: "Corporate Governance Code Revisions",
    content: "The Securities and Exchange Board has revised the Corporate Governance Code to enhance board independence and stakeholder protection.",
    date: "2024-06-30",
    lawDescription: "These revisions aim to strengthen corporate governance practices in listed companies, ensuring better protection of shareholder interests and improved transparency.",
    keyPoints: [
      "Increased proportion of independent directors required",
      "Enhanced disclosure requirements for related party transactions",
      "Mandatory cybersecurity risk assessments",
      "New guidelines for environmental and social responsibility reporting"
    ],
    effectiveDate: "2025-01-01",
  },
  {
    id: 4,
    title: "Data Protection Act Implementation",
    content: "The comprehensive Data Protection Act is set to come into force, introducing stringent rules for data handling and privacy.",
    date: "2024-09-05",
    lawDescription: "This landmark legislation establishes a robust framework for data protection, privacy rights, and data processing responsibilities for organizations operating in the digital economy.",
    keyPoints: [
      "Appointment of Data Protection Officers mandatory for certain organizations",
      "Strict consent requirements for data collection and processing",
      "Heavy penalties for data breaches and non-compliance",
      "New rights for individuals regarding their personal data"
    ],
    effectiveDate: "2025-03-01",
  },
  {
    id: 5,
    title: "Labor Code Consolidation",
    content: "The government has consolidated multiple labor laws into a single Labor Code to simplify compliance and enhance worker protections.",
    date: "2024-08-22",
    lawDescription: "This comprehensive Labor Code consolidates and updates various existing labor laws, aiming to balance worker rights with ease of doing business.",
    keyPoints: [
      "Unified definition of wages across all labor laws",
      "New provisions for gig and platform workers",
      "Simplified registration and filing procedures for establishments",
      "Enhanced maternity and paternity benefits"
    ],
    effectiveDate: "2025-04-01",
  },
  {
    id: 6,
    title: "Environmental Protection Act Amendments",
    content: "Significant amendments to the Environmental Protection Act introduce stricter norms for industrial emissions and waste management.",
    date: "2024-07-10",
    lawDescription: "These amendments aim to address growing environmental concerns by imposing more stringent regulations on industries and promoting sustainable practices.",
    keyPoints: [
      "Reduced emission limits for various pollutants",
      "Mandatory environmental impact assessments for more categories of projects",
      "Increased penalties for environmental violations",
      "New incentives for adoption of green technologies"
    ],
    effectiveDate: "2024-12-01",
  },
  {
    id: 7,
    title: "Digital Currency Regulations",
    content: "The central bank has issued new regulations governing the use and trading of digital currencies, including cryptocurrencies.",
    date: "2024-09-15",
    lawDescription: "These regulations aim to bring digital currencies under a formal regulatory framework, ensuring financial stability while fostering innovation in the fintech sector.",
    keyPoints: [
      "Licensing requirements for cryptocurrency exchanges",
      "Know Your Customer (KYC) norms for digital currency transactions",
      "Restrictions on use of cryptocurrencies for payments",
      "Tax implications clarified for crypto trading and mining"
    ],
    effectiveDate: "2025-01-15",
  },
  {
    id: 8,
    title: "Intellectual Property Rights Expansion",
    content: "New amendments to Intellectual Property laws expand protection to include AI-generated works and traditional knowledge.",
    date: "2024-08-05",
    lawDescription: "These amendments modernize the IP framework to address emerging technologies and recognize the value of traditional knowledge in innovation.",
    keyPoints: [
      "Copyright protection extended to AI-generated content",
      "New category of rights for traditional knowledge and cultural expressions",
      "Simplified patent application process for startups",
      "Increased duration of design protection"
    ],
    effectiveDate: "2024-11-01",
  },
  {
    id: 9,
    title: "Foreign Investment Policy Updates",
    content: "The government has announced updates to the Foreign Direct Investment (FDI) policy, easing norms in several sectors.",
    date: "2024-07-25",
    lawDescription: "These policy updates aim to attract more foreign investment by liberalizing FDI norms across various sectors of the economy.",
    keyPoints: [
      "100% FDI allowed in contract manufacturing sector",
      "Eased local sourcing norms for single-brand retail",
      "Simplified approval process for investments in sensitive sectors",
      "New incentives for investments in underdeveloped regions"
    ],
    effectiveDate: "2024-10-15",
  },
  {
    id: 10,
    title: "Healthcare Regulation Overhaul",
    content: "A comprehensive overhaul of healthcare regulations introduces new standards for telemedicine, medical devices, and health data management.",
    date: "2024-09-20",
    lawDescription: "This regulatory overhaul aims to modernize the healthcare system, improve patient safety, and facilitate the adoption of new medical technologies.",
    keyPoints: [
      "New framework for telemedicine services",
      "Stricter quality control measures for medical devices",
      "Enhanced data protection rules for health information",
      "Mandatory continuous medical education for healthcare professionals"
    ],
    effectiveDate: "2025-06-01",
  }
];

const UpdateCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  function PrevArrow({ className, style, onClick }: ArrowProps) {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "-30px", top: "100px" }}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(146,151,161,1)" width="30" height="30">
          <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
        </svg>
      </div>
    );
  }
  
  function NextArrow({ className, style, onClick }: ArrowProps) {
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "-15px", top: "100px"}}
        onClick={onClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(146,151,161,1)" width="30" height="30"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
      </div>
    );
  }


  return (
    <div className='border rounded-lg'>
      <div className='p-4'>
        <h1 className='font-semibold text-lg'>Daily Updates</h1>
      </div>
      <div className='flex-grow flex items-center justify-center h-[350px]'>
        <div className='w-full px-8'>
          <Slider {...settings}>
            {UpdateData.map((item: Data, index: number) => (
              <div key={index} className="px-2" onClick={() => handleCardClick(item)}>
                <Card
                  className='h-[280px] cursor-pointer'
                  bodyClass='flex flex-col h-full'
                  header={
                    <div className='flex justify-around'>
                      <button className='bg-indigo-100 p-2 rounded-full text-sm font-medium text-indigo-300 h-6 flex items-center'>Commercial</button>
                      <button className='bg-indigo-100 p-2 rounded-full text-sm font-medium text-indigo-300 h-6 flex items-center'>Central</button>
                    </div>
                  }
                  headerClass='pb-0'
                  headerBorder={false}
                >
                  <div className='flex flex-col h-full'>
                    <h2 className='font-semibold text-lg mt-5'>{item.title}</h2>
                    <span className='text-xs text-gray-400'>{item.date}</span>
                    <p className='text-sm mt-4 flex-grow overflow-hidden text-[#7583a2]'>{item.content}</p>
                    <div className='mt-2 text-xs text-gray-500 flex justify-between'>
                      <p className='text-[#7583a2]'>Read more</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {selectedItem && (
        <DetailPopup
          item={selectedItem}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </div>
  )
}
export default UpdateCard


const DetailPopup = ({ item, isOpen, onClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      closable={true}
      width={800} // Adjust as needed
      height="auto"
      contentClassName="p-6"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
        <p className="text-sm text-gray-600 mb-2">Update Date: {item.date}</p>
        <p className="text-sm text-gray-600 mb-4">Effective Date: {item.effectiveDate}</p>
        
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-base mb-4">{item.lawDescription}</p>
        
        <h3 className="text-xl font-semibold mb-2">Key Points</h3>
        <ul className="list-disc list-inside mb-4">
          {item.keyPoints.map((point, index) => (
            <li key={index} className="mb-2">{point}</li>
          ))}
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Summary of Changes</h3>
        <p className="text-base mb-4">{item.content}</p>
      </div>
    </Dialog>
  );
};


