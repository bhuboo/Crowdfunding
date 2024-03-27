import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button, IconButton } from '@mui/material';
import { Delete, Edit, EditAttributes, EditAttributesRounded, PanoramaFishEyeSharp, RemoveRedEyeRounded, ViewAgenda } from '@mui/icons-material';
import BussinessIdeaView from './BussinesIdeaView';
import BussinessIdeaEdit from './BussinessIdeaEdit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}




export default function CustomizedTables({ data, api }) {

    const [page, setPage] = React.useState(0);
    const [modalView, setmodalView] = React.useState(false);
    const [modalEdit, setmodalEdit] = React.useState(false);
    const [modalViewId, setmodalViewId] = React.useState(false);
    const [modalEditId, setmodalEditId] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleview = (e) => {
        setmodalView(true);
        setmodalViewId(e);
    }

    const handleEdit = (e) => {
        setmodalEdit(true);
        setmodalEditId(e);
    }

    const rows = [
    ];
    return (
        <Paper  >
            {
                modalView &&
                <BussinessIdeaView ModalViewClose={setmodalView} Id={modalViewId} />
            }
            {
                modalEdit &&
                <BussinessIdeaEdit ModalViewClose={setmodalEdit} Id={modalEditId} api={api} />
            }
            <TableContainer sx={{ maxHeight: 450 }} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Bussiness Name </StyledTableCell>
                            <StyledTableCell align="center">Initial Investment</StyledTableCell>
                            <StyledTableCell align="center">Last Modify Date</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length > 0 ?
                                <>
                                    {(rowsPerPage > 0
                                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : data
                                    ).map((row) => (
                                        <StyledTableRow key={row.Id}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.BussinessName}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.InitialInvestment}</StyledTableCell>
                                            <StyledTableCell align="center">{(new Date(row.ModifyOn)).toISOString().slice(0, 16).replace("T", " ")}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton onClick={() => handleview(row.Id)} aria-label="view" size="large">
                                                    <RemoveRedEyeRounded color="primary" />
                                                </IconButton>
                                                <IconButton onClick={() => handleEdit(row.Id)} aria-label="edit" size="large">
                                                    <Edit color="orange" />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large">
                                                    <Delete color="error" />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </>
                                :
                                <StyledTableRow >
                                    <StyledTableCell colSpan={4} component="th" scope="row">
                                        <h3 className='text-center col-12'>No Data!</h3>
                                    </StyledTableCell>
                                </StyledTableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                data.length > 0 &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }


        </Paper>
    );
}
