import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Plus, Search, Pencil, Trash2, CalendarClock } from "lucide-react";
import { AddProductDialog } from "./add-product-dialog";

export type Product = {
  id: string;
  name: string;
  category: "Bicycles" | "Bicycle Parts" | "Apparel" | "Helmets" | "Safety Equipment" | "Other";
  brand: string;
  variation: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  orderedQuantity: number;
  projectedArrivalDate: string;
};

// Mock product data tailored for a bike shop
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Mountain Explorer Pro",
    category: "Bicycles",
    brand: "TrekMaster",
    variation: "Matte Black - Large",
    price: 899.99,
    quantity: 12,
    lowStockThreshold: 5,
    orderedQuantity: 5,
    projectedArrivalDate: "2026-05-15",
  },
  {
    id: "2",
    name: "Aero Road Helmet",
    category: "Helmets",
    brand: "SafeRide",
    variation: "White/Red - Medium",
    price: 129.99,
    quantity: 4,
    lowStockThreshold: 8,
    orderedQuantity: 10,
    projectedArrivalDate: "2026-05-02",
  },
  {
    id: "3",
    name: "Pro Gel Gloves",
    category: "Apparel",
    brand: "GripTech",
    variation: "Black - Large",
    price: 34.99,
    quantity: 45,
    lowStockThreshold: 15,
    orderedQuantity: 0,
    projectedArrivalDate: "",
  },
  {
    id: "4",
    name: "Hydraulic Disc Brakes",
    category: "Bicycle Parts",
    brand: "StopFast",
    variation: "Front/Rear Set",
    price: 149.99,
    quantity: 8,
    lowStockThreshold: 10,
    orderedQuantity: 0,
    projectedArrivalDate: "",
  },
  {
    id: "5",
    name: "Reflective Vest",
    category: "Safety Equipment",
    brand: "NightViz",
    variation: "Neon Yellow - XL",
    price: 24.99,
    quantity: 2,
    lowStockThreshold: 5,
    orderedQuantity: 15,
    projectedArrivalDate: "2026-05-01",
  }
];

export function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getStockStatus = (quantity: number, lowStockThreshold: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity <= lowStockThreshold) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">Low Stock</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl">Inventory Management</h2>
        <p className="text-gray-500">Manage your bike shop product stock and incoming shipments.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>A list of all products in your inventory</CardDescription>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products by name, brand, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Variation</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Incoming</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-gray-500">
                      No Results Found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell className="text-sm text-gray-500">{product.variation}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.quantity}</TableCell>
                      <TableCell>{getStockStatus(product.quantity, product.lowStockThreshold)}</TableCell>
                      <TableCell>
                        {product.orderedQuantity > 0 ? (
                          <div className="flex items-center gap-1 text-sm text-blue-600">
                            <CalendarClock className="w-3 h-3" />
                            <span>+{product.orderedQuantity} by {new Date(product.projectedArrivalDate).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
      />

      {editingProduct && (
        <AddProductDialog
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onSubmit={handleEditProduct}
          product={editingProduct}
        />
      )}
    </div>
  );
}