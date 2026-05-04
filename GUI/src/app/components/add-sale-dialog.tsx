import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Plus, Trash2, Undo } from "lucide-react";
import type { Sale, SaleLineItem } from "./sales";

// Mock products for the dropdown
const mockProducts = [
  { id: "1", name: "Mountain Explorer Pro", price: 899.99, quantity: 12 },
  { id: "2", name: "Aero Road Helmet", price: 129.99, quantity: 4 },
  { id: "3", name: "Pro Gel Gloves", price: 34.99, quantity: 45 },
  { id: "4", name: "Hydraulic Disc Brakes", price: 149.99, quantity: 8 },
  { id: "5", name: "Reflective Vest", price: 24.99, quantity: 2 },
];

type AddSaleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (sale: Omit<Sale, "id">) => void;
};

export function AddSaleDialog({ open, onOpenChange, onSubmit }: AddSaleDialogProps) {
  const [items, setItems] = useState<SaleLineItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [qtyToAdd, setQtyToAdd] = useState(1);
  const [discountToAdd, setDiscountToAdd] = useState(0);
  
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Debit" | "Credit">("Credit");
  const [isRefund, setIsRefund] = useState(false);

  useEffect(() => {
    if (open) {
      setItems([]);
      setSelectedProduct("");
      setQtyToAdd(1);
      setDiscountToAdd(0);
      setPaymentMethod("Credit");
      setIsRefund(false);
    }
  }, [open]);

  const handleAddItem = () => {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (!product) return;

    setItems([...items, {
      productId: product.id,
      productName: product.name,
      quantity: qtyToAdd,
      unitPrice: product.price,
      discount: discountToAdd
    }]);

    setSelectedProduct("");
    setQtyToAdd(1);
    setDiscountToAdd(0);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const discountTotal = items.reduce((sum, item) => sum + item.discount, 0);
  const total = subtotal - discountTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    onSubmit({
      date: new Date().toISOString(),
      items,
      subtotal,
      discountTotal,
      total,
      paymentMethod,
      isRefund
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Record Transaction</DialogTitle>
          <DialogDescription>Process a new sale or refund.</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label>Transaction Type</Label>
              <Select value={isRefund ? "refund" : "sale"} onValueChange={(v) => setIsRefund(v === "refund")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "Cash" | "Debit" | "Credit")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Debit">Debit</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="text-sm font-medium mb-3">Add Product to Transaction</h4>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label className="text-xs">Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name} (${p.price})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-20">
                <Label className="text-xs">Qty</Label>
                <Input type="number" min="1" value={qtyToAdd} onChange={(e) => setQtyToAdd(parseInt(e.target.value) || 1)} />
              </div>
              <div className="w-24">
                <Label className="text-xs">Discount ($)</Label>
                <Input type="number" min="0" step="0.01" value={discountToAdd} onChange={(e) => setDiscountToAdd(parseFloat(e.target.value) || 0)} />
              </div>
              <Button type="button" onClick={handleAddItem} disabled={!selectedProduct}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="border rounded-lg max-h-48 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Disc.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="py-2 text-sm">{item.productName}</TableCell>
                      <TableCell className="py-2 text-right text-sm">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="py-2 text-right text-sm">{item.quantity}</TableCell>
                      <TableCell className="py-2 text-right text-sm text-red-500">
                        {item.discount > 0 ? `-$${item.discount.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="py-2 text-right text-sm font-medium">
                        ${((item.unitPrice * item.quantity) - item.discount).toFixed(2)}
                      </TableCell>
                      <TableCell className="py-2 w-10">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-red-500" onClick={() => handleRemoveItem(idx)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg border flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <div>Subtotal: ${subtotal.toFixed(2)}</div>
              {discountTotal > 0 && <div className="text-red-500">Discounts: -${discountTotal.toFixed(2)}</div>}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500">Total {isRefund ? 'Refund' : 'Sale'}</div>
              <div className={`text-2xl font-bold ${isRefund ? 'text-red-600' : 'text-green-600'}`}>
                {isRefund ? '-' : ''}${total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={handleSubmit} disabled={items.length === 0} className={isRefund ? "bg-red-600 hover:bg-red-700" : ""}>
            {isRefund ? (
              <><Undo className="w-4 h-4 mr-2" /> Process Refund</>
            ) : (
              "Complete Sale"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}