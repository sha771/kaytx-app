import React from 'react';
import DepartmentDashboardView from '@/components/ai-agent/dashboard/DepartmentDashboardView';

const DEPARTMENT_AGENTS = [
  {
    "id": "account-manager",
    "name": "AI Account Manager",
    "description": "AI Account Manager provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "activity-coordinator",
    "name": "AI Activity Coordinator",
    "description": "AI Activity Coordinator provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "aircraft-mechanic",
    "name": "AI Aircraft Mechanic",
    "description": "AI Aircraft Mechanic provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "baggage-handler",
    "name": "AI Baggage Handler",
    "description": "AI Baggage Handler provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "bellman",
    "name": "AI Bellman",
    "description": "AI Bellman provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "cabin-services-director",
    "name": "AI Cabin Services Director",
    "description": "AI Cabin Services Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "chief-tourism-officer",
    "name": "AI Chief Tourism Officer",
    "description": "The AI Chief Tourism Officer leads the entire travel and tourism department, develops tourism strategies, oversees destination management, and drives growth across all tourism operations.",
    "color": "#1565C0",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "chief-travel-officer",
    "name": "AI Chief Travel Officer",
    "description": "AI Chief Travel Officer provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "co-pilot",
    "name": "AI Co-pilot",
    "description": "AI Co-pilot provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "concierge",
    "name": "AI Concierge",
    "description": "AI Concierge provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "cruise-director",
    "name": "AI Cruise Director",
    "description": "AI Cruise Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "customer-service-director",
    "name": "AI Customer Service Director",
    "description": "AI Customer Service Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "customer-service-representative",
    "name": "AI Customer Service Representative",
    "description": "AI Customer Service Representative provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "driver",
    "name": "AI Driver",
    "description": "AI Driver provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "finance-director",
    "name": "AI Finance Director",
    "description": "AI Finance Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "flight-attendant",
    "name": "AI Flight Attendant",
    "description": "AI Flight Attendant provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "flight-operations-coordinator",
    "name": "AI Flight Operations Coordinator",
    "description": "AI Flight Operations Coordinator provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "front-desk-agent",
    "name": "AI Front Desk Agent",
    "description": "AI Front Desk Agent provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "gate-agent",
    "name": "AI Gate Agent",
    "description": "AI Gate Agent provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "ground-crew",
    "name": "AI Ground Crew",
    "description": "AI Ground Crew provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "ground-services-director",
    "name": "AI Ground Services Director",
    "description": "AI Ground Services Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "hotel-booking-agent",
    "name": "AI Hotel Booking Agent",
    "description": "AI Hotel Booking Agent provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "housekeeper",
    "name": "AI Housekeeper",
    "description": "AI Housekeeper provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "human-resources-director",
    "name": "AI Human Resources Director",
    "description": "AI Human Resources Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "in-flight-services-director",
    "name": "AI In-flight Services Director",
    "description": "AI In-flight Services Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "inventory-manager",
    "name": "AI Inventory Manager",
    "description": "AI Inventory Manager provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "itinerary-planner",
    "name": "AI Itinerary Planner",
    "description": "AI Itinerary Planner provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "loyalty-program-director",
    "name": "AI Loyalty Program Director",
    "description": "AI Loyalty Program Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "marketing-director",
    "name": "AI Marketing Director",
    "description": "AI Marketing Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "operations-director",
    "name": "AI Operations Director",
    "description": "AI Operations Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "pilot",
    "name": "AI Pilot",
    "description": "AI Pilot provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "pricing-specialist",
    "name": "AI Pricing Specialist",
    "description": "AI Pricing Specialist provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "reservation-agent",
    "name": "AI Reservation Agent",
    "description": "AI Reservation Agent provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "restaurant-staff",
    "name": "AI Restaurant Staff",
    "description": "AI Restaurant Staff provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "revenue-analyst",
    "name": "AI Revenue Analyst",
    "description": "AI Revenue Analyst provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "revenue-management-director",
    "name": "AI Revenue Management Director",
    "description": "AI Revenue Management Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "safety-director",
    "name": "AI Safety Director",
    "description": "AI Safety Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sales-director",
    "name": "AI Sales Director",
    "description": "AI Sales Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sales-representative",
    "name": "AI Sales Representative",
    "description": "AI Sales Representative provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "sustainability-director",
    "name": "AI Sustainability Director",
    "description": "AI Sustainability Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "technology-director",
    "name": "AI Technology Director",
    "description": "AI Technology Director provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "ticket-agent",
    "name": "AI Ticket Agent",
    "description": "AI Ticket Agent provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "tour-guide",
    "name": "AI Tour Guide",
    "description": "AI Tour Guide provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "tour-package-designer",
    "name": "AI Tour Package Designer",
    "description": "AI Tour Package Designer provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "travel-consultant",
    "name": "AI Travel Consultant",
    "description": "AI Travel Consultant provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-airline-operations",
    "name": "AI VP Airline Operations",
    "description": "AI VP Airline Operations provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-booking-reservations",
    "name": "AI VP Booking & Reservations",
    "description": "The AI VP Booking & Reservations manages booking systems, oversees reservation operations, ensures availability accuracy, and optimizes booking processes for maximum efficiency.",
    "color": "#4527A0",
    "efficiency": "44x efficiency improvement"
  },
  {
    "id": "vp-customer-experience",
    "name": "AI VP Customer Experience",
    "description": "AI VP Customer Experience provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-customer-journey",
    "name": "AI VP Customer Journey",
    "description": "The AI VP Customer Journey maps and optimizes customer journeys, manages touchpoints, ensures seamless experiences, and drives customer satisfaction across all travel stages.",
    "color": "#6A1B9A",
    "efficiency": "45x efficiency improvement"
  },
  {
    "id": "vp-destination-development",
    "name": "AI VP Destination Development",
    "description": "The AI VP Destination Development plans and executes destination development projects, manages infrastructure investments, and enhances destination attractiveness and capacity.",
    "color": "#EF6C00",
    "efficiency": "48x efficiency improvement"
  },
  {
    "id": "vp-destination-management",
    "name": "AI VP Destination Management",
    "description": "The AI VP Destination Management oversees destination development, manages tourism infrastructure, coordinates with local authorities, and ensures destination attractiveness and sustainability.",
    "color": "#0277BD",
    "efficiency": "51x efficiency improvement"
  },
  {
    "id": "vp-hospitality-services",
    "name": "AI VP Hospitality Services",
    "description": "The AI VP Hospitality Services oversees hospitality operations, manages accommodation services, ensures exceptional guest experiences, and maintains high service standards across all properties.",
    "color": "#00695C",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "vp-hotel-operations",
    "name": "AI VP Hotel Operations",
    "description": "AI VP Hotel Operations provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-tour-experiences",
    "name": "AI VP Tour Experiences",
    "description": "The AI VP Tour Experiences designs and curates tour experiences, manages tour operations, ensures memorable customer journeys, and drives tour product innovation.",
    "color": "#AD1457",
    "efficiency": "47x efficiency improvement"
  },
  {
    "id": "vp-tour-operations",
    "name": "AI VP Tour Operations",
    "description": "AI VP Tour Operations provides specialized expertise and executes critical tasks for the Travel & Tourism department. This AI agent automates complex workflows, provides intelligent insights, and collaborates with other agents to achieve organizational goals with maximum efficiency.",
    "color": "#0891B2",
    "efficiency": "40x efficiency improvement"
  },
  {
    "id": "vp-tourism-analytics",
    "name": "AI VP Tourism Analytics",
    "description": "The AI VP Tourism Analytics analyzes tourism data, provides insights, tracks performance metrics, and drives data-informed decision making across the tourism department.",
    "color": "#2E7D32",
    "efficiency": "45x efficiency improvement"
  },
  {
    "id": "vp-tourism-marketing",
    "name": "AI VP Tourism Marketing",
    "description": "The AI VP Tourism Marketing develops marketing strategies, manages brand positioning, drives destination promotion, and attracts visitors through effective marketing campaigns.",
    "color": "#C62828",
    "efficiency": "47x efficiency improvement"
  },
  {
    "id": "vp-tourism-technology",
    "name": "AI VP Tourism Technology",
    "description": "The AI VP Tourism Technology manages technology infrastructure, oversees digital platforms, drives innovation, and ensures technology enables exceptional tourism experiences.",
    "color": "#424242",
    "efficiency": "50x efficiency improvement"
  },
  {
    "id": "vp-transportation-services",
    "name": "AI VP Transportation Services",
    "description": "The AI VP Transportation Services manages transportation partnerships, oversees fleet operations, ensures reliable transportation services, and optimizes travel logistics.",
    "color": "#01579B",
    "efficiency": "42x efficiency improvement"
  },
  {
    "id": "vp-travel-operations",
    "name": "AI VP Travel Operations",
    "description": "The AI VP Travel Operations manages travel logistics, oversees transportation services, coordinates tour operations, and ensures seamless travel experiences for all customers.",
    "color": "#00838F",
    "efficiency": "48x efficiency improvement"
  }
];

export default function DepartmentIndex() {
  return (
    <DepartmentDashboardView
      departmentId="travel-tourism"
      agents={DEPARTMENT_AGENTS}
    />
  );
}
