import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, Package, TrendingUp, AlertCircle } from "lucide-react";

// Mock data for sales trends over 6 months
const salesData = [
  { month: "Nov", revenue: 4200, sales: 42 },
  { month: "Dec", revenue: 3800, sales: 38 },
  { month: "Jan", revenue: 5100, sales: 51 },
  { month: "Feb", revenue: 4600, sales: 46 },
  { month: "Mar", revenue: 5800, sales: 58 },
  { month: "Apr", revenue: 6200, sales: 62 },
];

// Mock data for product category distribution
const categoryData = [
  { name: "Bicycles", value: 45 },
  { name: "Bicycle Parts", value: 20 },
  { name: "Apparel", value: 15 },
  { name: "Helmets", value: 12 },
  { name: "Safety Equip.", value: 8 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl">Dashboard</h2>
        <p className="text-gray-500">Welcome back! Here is the overview of your bike shop.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Monthly Revenue Total</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$6,200</div>
            <p className="text-xs text-green-600 mt-1">+6.8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Transactions</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">62</div>
            <p className="text-xs text-green-600 mt-1">+4.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Stock Items</CardTitle>
            <Package className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">458</div>
            <p className="text-xs text-gray-500 mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-orange-800">Low Stock Alerts</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-600">3</div>
            <p className="text-xs text-orange-600 mt-1">Items below threshold</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Totals</CardTitle>
            <CardDescription>Revenue overview over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData} id="dashboard-line-chart">
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="x" dataKey="month" />
                <YAxis key="y" />
                <Tooltip key="tooltip" />
                <Line key="line" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product distribution across inventory categories</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart id="dashboard-pie-chart">
                <Pie
                  key="pie"
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`category-cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}