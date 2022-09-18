import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, Product } from "./api/api";

export default function Products() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchData();
  }, []);
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Products</Typography>
      <Paper>
        <Box display="flex" justifyContent="flex-end" p=".5rem">
          <Button
            component={Link}
            to="/product"
            variant="contained"
            color="primary"
          >
            Add New
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Link to={`/product/${p.id}`}>{p.title}</Link>
                  </TableCell>
                  <TableCell>{p.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
