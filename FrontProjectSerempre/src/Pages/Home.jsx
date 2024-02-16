import { NavbarCompo } from "../Components/Navbar";
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";

import {DeleteIcon} from "./DeleteIcon";

import { ReportsContext} from "../Context/ReportContext";
import { useContext } from "react";
import {ModalPostReport} from "../Components/ModalPostReport";
import {ModalUpdateReport } from "../Components/ModalUpdateReport";

export const Home = () => {
    
    const context = useContext(ReportsContext);
    const reports = context.reports;

    const columns = [
        { name: 'Title', uid: 'title' },
        { name: 'Date', uid: 'date' },
        { name: 'Format', uid: 'edit' },
        { name: 'Actions', uid: 'actions' },
    ];

    const deltereport = (idreport) => {
        context.deleteUsersData(idreport);
        console.log("Eliminando reporte...");
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const renderCell = React.useCallback((report, columnKey) => {
        
        const cellValue = report[columnKey];
        

        switch (columnKey) {
            case "edit":
                if (cellValue.endsWith('.pdf')) {
                    return <a href={cellValue} target="_blank" rel="noreferrer">
                        <img 
                            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/27_Pdf_File_Type_Adobe_logo_logos-512.png" 
                            className="w-12 h-12"
                        />
                        </a>;
                } else if (cellValue.endsWith('.zip')) { 
                    return <a href={cellValue} download>Downloadsss ZIP</a>;
                } else if (cellValue.endsWith('.jpg') || cellValue.endsWith('.png')) {
                    return <img src={cellValue} alt="File"  />;
                } else {
                    return <a href={cellValue} download>
                        <img
                            src="https://amritfoundationofindia.in/wp-content/uploads/2018/08/download-logo.png"
                            className="w-12 h-12"
                        />
                    </a>; 
                }
            case "date":
                return formatDate(cellValue);
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                
                                <ModalPostReport />
                                
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                 
                                
                                <ModalUpdateReport id ={report.idreport} />
                                
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <button onClick={() => deltereport(report.idreport)}>
                                <DeleteIcon />
                                    </button>
                                
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <NavbarCompo />
        
            <div className="flex justify-center items-center mt-20">
                <div className="w-4/5">
                    <Table aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={reports || []}>
                            {(item) => (
                                <TableRow key={item.idreport}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};