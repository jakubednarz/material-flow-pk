import React from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Product {
  id: string;
  name: string;
}

interface ProductEntry {
  product: Product | null;
  quantity: number;
  pallets: string[]; // storage location for each pallet
}

interface ProductSelectorProps {
  products: Product[];
  storageLocations: string[];
  onChange: (data: ProductEntry[]) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  storageLocations,
  onChange,
}) => {
  const [entries, setEntries] = React.useState<ProductEntry[]>([]);

  const updateEntries = (updated: ProductEntry[]) => {
    setEntries(updated);
    onChange(updated);
  };

  const addEntry = () => {
    updateEntries([...entries, { product: null, quantity: 0, pallets: [""] }]);
  };

  const updateEntry = (index: number, updatedEntry: Partial<ProductEntry>) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], ...updatedEntry };
    updateEntries(updated);
  };

  const setPalletCount = (index: number, count: number) => {
    const current = entries[index];
    const pallets = Array(count)
      .fill("")
      .map((_, i) => current.pallets[i] || "");
    updateEntry(index, { pallets });
  };

  const updatePalletLocation = (
    entryIndex: number,
    palletIndex: number,
    location: string
  ) => {
    const newEntries = [...entries];
    newEntries[entryIndex].pallets[palletIndex] = location;
    updateEntries(newEntries);
  };

  const removeEntry = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    updateEntries(updated);
  };

  return (
    <div>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        3. Received Products
      </Typography>
      {entries.map((entry, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {entry.product ? entry.product.name : "Select Product"}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                removeEntry(index);
              }}
              sx={{ ml: 2 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  options={products}
                  getOptionLabel={(option) => option.name}
                  value={entry.product}
                  onChange={(_, newValue) =>
                    updateEntry(index, { product: newValue })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Product" />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={entry.quantity}
                  onChange={(e) =>
                    updateEntry(index, {
                      quantity: parseInt(e.target.value || "0"),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Pallet Count"
                  value={entry.pallets.length}
                  onChange={(e) =>
                    setPalletCount(index, parseInt(e.target.value || "1"))
                  }
                />
              </Grid>

              {entry.pallets.map((loc, palletIndex) => (
                <Grid item xs={12} sm={6} md={4} key={palletIndex}>
                  <Autocomplete
                    fullWidth
                    options={storageLocations}
                    value={loc}
                    onChange={(_, newVal) =>
                      updatePalletLocation(index, palletIndex, newVal || "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Pallet ${palletIndex + 1} Location`}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addEntry}
        sx={{ mt: 1 }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default ProductSelector;
