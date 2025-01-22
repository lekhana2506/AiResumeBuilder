AI-Assisted Resume Builder (Frontend)

Welcome to the AI-Assisted Resume Builder frontend repository! This project is designed to provide an intuitive and user-friendly interface for creating tailored resumes using AI-powered suggestions. The frontend interacts seamlessly with the backend powered by the Gemini API and PostgreSQL + Strapi, delivering personalized resume recommendations based on job descriptions, skills, and experience.

🚀 Features

Dynamic Resume Builder: Create and edit resumes in real-time.

AI-Powered Suggestions: Get tailored recommendations for sections such as skills, experience, and job descriptions.

Responsive Design: Fully responsive interface to ensure usability across devices.

Download as PDF: Easily download your resume in PDF format.

Customization Options: Modify layouts, fonts, and section orders to suit your needs.

🛠️ Tech Stack

Frontend:

React.js: Core framework for building the interface.

Redux/Context API: State management for seamless data flow.

Tailwind CSS: For modern and responsive UI design.

Axios: API integration with the backend.

Backend:

Gemini API: For AI-powered resume recommendations.

PostgreSQL: Robust database for storing user data.

Strapi: Headless CMS for managing backend content and API.

🖥️ Getting Started

Follow these steps to set up and run the frontend locally:

Prerequisites

Node.js (v16 or higher)

npm or yarn

Installation

Clone the Repository

git clone https://github.com/your-username/ai-resume-builder-frontend.git
cd ai-resume-builder-frontend

Install Dependencies

npm install
# or
yarn install

Set Up Environment Variables
Create a .env file in the root directory and add the following:

REACT_APP_API_URL=<Backend_API_Endpoint>

Run the Application

npm start
# or
yarn start

The app will be available at http://localhost:3000.

📂 Project Structure

.
├── src
│   ├── components        # Reusable UI components
│   ├── pages             # Main pages (e.g., Home, Builder, About)
│   ├── styles            # Global and component-specific styles
│   ├── utils             # Helper functions and API integrations
│   └── App.js            # Main application entry point
├── public                # Static assets
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation

🤝 Contributing

We welcome contributions to enhance this project! Here's how you can help:

Fork the repository.

Create a new branch: git checkout -b feature-name.

Commit your changes: git commit -m 'Add a feature'.

Push to the branch: git push origin feature-name.

Submit a pull request.

✨ Acknowledgments

Gemini API for AI-powered resume recommendations.

Strapi for backend content management.

PostgreSQL for data storage.

The open-source community for inspiring this project.

