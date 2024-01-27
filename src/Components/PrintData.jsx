import React, { useRef } from 'react';
import { Group, Box, Text, Switch, Divider, Input, rem, Button, Modal, Badge, Alert, Title, Select, NumberInput, Table, Card, ScrollArea, ActionIcon } from '@mantine/core';
import { IconEdit, IconPrinter, IconBus, IconTrash, IconCurrencyRupee, IconInfoCircle, IconUserSearch, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useReactToPrint } from 'react-to-print';

function PrintData() {

    const elements = [
        {
            "Name": "John Doe",
            "RegisterNumber": "R001",
            "Department": "Computer Science",
            "YearBatch": "2023",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 500,
            "FeePaidDate": "2024-01-01",
            "BusPassExpiresOn": "2024-12-31"
        },
        {
            "Name": "Jane Smith",
            "RegisterNumber": "R002",
            "Department": "Electrical Engineering",
            "YearBatch": "2022",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Alice Johnson",
            "RegisterNumber": "R003",
            "Department": "Mechanical Engineering",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 600,
            "FeePaidDate": "2024-02-15",
            "BusPassExpiresOn": "2024-11-30"
        },
        {
            "Name": "Bob Wilson",
            "RegisterNumber": "R004",
            "Department": "Civil Engineering",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 450,
            "FeePaidDate": "2023-12-10",
            "BusPassExpiresOn": "2024-10-31"
        },
        {
            "Name": "Eva Martinez",
            "RegisterNumber": "R005",
            "Department": "Chemical Engineering",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Michael Brown",
            "RegisterNumber": "R006",
            "Department": "Computer Science",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 550,
            "FeePaidDate": "2024-03-20",
            "BusPassExpiresOn": "2024-09-30"
        },
        {
            "Name": "Sophia Lee",
            "RegisterNumber": "R007",
            "Department": "Electrical Engineering",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 480,
            "FeePaidDate": "2023-11-05",
            "BusPassExpiresOn": "2024-08-31"
        },
        {
            "Name": "Daniel White",
            "RegisterNumber": "R008",
            "Department": "Mechanical Engineering",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Olivia Davis",
            "RegisterNumber": "R009",
            "Department": "Civil Engineering",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 520,
            "FeePaidDate": "2024-04-15",
            "BusPassExpiresOn": "2024-07-31"
        },
        {
            "Name": "Christopher Harris",
            "RegisterNumber": "R010",
            "Department": "Chemical Engineering",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 400,
            "FeePaidDate": "2023-09-22",
            "BusPassExpiresOn": "2024-06-30"
        },
        {
            "Name": "Emma Smith",
            "RegisterNumber": "R011",
            "Department": "Computer Science",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Liam Johnson",
            "RegisterNumber": "R012",
            "Department": "Electrical Engineering",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 530,
            "FeePaidDate": "2024-05-12",
            "BusPassExpiresOn": "2024-05-31"
        },
        {
            "Name": "Ava Wilson",
            "RegisterNumber": "R013",
            "Department": "Mechanical Engineering",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 470,
            "FeePaidDate": "2023-07-18",
            "BusPassExpiresOn": "2024-04-30"
        },
        {
            "Name": "Noah Martinez",
            "RegisterNumber": "R014",
            "Department": "Civil Engineering",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Isabella Brown",
            "RegisterNumber": "R015",
            "Department": "Chemical Engineering",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 580,
            "FeePaidDate": "2024-06-25",
            "BusPassExpiresOn": "2024-03-31"
        },
        {
            "Name": "Mason Lee",
            "RegisterNumber": "R016",
            "Department": "Computer Science",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 490,
            "FeePaidDate": "2023-04-09",
            "BusPassExpiresOn": "2024-02-28"
        },
        {
            "Name": "Charlotte White",
            "RegisterNumber": "R017",
            "Department": "Electrical Engineering",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        },
        {
            "Name": "Carter Davis",
            "RegisterNumber": "R018",
            "Department": "Mechanical Engineering",
            "YearBatch": "2024",
            "BusFrom": "Downtown Terminal",
            "PassStatus": "Active",
            "FeePaidAmount": 510,
            "FeePaidDate": "2024-09-10",
            "BusPassExpiresOn": "2024-01-31"
        },
        {
            "Name": "Amelia Harris",
            "RegisterNumber": "R019",
            "Department": "Civil Engineering",
            "YearBatch": "2022",
            "BusFrom": "City Center",
            "PassStatus": "Active",
            "FeePaidAmount": 420,
            "FeePaidDate": "2023-01-14",
            "BusPassExpiresOn": "2023-12-31"
        },
        {
            "Name": "Logan Smith",
            "RegisterNumber": "R020",
            "Department": "Chemical Engineering",
            "YearBatch": "2023",
            "BusFrom": "Suburb Station",
            "PassStatus": "Inactive",
            "FeePaidAmount": 0,
            "FeePaidDate": null,
            "BusPassExpiresOn": null
        }
    ];

    const rows = elements.map((element, index) => (
        <Table.Tr key={index}>
            <Table.Td>{element.RegisterNumber}</Table.Td>
            <Table.Td><b>{element.Name}</b></Table.Td>
            <Table.Td>{element.Department}</Table.Td>
            <Table.Td>{element.YearBatch}</Table.Td>
            <Table.Td>{element.BusFrom}</Table.Td>
            <Table.Td>1 </Table.Td>
            <Table.Td>
                {element.FeePaidAmount === 0 ? (<>--</>) : (<b>₹{element.FeePaidAmount}</b>)}
            </Table.Td>
            <Table.Td>
                {element.FeePaidAmount === 0 ? (<>--</>) : (element.FeePaidDate)}
            </Table.Td>
            <Table.Td>
                {element.BusPassExpiresOn === null ? (
                    <>--</>
                ) : (
                    <>
                        {element.BusPassExpiresOn}
                    </>
                )}
            </Table.Td>

        </Table.Tr>
    ));


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Printed Data',
        onBeforeGetContent: () => {
            // You can customize the PDF document here if needed
        },
        onAfterPrint: () => {
            // You can perform additional actions after the print is complete
        },
    });


    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title style={{ fontFamily: 'Uber move' }} order={2}>Print Data</Title>

                <Group>
                    <Select
                        //label="Filter By Dept"
                        placeholder="Choose Department"
                        data={['IT', 'CS', 'EC', 'EEE']}
                        leftSection={<IconListSearch size={16} />}
                    />
                    <Select
                        //label="Filter By Dept"
                        placeholder="Choose Bus"
                        data={['1', '2', '3', '4']}
                        leftSection={<IconBus size={16} />}
                    />
                    <NumberInput
                        // label="Filter By Year Batch"
                        placeholder="Enter Year"
                        min={2020}
                        max={2090}
                        leftSection={<IconCalendarSearch size={16} />}
                    />
                    <Button onClick={handlePrint} variant='default' style={{ backgroundColor: '#F6F8FA' }} leftSection={<IconPrinter size={17} />} radius="md">
                        Print
                    </Button>
                </Group>

            </Group>

            <Card px={20} py={0} ref={componentRef} >
                <ScrollArea style={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }} type="scroll" scrollbarSize={7}>
                    <Table striped withTableBorder withColumnBorders  stickyHeader verticalSpacing="sm" horizontalSpacing="sm" >
                        <Table.Thead >
                            <Table.Tr>
                                <Table.Th>Reg No</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Department</Table.Th>
                                <Table.Th>Batch</Table.Th>
                                <Table.Th>Bus From</Table.Th>
                                <Table.Th>Bus No</Table.Th>
                                <Table.Th>Amount Paid</Table.Th>
                                <Table.Th>Paid On</Table.Th>
                                <Table.Th>Pass Expires On</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody> {rows} </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Card>
        </div>
    )
}

export default PrintData