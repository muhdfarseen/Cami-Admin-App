import React, { useState, useEffect } from 'react';
import { Group, Box, Text, Switch, Divider, Input, rem, Button, Modal, Badge, Alert, Title, Select, NumberInput, Table, Card, ScrollArea, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconCurrencyRupee, IconInfoCircle, IconUserSearch, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

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

    const [students, setStudents] = useState([]);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/students')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    }, []);


    const rows = students.map((student, index) => (
        <Table.Tr key={index}>
            <Table.Td>{student.register_number}</Table.Td>
            <Table.Td><b>{student.full_name}</b></Table.Td>
            <Table.Td>{student.department}</Table.Td>
            <Table.Td>{student.admission_year}</Table.Td>
            <Table.Td>{student.bus_from}</Table.Td>
            <Table.Td>{student.bus_number}</Table.Td>
            <Table.Td>
                {student.pass_status === 1 ?
                    (<Badge variant="light" color="green">Active</Badge>) :
                    (<Badge variant="light" color="yellow">Inactive</Badge>)}
            </Table.Td>
            <Table.Td>
                {student.amount_paid === '0' ? (<>--</>) : (<b>₹{student.amount_paid}</b>)}
            </Table.Td>
            <Table.Td>
                {student.paid_on === null ? (<>--</>) : formatDateString(student.paid_on)}
            </Table.Td>

            <Table.Td>
                {student.pass_expires_on === null ? (<>--</>) : formatDateString(student.pass_expires_on)}
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

                <Title order={2}>Student Details</Title>

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
                                <Table.Th>Admsn Year</Table.Th>
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

                <Title order={3}> Edit Student Info</Title>

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