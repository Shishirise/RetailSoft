import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Download, FileText, Calendar, Clock, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Report type definition
type Report = {
  id: string;
  type: "daily" | "weekly";
  generatedAt: string;
  period: string;
  totalSales: number;
  totalRevenue: number;
  transactionCount: number;
};

// Mock historical reports data
const initialReports: Report[] = [
  {
    id: "1",
    type: "weekly",
    generatedAt: "2026-04-27T09:00:00",
    period: "Apr 20 - Apr 26, 2026",
    totalSales: 127,
    totalRevenue: 3856.42,
    transactionCount: 45,
  },
  {
    id: "2",
    type: "daily",
    generatedAt: "2026-04-29T18:00:00",
    period: "Apr 29, 2026",
    totalSales: 23,
    totalRevenue: 687.89,
    transactionCount: 8,
  },
  {
    id: "3",
    type: "daily",
    generatedAt: "2026-04-28T18:00:00",
    period: "Apr 28, 2026",
    totalSales: 19,
    totalRevenue: 542.31,
    transactionCount: 7,
  }
];

// Mock data for weekly sales by payment method (stacked bar chart)
const weeklyPaymentData = [
  { day: "Mon", cash: 245, debit: 412, credit: 568 },
  { day: "Tue", cash: 189, debit: 356, credit: 623 },
  { day: "Wed", cash: 312, debit: 445, credit: 701 },
  { day: "Thu", cash: 278, debit: 389, credit: 654 },
  { day: "Fri", cash: 423, debit: 567, credit: 892 },
  { day: "Sat", cash: 534, debit: 678, credit: 945 },
  { day: "Sun", cash: 456, debit: 523, credit: 789 },
];

// Mock data for daily sales by category (pie chart) matched to bike shop
const dailyCategoryData = [
  { name: "Bicycles", value: 3450, percentage: 45 },
  { name: "Bicycle Parts", value: 1200, percentage: 16 },
  { name: "Apparel", value: 1050, percentage: 14 },
  { name: "Helmets", value: 890, percentage: 12 },
  { name: "Safety Equip.", value: 650, percentage: 8 },
  { name: "Other", value: 380, percentage: 5 },
];

// Colors for charts
const PAYMENT_COLORS = {
  cash: "#10b981", // green
  debit: "#3b82f6", // blue
  credit: "#8b5cf6", // purple
};

const CATEGORY_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#64748b"];

export function Reports() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [dailyReportTime, setDailyReportTime] = useState("18:00");
  const [weeklyReportTime, setWeeklyReportTime] = useState("09:00");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempDailyReportTime, setTempDailyReportTime] = useState("18:00");
  const [tempWeeklyReportTime, setTempWeeklyReportTime] = useState("09:00");

  const generateDailyReport = () => {
    const today = new Date();
    const newReport: Report = {
      id: Date.now().toString(),
      type: "daily",
      generatedAt: new Date().toISOString(),
      period: today.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      totalSales: Math.floor(Math.random() * 30) + 10,
      totalRevenue: Math.random() * 1000 + 300,
      transactionCount: Math.floor(Math.random() * 15) + 5,
    };
    setReports([newReport, ...reports]);
  };

  const generateWeeklyReport = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday

    const newReport: Report = {
      id: Date.now().toString(),
      type: "weekly",
      generatedAt: new Date().toISOString(),
      period: `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      totalSales: Math.floor(Math.random() * 150) + 80,
      totalRevenue: Math.random() * 5000 + 2000,
      transactionCount: Math.floor(Math.random() * 50) + 30,
    };
    setReports([newReport, ...reports]);
  };

  const downloadReport = (report: Report) => {
    const csvContent = [
      ["Report Type", report.type.toUpperCase()],
      ["Period", report.period],
      ["Generated At", new Date(report.generatedAt).toLocaleString()],
      [""],
      ["Metric", "Value"],
      ["Total Sales", report.totalSales.toString()],
      ["Total Revenue", `$${report.totalRevenue.toFixed(2)}`],
      ["Transaction Count", report.transactionCount.toString()],
      ["Average Order Value", `$${(report.totalRevenue / report.transactionCount).toFixed(2)}`],
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${report.type}-report-${report.period.replace(/[,\s]/g, "-")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveSettings = () => {
    setDailyReportTime(tempDailyReportTime);
    setWeeklyReportTime(tempWeeklyReportTime);
    setIsSettingsOpen(false);
  };

  const openSettings = () => {
    setTempDailyReportTime(dailyReportTime);
    setTempWeeklyReportTime(weeklyReportTime);
    setIsSettingsOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl">Reporting & Analytics</h2>
        <p className="text-gray-500">Visualize sales data and generate automated reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Sales by Payment Method - Stacked Bar Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales by Payment Type</CardTitle>
            <CardDescription>Segmented bar graph of daily sales breakdown (Cash, Debit, Credit)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyPaymentData} id="reports-bar-chart">
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="x" dataKey="day" />
                <YAxis key="y" />
                <Tooltip key="tooltip" formatter={(value) => `$${value}`} contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                <Legend key="legend" />
                <Bar key="bar-cash" dataKey="cash" stackId="a" fill={PAYMENT_COLORS.cash} name="Cash" />
                <Bar key="bar-debit" dataKey="debit" stackId="a" fill={PAYMENT_COLORS.debit} name="Debit" />
                <Bar key="bar-credit" dataKey="credit" stackId="a" fill={PAYMENT_COLORS.credit} name="Credit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Sales by Category - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales by Product Category</CardTitle>
            <CardDescription>Today's total sales grouped by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart id="reports-pie-chart">
                <Pie
                  key="pie"
                  data={dailyCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} (${percentage}%)`}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dailyCategoryData.map((entry, index) => (
                    <Cell key={`daily-category-${entry.name}-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" formatter={(value) => `$${value}`} contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }} />
                <Legend key="legend" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Generation Schedules</CardTitle>
              <CardDescription>Generate daily and weekly reports on a user-configurable timer</CardDescription>
            </div>
            <Button variant="outline" onClick={openSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Configure Timers
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Daily Sales Report</h3>
                  <div className="flex items-center gap-2 text-xs text-blue-700 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Auto-generates at {dailyReportTime}</span>
                  </div>
                </div>
              </div>
              <Button onClick={generateDailyReport} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Generate Now
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-purple-50 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Weekly Sales Report</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-700 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Auto-generates Mondays at {weeklyReportTime}</span>
                  </div>
                </div>
              </div>
              <Button onClick={generateWeeklyReport} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Generate Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>View and download previous reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Badge variant={report.type === "daily" ? "default" : "secondary"} className={report.type === "daily" ? "bg-blue-500" : "bg-purple-500"}>
                        {report.type === "daily" ? "Daily Report" : "Weekly Report"}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{new Date(report.generatedAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => downloadReport(report)}>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure Report Timers</DialogTitle>
            <DialogDescription>Set the automatic generation times for your reports.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="dailyReportTime">Daily Close Time</Label>
              <Input
                id="dailyReportTime"
                type="time"
                value={tempDailyReportTime}
                onChange={(e) => setTempDailyReportTime(e.target.value)}
              />
              <p className="text-sm text-gray-500">Daily sales report (pie chart) will be generated at this time.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeklyReportTime">Weekly Report Time (Mondays)</Label>
              <Input
                id="weeklyReportTime"
                type="time"
                value={tempWeeklyReportTime}
                onChange={(e) => setTempWeeklyReportTime(e.target.value)}
              />
              <p className="text-sm text-gray-500">Weekly sales report (segmented bar graph) will be generated every Monday.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>Cancel</Button>
            <Button onClick={saveSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}