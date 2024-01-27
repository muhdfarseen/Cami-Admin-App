import React from 'react'
import { Group, Box, Text, Switch, Divider, Input, rem, Button, Modal, Badge, Alert, Title, Select, NumberInput, Table, Card, ScrollArea, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconCurrencyRupee, IconInfoCircle, IconUserSearch, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';

function StudentDetails() {

    const icon = <IconInfoCircle />;
    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

    const handleDeleteClick = () => {
        // Perform delete action here
        // Then close the delete modal
        closeDeleteModal();
    };

    const handleEditClick = () => {
        // Perform edit action here
        // Then close the edit modal
        closeEditModal();
    };

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
            <Table.Td>1</Table.Td>
            <Table.Td>

                {element.PassStatus === "Active" ?
                    (<Badge variant="light" color="green">Active</Badge>) :
                    (<Badge variant="light" color="yellow">Inactive</Badge>)}

            </Table.Td>
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
            <Table.Td>
                <ActionIcon variant="transparent" aria-label="edit" onClick={openEditModal}>
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="transparent" color="red" aria-label="delete" onClick={openDeleteModal}>
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>

            <Group px={20} my={20} justify="space-between">

                <Title style={{ fontFamily: 'Uber move' }} order={2}>Student Details</Title>

                <Group>
                    <Input.Wrapper
                    //label="Search By Register Number"
                    >
                        <Input
                            placeholder="Enter Register Number"
                            leftSection={<IconUserSearch size={16} />} />
                    </Input.Wrapper>
                    <Select
                        //label="Filter By Dept"
                        placeholder="Choose Department"
                        data={['IT', 'CS', 'EC', 'EEE']}
                        leftSection={<IconListSearch size={16} />}
                    />
                    <NumberInput
                        // label="Filter By Year Batch"
                        placeholder="Enter Year"
                        min={2020}
                        max={2090}
                        leftSection={<IconCalendarSearch size={16} />}
                    />
                </Group>

            </Group>

            <Card px={20} py={0} >

                <ScrollArea style={{ height: 'calc(100vh - 160px)', overflowY: 'auto' }} type="scroll" scrollbarSize={7}>

                    <Table stickyHeader verticalSpacing="sm" horizontalSpacing="sm" withRowBorders={false} >
                        <Table.Thead style={{ background: '#EFEFEF', borderRadius: '20px' }}>
                            <Table.Tr>
                                <Table.Th style={{ borderRadius: '15px 0px 0px 15px' }}>Reg No</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Department</Table.Th>
                                <Table.Th>Batch</Table.Th>
                                <Table.Th>Bus From</Table.Th>
                                <Table.Th>Bus No</Table.Th>
                                <Table.Th>Pass Status</Table.Th>
                                <Table.Th>Amount Paid</Table.Th>
                                <Table.Th>Paid On</Table.Th>
                                <Table.Th>Pass Expires On</Table.Th>
                                <Table.Th style={{ borderRadius: '0px 15px 15px 0px' }}>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>

                            {rows}

                        </Table.Tbody>


                    </Table>
                </ScrollArea>


            </Card>

            {/* Modal For delete user confirmation */}

            <Modal centered opened={deleteModalOpened} onClose={closeDeleteModal} withCloseButton={false}>
                <Alert variant="light" color="red" title="Confirm Deletion" icon={icon}>
                    Are you sure you want to delete this user? This action cannot be undone. <br />
                    <Button mt={10} color='red' leftSection={<IconTrash size={14} />} onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </Alert>
            </Modal>

            {/* Modal For edit user */}

            <Modal centered size="lg" opened={editModalOpened} onClose={closeEditModal} withCloseButton={false}>

                <Title style={{ fontFamily: 'Uber move' }} order={3}> Edit Student Info</Title>

                <Divider my="xs" label="Personal Info" labelPosition="left" />
                <Group grow >
                    <Input.Wrapper label="Register Number" >
                        <Input variant="filled" placeholder="Register Number" />
                    </Input.Wrapper>
                    <Input.Wrapper label="Name" >
                        <Input variant="filled" placeholder="Name" />
                    </Input.Wrapper>
                </Group>
                <Group grow mt={20}>
                    <Select
                        label="Department"
                        variant="filled"
                        placeholder="Choose Department"
                        data={['IT', 'CS', 'EC', 'EEE']}

                    />
                    <NumberInput
                        label="Admission Year"
                        placeholder="Year"
                        variant="filled"
                        min={2020}
                        max={2090}
                    />
                </Group>
                <Divider mt={20} my="xs" label="Bus Pass Info" labelPosition="left" />
                <Group grow>
                    <Input.Wrapper label="Bus from" >
                        <Input variant="filled" placeholder="Address" />
                    </Input.Wrapper>
                    <NumberInput
                        label="Assign Bus No"
                        variant="filled"
                        placeholder="-"
                        min={1}
                        max={6}
                        
                    />
                    <NumberInput
                        label="Amount Paid"
                        placeholder="Amount"
                        hideControls
                        leftSection={<IconCurrencyRupee style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                    />
                </Group>

                <Group mt={20} grow>
                    <DateInput
                        clearable
                        label="Date of Payment"
                        placeholder="DD/MM/YYYY"
                    />
                    <DateInput
                        clearable
                        label="Pass Expires On"
                        placeholder="DD/MM/YYYY"
                    />
                    <Box>
                        <Text size="sm" fw={500} >   Activate Bus Pass</Text>
                        <Switch mt={5} size="lg" onLabel="Active" offLabel="Inactive" />
                    </Box>
                </Group>
                <Group mt={30} grow>
                    <Button variant='outline' color='red'>Cancel</Button>
                    <Button color='green'>Save</Button>
                </Group>
            </Modal>


        </div >
    )
}

export default StudentDetails