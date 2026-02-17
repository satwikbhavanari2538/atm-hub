# Project ATM: Agent Task Manager (The Squad Dashboard)

## 🎯 Objective
A centralized web-based command center for Satwik to manage, schedule, and monitor the Squad (Claw, Bar, Noma, Naji).

## 🏗️ Architecture
- **Frontend:** Angular 19 (Vercel: https://atm-frontend-alpha.vercel.app)
- **Backend:** FastAPI (VPS/Tailscale reachable: Port 8001)
- **Database:** MongoDB
- **Real-time:** WebSockets for live monitoring

## 🧩 Sections
1. **Dashboard:** System overview (agent count, task states, failures, throughput).
2. **Agents:** Manage agents, status cards, skills, capacity, logs.
3. **Tasks:** Kanban board (drag & drop) for lifecycle management.
4. **Activity:** Execution history, runs, durations, errors.
5. **Skills:** Registry for task-to-agent matching.
6. **Usage:** Compute time, run counts, cost metrics per agent/model.
7. **Settings:** API keys, dispatch rules, scheduling intervals.

## 🎨 UI/UX Requirements
- **Theme:** Light/Dark support. 
- **Dark Mode:** Gradient Black (No navy blue).
- **Style:** Modern, minimal, well-aligned.
- **Security:** Login page + PIN protection for API keys.

## 📅 Roadmap (Phased)
- **Phase 1: Shell & Core** - Routing, Theme Service, Auth Layout. (DONE)
- **Phase 2: Foundations** - Dashboard & Agent Status Cards. (IN PROGRESS)
- **Phase 3: Task Flow** - Kanban Board & Task Creation.
- **Phase 4: Intelligence** - Activity Logs & Usage Metrics.
- **Phase 5: Governance** - Skill Registry & Settings.
