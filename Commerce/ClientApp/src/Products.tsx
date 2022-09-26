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
import { Link } from "react-router-dom";
import { useProducts } from "./api/api";

export default function Products() {
  const { status, data: products } = useProducts();
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
                <TableCell></TableCell>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Slug</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === "loading" ? (
                <TableRow>
                  <TableCell>
                    <span>loading....</span>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {products?.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell width="5rem">
                        <img
                          src={p.mainImageSrc}
                          alt=""
                          style={{
                            width: "75px",
                            height: "75px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/product/${p.id}`}>{p.title}</Link>
                      </TableCell>
                      <TableCell>{p.description}</TableCell>
                      <TableCell>{p.slug}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>
  );
}
