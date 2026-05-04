import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { Product } from "./inventory";

// Form data type without the auto-generated ID
type ProductFormData = Omit<Product, "id">;

// Component props type definition
type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: ProductFormData) => void;
  product?: Product; // Optional: if provided, dialog is in "edit" mode
};

export function AddProductDialog({ open, onOpenChange, onSubmit, product }: AddProductDialogProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "Bicycles",
    brand: "",
    variation: "",
    price: 0,
    quantity: 0,
    lowStockThreshold: 5,
    orderedQuantity: 0,
    projectedArrivalDate: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        brand: product.brand,
        variation: product.variation,
        price: product.price,
        quantity: product.quantity,
        lowStockThreshold: product.lowStockThreshold,
        orderedQuantity: product.orderedQuantity,
        projectedArrivalDate: product.projectedArrivalDate,
      });
    } else {
      setFormData({
        name: "",
        category: "Bicycles",
        brand: "",
        variation: "",
        price: 0,
        quantity: 0,
        lowStockThreshold: 5,
        orderedQuantity: 0,
        projectedArrivalDate: "",
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit({ ...product, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update product information." : "Add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="variation">Variation (Color/Model)</Label>
                <Input
                  id="variation"
                  value={formData.variation}
                  onChange={(e) => setFormData({ ...formData, variation: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as ProductFormData["category"] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bicycles">Bicycles</SelectItem>
                  <SelectItem value="Bicycle Parts">Bicycle Parts</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Helmets">Helmets</SelectItem>
                  <SelectItem value="Safety Equipment">Safety Equipment</SelectItem>
                  <SelectItem value="Other">Other Associated Merchandise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Unit Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lowStockThreshold">Low Stock Alert At</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  min="0"
                  value={formData.lowStockThreshold}
                  onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="col-span-2">
                <h4 className="text-sm font-medium">Incoming Stock (Optional)</h4>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderedQuantity">Ordered Quantity</Label>
                <Input
                  id="orderedQuantity"
                  type="number"
                  min="0"
                  value={formData.orderedQuantity}
                  onChange={(e) => setFormData({ ...formData, orderedQuantity: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectedArrivalDate">Arrival Date</Label>
                <Input
                  id="projectedArrivalDate"
                  type="date"
                  value={formData.projectedArrivalDate}
                  onChange={(e) => setFormData({ ...formData, projectedArrivalDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}