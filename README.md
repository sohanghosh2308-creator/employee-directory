# SG Enterprise — Employee Directory

> **Workforce Personnel Directory using State and Events**  
> Built with React 19, `useState()` hooks, custom event handlers, real-time search & department filtering, full CRUD operations, conditional rendering, and ultra-modern glassmorphism UI effects.

---

## 🌟 Modern & Unique UI Effects

- **Dynamic Radial Gradient & Floating Ambient Orbs**: Multi-layered background with 3 floating animated glowing orbs and subtle grid pattern.
- **Frosted Glassmorphism**: Cards and panels feature `backdrop-filter: blur(16px)`, specular glass borders (`rgba(255, 255, 255, 0.09)`), and soft drop shadows.
- **Micro-Interactions & Hover Lift**: Smooth card elevation transitions (`translateY(-4px)`), glowing border illumination, and shine sweeps.
- **Celebration Confetti**: Physics-based confetti blast upon successfully adding a new employee.
- **Dual Display Modes**: Instant toggle between **Card Grid View** and **Enterprise Data Table View**.
- **Dark / Light Theme Toggle**: Seamless transition between Cyber-Dark Glass and Crystal-Light Frost.
- **Keyboard Shortcuts**: `Ctrl + K` or `/` instantly focuses the search bar, `Esc` dismisses modals.
- **Data Export & Reset**: 1-click export of filtered records to `.CSV` and instant reset to original sample dataset.
- **Toast Notifications**: Interactive feedback toasts for all state operations (Add, Edit, Delete, Reset, Export).

---

## 👥 Core Data Model & Pre-Populated Sample Dataset

Every employee record includes:
- **Name & Employee ID**: Unique identifier (e.g., `EMP-101`) and full professional name.
- **Department & Gender**: Organizational unit (Engineering, HR, Finance, Operations, Design, Marketing) and demographic info.
- **Contact & Addresses**: Phone number, corporate email, **local residential address**, and **permanent domicile address**.
- **Role, Status & Joined Date**: Operational details with live status indicator dot (Active, Remote, On Leave).

### Pre-populated Records:
1. **EMP-101 — Sohan Ghosh** | Engineering | Male | `+1 (555) 019-2831` | New York, NY
   - *Local*: 452 Lexington Ave, Apt 12B, New York, NY 10017
   - *Permanent*: 78 Pine Ridge Road, Syracuse, NY 13210
2. **EMP-102 — Rima khara** | Human Resources | Female | `+1 (555) 048-9102` | Boston, MA
   - *Local*: 120 Boylston Street, Suite 400, Boston, MA 02116
   - *Permanent*: 14 Meadow Brook Lane, Worcester, MA 01602
3. **EMP-103 — Soumyadeep Paul** | Finance | Male | `+1 (555) 022-7744` | Chicago, IL
   - *Local*: 233 S Wacker Dr, Unit 54A, Chicago, IL 60606
   - *Permanent*: 910 Maple Grove Way, Naperville, IL 60540
4. **EMP-104 — Aniruddha kar** | Operations | Male | `+1 (555) 039-8811` | Seattle, WA
   - *Local*: 1000 4th Ave, Tower B, Seattle, WA 98104
   - *Permanent*: 412 Olympic View Terrace, Tacoma, WA 98402

---

## ⚡ State Management Implementation

The application strictly implements the required state management logic:

```jsx
const [employees, setEmployees] = useState(initialEmployeeData);
const [searchTerm, setSearchTerm] = useState('');
const [selectedDept, setSelectedDept] = useState('All');

// Add Employee Handler
const handleAddEmployee = (newEmp) => setEmployees([newEmp, ...employees]);

// Delete Employee Handler
const handleDelete = (id) => setEmployees(employees.filter(e => e.id !== id));

// Filtered List Computation
const filteredEmployees = employees.filter(emp => {
  const matchesSearch = 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
  return matchesSearch && matchesDept;
});
```

---

## 🚀 Getting Started

### 1. Open in Visual Studio Code
This project is saved directly on your **Desktop**:
```bash
code "C:\Users\Argya\Desktop\employee-directory"
```

### 2. Run the Development Server
In the VS Code terminal (or PowerShell):
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
employee-directory/
├── .vscode/
│   ├── settings.json         # Workspace formatting & linting
│   ├── extensions.json       # Recommended VS Code plugins
│   └── launch.json           # Chrome debugger launcher
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Glass header, time, export, theme toggle
│   │   ├── StatsOverview.jsx       # Glassmorphic KPI counters
│   │   ├── FilterBar.jsx           # Real-time search, filters, sort, view toggle
│   │   ├── EmployeeCard.jsx        # Glass card with micro-interactions
│   │   ├── EmployeeTable.jsx       # Enterprise data table view
│   │   ├── EmployeeModal.jsx       # Add & Edit modal with validation
│   │   ├── EmployeeDetailModal.jsx # Full personnel profile & addresses modal
│   │   ├── DeleteConfirmModal.jsx  # Safety confirmation dialog
│   │   ├── EmptyState.jsx          # Conditional empty search & empty directory states
│   │   └── ToastContainer.jsx      # Feedback toast notifications
│   ├── data/
│   │   └── initialEmployees.js     # Pre-populated Assignment 3 dataset
│   ├── App.jsx                     # Core state management hub & handlers
│   ├── index.css                   # Glassmorphism, animations & CSS variables
│   └── main.jsx                    # React entrypoint
├── index.html
├── package.json
└── README.md
```
