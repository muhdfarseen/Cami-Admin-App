import React, { useState, useEffect } from 'react';
import { Group, Box, Text, Switch, Divider, Input, rem, Button, Modal, Badge, Alert, Title, Select, NumberInput, Table, Card, ScrollArea, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconCurrencyRupee, IconInfoCircle, IconUserSearch, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

function StudentDetails() {

    const baseURL = 'http://localhost:3000';

    const icon = <IconInfoCircle />;
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const openDeleteModal = (studentId) => {
        setDeleteModalStudentId(studentId); // Set the student ID
        setDeleteModalOpened(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpened(false);
    };
    const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

    const [students, setStudents] = useState([]);
    const [register_number, setregister_number] = useState(null);

    const [registerNumberFilter, setRegisterNumberFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [admissionYearFilter, setAdmissionYearFilter] = useState('');
    const [deleteModalStudentId, setDeleteModalStudentId] = useState(null);


    const filteredStudents = students.filter(student => {
        if (registerNumberFilter && student.register_number !== registerNumberFilter) {
            return false;
        }
        if (departmentFilter && student.department !== departmentFilter) {
            return false;
        }
        if (admissionYearFilter && student.admission_year !== admissionYearFilter) {
            return false;
        }
        return true;
    });

    const handleDeleteClick = () => {
        axios.delete(`${baseURL}/student/${deleteModalStudentId}`)
            .then(response => {
                // Student deleted successfully, update the state
                setStudents(prevStudents => prevStudents.filter(student => student.register_number !== deleteModalStudentId));
                // Then close the delete modal
                console.log('deleted');
                closeDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting student:', error);
                // Handle error
            });
    };
    



    const handleEditClick = () => {
        // Perform edit action here
        // Then close the edit modal
        closeEditModal();
    };


    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    useEffect(() => {
        axios.get(`${baseURL}/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    }, []);


    const rows = filteredStudents.map((student, index) => (
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
                <ActionIcon
                    variant="transparent"
                    color="red"
                    aria-label="delete"
                    onClick={() => openDeleteModal(student.register_number)}
                >
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
                    <Input.Wrapper>
                        <Input
                            placeholder="Search By Register Number"
                            leftSection={<IconUserSearch size={16} />}
                            value={registerNumberFilter}
                            onChange={event => setRegisterNumberFilter(event.target.value)}
                        />
                    </Input.Wrapper>
                    <Select
                        placeholder="Filter By Dept"
                        data={['', 'IT', 'CS', 'EC', 'EEE']}
                        value={departmentFilter}
                        onChange={value => setDepartmentFilter(value)}
                        leftSection={<IconListSearch size={16} />}
                    />
                    <NumberInput
                        placeholder="Filter By Year Batch"
                        min={2020}
                        max={2090}
                        value={admissionYearFilter}
                        onChange={value => setAdmissionYearFilter(value)}
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