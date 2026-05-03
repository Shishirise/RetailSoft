import { useState, Fragment } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Plus, Search, ChevronDown, ChevronUp } from "lucide-react";
import { AddSaleDialog } from "./add-sale-dialog";

export type SaleLineItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
};

export type Sale = {
  id: string;
  date: string;
  items: SaleLineItem[];
  subtotal: number;
  discountTotal: number;
  total: number;
  paymentMethod: "Cash" | "Debit" | "Credit";
  isRefund: boolean;
};

// Mock sales data
const initialSales: Sale[] = [
  {
    id: "1",
    date: "2026-04-30T10:30:00Z",
    items: [
      { productId: "1", productName: "Mountain Explorer Pro", quantity: 1, unitPrice: 899.99, discount: 50.00 },
      { productId: "2", productName: "Aero Road Helmet", quantity: 1, unitPrice: 129.99, discount: 0 }
    ],
    subtotal: 1029.98,
    discountTotal: 50.00,
    total: 979.98,
    paymentMethod: "Credit",
    isRefund: false,
  },
  {
    id: "2",
    date: "2026-04-29T14:15:00Z",
    items: [
      { productId: "3", productName: "Pro Gel Gloves", quantity: 2, unitPrice: 34.99, discount: 0 }
    ],
    subtotal: 69.98,
    discountTotal: 0,
    total: 69.98,
    paymentMethod: "Cash",
    isRefund: false,
  },
  {
    id: "3",
    date: "2026-04-28T09:00:00Z",
    items: [
      { productId: "4", productName: "Hydraulic Disc Brakes", quantity: 1, unitPrice: 149.99, discount: 10.00 }
    ],
    subtotal: 149.99,
    discountTotal: 10.00,
    total: 139.99,
    paymentMethod: "Debit",
    isRefund: true, // Example of a refund
  },
];

export function Sales() {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expandedSale, setExpandedSale] = useState<string | null>(null);

  const filteredSales = sales.filter((sale) =>
    sale.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.includes(searchTerm)
  );

  const handleAddSale = (sale: Omit<Sale, "id">) => {
    const newSale = {
      ...sale,
      id: Date.now().toString(),
    };
    setSales([newSale, ...sales]);
    setIsAddDialogOpen(false);
  };

  const totalRevenue = sales.filter(s => !s.isRefund).reduce((sum, s) => sum + s.total, 0);
  const totalRefunds = sales.filter(s => s.isRefund).reduce((sum, s) => sum + s.total, 0);
  const netRevenue = totalRevenue - totalRefunds;
  const totalTransactions = sales.length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl">Sales Processing</h2>
        <p className="text-gray-500">Record transactions, apply discounts, and process refunds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Gross Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Refunds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-500">${totalRefunds.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">Net Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalTransactions}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent sales and refunds</CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by product name, ID, or payment method..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <Fragment key={sale.id}>
                    <TableRow className={sale.isRefund ? "bg-red-50 hover:bg-red-100/50" : "hover:bg-gray-50"}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => setExpandedSale(expandedSale === sale.id ? null : sale.id)}
                        >
                          {expandedSale === sale.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs">TRX-{sale.id}</TableCell>
                      <TableCell>
                        <Badge variant={sale.isRefund ? "destructive" : "default"} className={sale.isRefund ? "" : "bg-green-500"}>
                          {sale.isRefund ? "Refund" : "Sale"}
                        </Badge>
                      </TableCell>
                      <TableCell>{sale.items.length} product(s)</TableCell>
                      <TableCell>
                        <Badge variant="outline">{sale.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${sale.isRefund ? "text-red-600" : ""}`}>
                        {sale.isRefund ? "-" : ""}${sale.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    {expandedSale === sale.id && (
                      <TableRow className={sale.isRefund ? "bg-red-50/50" : "bg-gray-50/50"}>
                        <TableCell colSpan={7} className="p-0 border-b">
                          <div className="p-4 pl-14">
                            <h4 className="text-sm font-medium mb-2">Line Items</h4>
                            <Table className="w-full bg-white rounded-md border">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Product</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead className="text-right">Unit Price</TableHead>
                                  <TableHead className="text-right">Discount</TableHead>
                                  <TableHead className="text-right">Line Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {sale.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="text-sm">{item.productName}</TableCell>
                                    <TableCell className="text-sm text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-sm text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-sm text-right text-red-500">{item.discount > 0 ? `-$${item.discount.toFixed(2)}` : "-"}</TableCell>
                                    <TableCell className="text-sm text-right font-medium">
                                      ${((item.quantity * item.unitPrice) - item.discount).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={4} className="text-right font-medium py-2">Subtotal:</TableCell>
                                  <TableCell className="text-right py-2">${sale.subtotal.toFixed(2)}</TableCell>
                                </TableRow>
                                {sale.discountTotal > 0 && (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-right font-medium text-red-500 py-2">Total Discount:</TableCell>
                                    <TableCell className="text-right text-red-500 py-2">-${sale.discountTotal.toFixed(2)}</TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                            {sale.isRefund && (
                              <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Action Required</Badge>
                                When processing a refund physically, please ensure broken items are NOT returned to active inventory stock. Unbroken items should be restocked.
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddSaleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSale}
      />
    </div>
  );
}