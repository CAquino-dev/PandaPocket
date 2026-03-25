import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createCategory } from "@/services/categoryService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface Props {
  onSuccess: () => void;
  defaultType?: "income" | "expense";
}

const AddCategoryDialog = ({ onSuccess, defaultType }: Props) => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense" | "">(
    defaultType ?? "",
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setName("");
    setType(defaultType ?? "");
    setError("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) return setError("Name is required.");
    if (!type) return setError("Please select a type.");

    try {
      setLoading(true);
      setError("");
      await createCategory(API_URL, token!, { name, type });
      onSuccess();
      reset();
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              placeholder="e.g. Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {!defaultType && (
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select
                value={type}
                onValueChange={(val) => setType(val as "income" | "expense")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                reset();
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
