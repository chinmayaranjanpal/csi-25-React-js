import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import KanbanApp from "./KanbanApp";

const data = [

  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 2210, amt: 2290 },
  { name: 'Mar', uv: 200, pv: 2290, amt: 2000 },
  { name: 'Apr', uv: 278, pv: 2000, amt: 2181 },
];

function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h2 className="font-semibold">Revenue Chart</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-semibold">Calendar</h2>
            <Calendar mode="single" selected={new Date()} onSelect={() => {}} className="rounded-md border w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-semibold">Quick Access</h2>
            <div className="space-y-2 mt-2">
              <Link to="/kanban"><Button>Kanban Board</Button></Link>
              <Link to="/table"><Button>Data Table</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataTable() {
  const rows = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Table</h2>
      <table className="w-full text-left border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">{row.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex">
        <nav className="w-60 p-4 bg-gray-100 min-h-screen space-y-2">
          <Link to="/"><Button variant="ghost">Dashboard</Button></Link>
          <Link to="/kanban"><Button variant="ghost">Kanban</Button></Link>
          <Link to="/table"><Button variant="ghost">Table</Button></Link>
        </nav>
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<KanbanApp />} />
            <Route path="/table" element={<DataTable />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
