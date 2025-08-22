import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Divider,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomDialog } from "../../components/CustomDialog";
import { useResources } from "../../hooks/useResources";

type Supplier = {
  id: string;
  name: string;
};

type Resource = {
  id: string;
  name: string;
};

const allSuppliers = [
  { id: "s1", name: "Supplier One" },
  { id: "s2", name: "Global Supplies Inc." },
  { id: "s3", name: "EuroTrade Ltd." },
];

const storageLocations = ["A1", "A2", "B1", "C3", "D4"];
const unitOptions = ["pcs", "kg", "liters", "pallets"];

interface Pallet {
  location: string;
  quantity: number;
  unit: string;
}

interface ProductEntry {
  product: { id: string; name: string } | null;
  pallets: Pallet[];
}

interface CreateExternalReceiptFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (receiptData: any) => void;
}

export const CreateExternalReceiptForm: React.FC<
  CreateExternalReceiptFormProps
> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    supplier: null as { id: string; name: string } | null,
    deliveryDateTime: "",
    transportDocumentNumber: "",
    invoiceNumber: "",
    driverOrTransportCompany: "",
    transportVehicle: "",
    qualityIssues: false,
    qualityNotes: "",
  });

  const [productEntries, setProductEntries] = useState<ProductEntry[]>([]);

  const { resources = [] } = useResources();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addProduct = () => {
    setProductEntries((prev) => [
      ...prev,
      {
        product: null,
        pallets: [{ location: "", quantity: 0, unit: "" }],
      },
    ]);
  };

  const updateProduct = (index: number, updated: Partial<ProductEntry>) => {
    const updatedList = [...productEntries];
    updatedList[index] = { ...updatedList[index], ...updated };
    setProductEntries(updatedList);
  };

  const setPalletCount = (index: number, count: number) => {
    const current = productEntries[index];
    const pallets: Pallet[] = Array(count)
      .fill(null)
      .map(
        (_, i) => current.pallets[i] || { location: "", quantity: 0, unit: "" }
      );
    updateProduct(index, { pallets });
  };

  const updatePallet = (
    entryIndex: number,
    palletIndex: number,
    updated: Partial<Pallet>
  ) => {
    const updatedList = [...productEntries];
    updatedList[entryIndex].pallets[palletIndex] = {
      ...updatedList[entryIndex].pallets[palletIndex],
      ...updated,
    };
    setProductEntries(updatedList);
  };

  const removeProduct = (index: number) => {
    const updated = [...productEntries];
    updated.splice(index, 1);
    setProductEntries(updated);
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      receivedProducts: productEntries,
    };
    console.log("Submitting receipt data:", finalData);
    onSubmit(finalData);
    onClose();
  };

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} className="w-full md:w-2/3">
      <Typography variant="h5" sx={{ mb: 3 }}>
        External Goods Receipt
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            options={allSuppliers}
            getOptionLabel={(opt) => opt.name}
            value={formData.supplier}
            onChange={(_, val) =>
              setFormData((prev) => ({ ...prev, supplier: val }))
            }
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Delivery Date & Time"
            name="deliveryDateTime"
            type="datetime-local"
            value={formData.deliveryDateTime}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Transport Document Number"
            name="transportDocumentNumber"
            value={formData.transportDocumentNumber}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Invoice Number"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Driver / Company"
            name="driverOrTransportCompany"
            value={formData.driverOrTransportCompany}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Transport Vehicle"
            name="transportVehicle"
            value={formData.transportVehicle}
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Received Products
      </Typography>

      {productEntries.map((entry, i) => (
        <Accordion key={i} sx={{ mb: 1, "&::before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              {entry.product?.name || `Product ${i + 1}`}
            </Typography>
            <IconButton
              component="div"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                removeProduct(i);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <Autocomplete
                  disablePortal
                  options={resources}
                  getOptionLabel={(opt: Resource) => opt.name}
                  value={entry.product}
                  onChange={(_, val) => updateProduct(i, { product: val })}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="Number of Pallets"
                  type="number"
                  value={entry.pallets.length}
                  onChange={(e) =>
                    setPalletCount(i, parseInt(e.target.value || "0"))
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              {entry.pallets.map((pallet, pIdx) => (
                <React.Fragment key={pIdx}>
                  <Grid item xs={12} sm={5}>
                    <Autocomplete
                      disablePortal
                      options={storageLocations}
                      value={pallet.location}
                      onChange={(_, val) =>
                        updatePallet(i, pIdx, { location: val || "" })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={`Pallet ${pIdx + 1} Location`}
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} sm={2}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      type="number"
                      value={pallet.quantity}
                      onChange={(e) =>
                        updatePallet(i, pIdx, {
                          quantity: parseInt(e.target.value || "0"),
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={6} sm={2}>
                    <Autocomplete
                      disablePortal
                      options={unitOptions}
                      value={pallet.unit}
                      onChange={(_, val) =>
                        updatePallet(i, pIdx, { unit: val || "" })
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Unit" fullWidth />
                      )}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      <Button
        onClick={addProduct}
        startIcon={<AddIcon />}
        variant="outlined"
        sx={{ my: 1 }}
      >
        Add Product
      </Button>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Quality Control
      </Typography>
      <div className="flex flex-col gap-2">
        <FormControlLabel
          control={
            <Checkbox
              name="qualityIssues"
              checked={formData.qualityIssues}
              onChange={handleFormChange}
            />
          }
          label="Report Quality Issues"
        />
        {formData.qualityIssues && (
          <TextField
            fullWidth
            name="qualityNotes"
            label="Quality Notes"
            multiline
            rows={3}
            value={formData.qualityNotes}
            onChange={handleFormChange}
            sx={{ mt: 2 }}
          />
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ mt: 4, bgcolor: "#0077cc" }}
        >
          Submit Receipt
        </Button>
      </div>
    </CustomDialog>
  );
};
