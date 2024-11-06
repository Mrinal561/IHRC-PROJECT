import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ScrollBar } from '@/components/ui';

const dummyData = [
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

const DailyUpdates = () => {
  const navigate = useNavigate();

  const onViewAllProjects = () => {
    navigate('/app/project/project-list');
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h5 className='font-semibold'>Daily Updates</h5>
        <Button size="sm" onClick={onViewAllProjects}>
          View All
        </Button>
      </div>
      <div className='h-72 mb-6 overflow-y-auto'>

      {dummyData.map((project) => (
          <div key={project.id} className="border rounded-lg mb-2 p-4 flex items-center justify-between">
            <div className=''>
          <h6 className="text-sm font-semibold text-gray-600">{project.title}</h6>
          <p className="text-sm text-gray-500">{project.date}</p>
            </div>
            {/* <p className="text-sm flex-grow ml-4">
            {project.content.length > 40 ? `${project.content.slice(0, 40)}...` : project.content}
            </p> */}
        </div>
      ))}
      </div>
    </Card>
  );
};

export default DailyUpdates;
