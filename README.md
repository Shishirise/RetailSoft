# RetailSoft Inventory and Sales Management System  

## Overview  
RetailSoft is a small business inventory and sales management system developed to support retail store operations. The system enables users to manage inventory, process sales transactions, and generate reports through a structured and easy to use interface.  

The application is designed as a standalone system and focuses on accurate data handling, consistency in inventory updates, and clear presentation of business information. It was developed as part of a Software Engineering course at Midwestern State University.  

---

## System Description  
RetailSoft is intended for use in a single user retail environment. The system operates locally and does not require internet connectivity. It integrates inventory management, sales processing, reporting, and notification features into one application.  

The design emphasizes usability, reliability, and simplicity, allowing users with minimal technical experience to operate the system effectively.  

---

## Functional Features  

### Dashboard  
The dashboard serves as the central interface of the system. It provides a summary of sales performance, inventory status, and low stock alerts, and allows navigation to all major components of the application.  

### Inventory Management  
The system supports creation, modification, and deletion of product records. Each product includes attributes such as name, category, price, and quantity. Inventory levels are updated automatically based on sales and refund operations, ensuring consistency and preventing negative stock values.  

### Sales Processing  
RetailSoft allows users to record sales transactions involving multiple products. The system calculates totals automatically and supports payment methods including cash, debit, and credit. All transactions are stored for reporting and analysis.  

### Reporting and Analytics  
The system generates daily and weekly sales reports. Daily reports summarize sales by product category, while weekly reports present sales data based on payment methods. These reports provide insight into business performance and trends.  

### Low Stock Monitoring  
The system continuously monitors inventory levels and generates alerts when stock falls below a defined threshold. This feature supports timely restocking and inventory control.  

---

## System Environment  
The application is designed to run as an offline desktop system in a retail environment. It is intended for use by a single operator and does not require integration with external systems.  

---

## Project Structure  
The project is organized into the following main components:  

- `src` contains the application source code  
- `Documentation` contains the project plan, requirements document, test cases, and user manual  
- `GUI` contains interface screenshots and frontend files  
- `Presentations` contains interim and final presentation materials  

---

## Execution Instructions  

### Local Environment  
- macOS / Windows  
- Visual Studio Code  
- React + Vite + TypeScript  

### Running the Interface  
Open the project folder in Visual Studio Code and run:  

```bash
npm run dev
```

Then open the local Vite browser link to view the RetailSoft interface locally.  

---

## Technologies Used  
- React  
- TypeScript  
- Vite  
- SQLite  
- GitHub  
- Visual Studio Code  

---

## Documentation  
The `Documentation` folder includes all supporting materials for the system.  

### Included Documents  
- Requirements Document  
- Project Plan  
- Test Cases  
- User Manual  
- UML Diagram  
- ERD Diagram  
- GUI Navigation  

---

## Document Links  

### Project Plan (Final Draft)  
https://docs.google.com/document/d/1oCSkXxiQPOZL9Oju6dHkGTwK1-1jXcRAhgrakde2z-A/edit  

### Additional Project Plan Material  
https://docs.google.com/document/d/19cFy1gFJkpUD2Rn9xdVjNQ09cpzlmribcOg6h1eQD-o/edit  

### Requirements Document  
https://docs.google.com/document/d/1xDYsYGMOdwNzmmakv4SydLnWR2hxJxECIn6CEea4BSI/edit  

### User Manual  
https://docs.google.com/document/d/1-3k5W9uxjCpTCgXyvkyjIl0bXTSKQKmNV--IZeuDles/edit  

### Test Cases  
https://docs.google.com/document/d/1YJUKCEAmFmhAweAkNrDF-c4ii2t-W-m_pANc3_JXJT8/edit  

---

## Repository Structure  

```text
RetailSoft_Project/
│
├── README.md
├── GitHub_Link.txt
│
├── Objective_Grading_Sheet/
├── Team_Info/
│
├── GUI/
│   ├── Source_Code/
│   └── Dashboard_Screenshots/
│
├── Documentation/
│   ├── ERD/
│   ├── UML_Diagram/
│   ├── Requirements/
│   ├── GUI_Navigation/
│   ├── Testing/
│   ├── User_Manual/
│   ├── Project_Plan/
│   └── Final_Report/
│
└── Presentations/
    ├── Interim_Presentation/
    └── Final_Presentation/
```

---

## Notes  
- RetailSoft is a course project developed for educational purposes.  
- The current version focuses primarily on GUI functionality and system design.  
- Database integration and deployment refinement are still in progress.  

---

## Authors  
- Esther Ajuwon  
- Ryan Crawford  
- Robert Salyers  
- Shishir Adhikari  
- Thor Lang  

---

## Course Information  
Software Engineering  
Midwestern State University  

---

## Acknowledgements  
Developed by the Code Shrimp team for the Software Engineering course at Midwestern State University.  
