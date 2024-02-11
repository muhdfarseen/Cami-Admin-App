import React, { useRef, useState, useEffect } from 'react';
import { Group, Box, Text, Divider, Button, Title, Select, NumberInput, Table, Card, ScrollArea } from '@mantine/core';
import { IconPrinter, IconBus, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

function PrintData() {

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [students, setStudents] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedBusNumber, setSelectedBusNumber] = useState(null);
    const [selectedAdmissionYear, setSelectedAdmissionYear] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`${baseUrl}/students`)
            .then(response => {
                // Filter students with an active pass
                const activeStudents = response.data.filter(student => student.pass_status === 1);
                setStudents(activeStudents);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'StudentDetails',
    });

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Filter students based on selected options
    const filteredStudents = students.filter(student => {
        if (selectedDepartment && student.department !== selectedDepartment) {
            return false;
        }
        if (selectedBusNumber && student.bus_number !== parseInt(selectedBusNumber)) {
            return false;
        }
        if (selectedAdmissionYear && student.admission_year !== selectedAdmissionYear) {
            return false;
        }
        return true;
    });

    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title order={2}>Print Data</Title>
                <Group>
                    <Select
                        placeholder="Choose Department"
                        data={['IT', 'Computer Science', 'EC', 'EEE']}
                        onChange={value => setSelectedDepartment(value)}
                        leftSection={<IconListSearch size={16} />}
                    />

                    <Select
                        placeholder="Choose Bus No"
                        data={['1', '2', '3', '4']}
                        onChange={value => setSelectedBusNumber(value)}
                        leftSection={<IconBus size={16} />}
                    />

                    <NumberInput
                        placeholder="Enter Admission Year"
                        min={2020}
                        max={2090}
                        onChange={value => setSelectedAdmissionYear(value)}
                        leftSection={<IconCalendarSearch size={16} />}
                    />
                    <Button onClick={handlePrint} variant='default' style={{ backgroundColor: '#F6F8FA' }} leftSection={<IconPrinter size={17} />} radius="md">
                        Print
                    </Button>
                </Group>
            </Group>

            <Card px={20} py={0} ref={componentRef}>
                <ScrollArea style={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }} type="scroll" scrollbarSize={7}>
                    <Table striped withTableBorder withColumnBorders stickyHeader verticalSpacing="sm" horizontalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Reg No</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Department</Table.Th>
                                <Table.Th>Adsm Year</Table.Th>
                                <Table.Th>Bus From</Table.Th>
                                <Table.Th>Bus No</Table.Th>
                                <Table.Th>Amount Paid</Table.Th>
                                <Table.Th>Paid On</Table.Th>
                                <Table.Th>Pass Expires On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {filteredStudents.map((student, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td>{student.register_number}</Table.Td>
                                    <Table.Td><b>{student.full_name}</b></Table.Td>
                                    <Table.Td>{student.department}</Table.Td>
                                    <Table.Td>{student.admission_year}</Table.Td>
                                    <Table.Td>{student.bus_from}</Table.Td>
                                    <Table.Td>{student.bus_number}</Table.Td>
                                    <Table.Td>{student.amount_paid === '0' ? '--' : `₹${student.amount_paid}`}</Table.Td>
                                    <Table.Td>{student.paid_on === null ? '--' : formatDateString(student.paid_on)}</Table.Td>
                                    <Table.Td>{student.pass_expires_on === null ? '--' : formatDateString(student.pass_expires_on)}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Card>
        </div>
    );
}

export default PrintData;
