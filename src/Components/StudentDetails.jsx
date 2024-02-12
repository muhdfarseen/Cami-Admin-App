import React, { useState, useEffect } from 'react';
import { Group, Box, Text, Switch, Divider, Input, rem, Button, Modal, Badge, Alert, Title, Select, NumberInput, Table, Card, ScrollArea, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconCurrencyRupee, IconInfoCircle, IconUserSearch, IconListSearch, IconCalendarSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

function StudentDetails() {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const icon = <IconInfoCircle />;
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [olderRegisterNumber, setOlderRegisterNumber] = useState(null); // State variable for older register number

    const openDeleteModal = (studentId) => {
        setDeleteModalStudentId(studentId);
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

    const [selectedStudent, setSelectedStudent] = useState({
        register_number: '',
        full_name: '',
        dob: '',
        department: '',
        admission_year: '',
        bus_from: '',
        bus_number: '',
        pass_status: '',
        amount_paid: '',
        paid_on: '',
        pass_expires_on: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
                setStudents(prevStudents => prevStudents.filter(student => student.register_number !== deleteModalStudentId));
                closeDeleteModal();
                alert('deleted');
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setOlderRegisterNumber(student.register_number); // Set the older register number when editing
        openEditModal();
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

    const handleSaveClick = () => {
        const formattedPaidOn = formatDate(selectedStudent.paid_on);
        const formattedPassExpiresOn = formatDate(selectedStudent.pass_expires_on);

        console.log("Selected Student before save:", selectedStudent);

        if (!selectedStudent.dob) {
            alert('Please provide a value for the Date of Birth');
            return;
        }

        const updatedStudent = {
            ...selectedStudent,
            paid_on: formattedPaidOn,
            pass_expires_on: formattedPassExpiresOn
        };

        axios.put(`${baseURL}/student/${olderRegisterNumber}`, updatedStudent)
            .then(response => {
                alert('Student data updated successfully:', response.data);
                closeEditModal();
                fetchStudents();
            })
            .catch(error => {
                alert('Error updating student data:', error);
            });
    };

    const fetchStudents = () => {
        axios.get(`${baseURL}/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
            });
    };

    const rows = filteredStudents.map((student, index) => (
        <Table.Tr key={index}>
            <Table.Td>{student.register_number}</Table.Td>
            <Table.Td>{student.dob}</Table.Td>
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
                <ActionIcon variant="transparent" aria-label="edit" onClick={() => handleEditClick(student)}>
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <ActionIcon variant="transparent" color="red" aria-label="delete" onClick={() => openDeleteModal(student.register_number)}>
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
                                <Table.Th>DOB</Table.Th>
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
                    {/* Register Number */}
                    <Input.Wrapper label="Register Number" >
                        <Input
                            variant="filled"
                            placeholder="Register Number"
                            defaultValue={selectedStudent.register_number}
                            onChange={event => setSelectedStudent(prevState => ({ ...prevState, register_number: event.target.value }))}
                        />
                    </Input.Wrapper>
                    {/* Name */}
                    <Input.Wrapper label="Name" >
                        <Input
                            variant="filled"
                            placeholder="Name"
                            defaultValue={selectedStudent.full_name}
                            onChange={event => setSelectedStudent(prevState => ({ ...prevState, full_name: event.target.value }))}
                        />
                    </Input.Wrapper>
                </Group>
                <Group grow mt={20}>

                    <Input.Wrapper label="Date of Birth">
                        <Input
                            variant="filled"
                            placeholder="dd/mm/yyyy"
                            defaultValue={selectedStudent.dob}
                            onChange={event => setSelectedStudent(prevState => ({ ...prevState, dob: event.target.value }))}                            name="password-DOB" // Ensure that name matches the property name exactly
                        />
                    </Input.Wrapper>

                    <Select
                        label="Department"
                        variant="filled"
                        placeholder="Choose Department"
                        data={['IT', 'CS', 'EC', 'EEE']}
                        value={selectedStudent.department}
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, department: value }))}
                    />
                    {/* Admission Year */}
                    <NumberInput
                        label="Admission Year"
                        placeholder="Year"
                        variant="filled"
                        min={2020}
                        max={2090}
                        value={selectedStudent.admission_year}
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, admission_year: value }))}
                    />
                </Group>
                <Divider mt={20} my="xs" label="Bus Pass Info" labelPosition="left" />
                <Group grow>
                    {/* Bus from */}
                    <Input.Wrapper label="Bus from" >
                        <Input
                            variant="filled"
                            placeholder="Address"
                            defaultValue={selectedStudent.bus_from}
                            onChange={event => setSelectedStudent(prevState => ({ ...prevState, bus_from: event.target.value }))}
                        />
                    </Input.Wrapper>
                    {/* Assign Bus No */}
                    <NumberInput
                        label="Assign Bus No"
                        variant="filled"
                        placeholder="-"
                        min={1}
                        max={6}
                        value={selectedStudent.bus_number}
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, bus_number: value }))}
                    />
                    {/* Amount Paid */}
                    <NumberInput
                        label="Amount Paid"
                        placeholder="Amount"
                        hideControls
                        leftSection={<IconCurrencyRupee style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
                        value={selectedStudent.amount_paid}
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, amount_paid: value }))}
                    />
                </Group>
                <Group mt={20} grow>
                    {/* Date of Payment */}
                    <DateInput
                        clearable
                        label="Date of Payment"
                        placeholder="DD/MM/YYYY"
                        value={selectedStudent.paid_on ? new Date(selectedStudent.paid_on) : null} // Convert the date string to a Date object or null
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, paid_on: value ? value.toISOString() : null }))} // Convert the Date object to a string
                    />
                    <DateInput
                        clearable
                        label="Pass Expires On"
                        placeholder="DD/MM/YYYY"
                        value={selectedStudent.pass_expires_on ? new Date(selectedStudent.pass_expires_on) : null} // Convert the date string to a Date object or null
                        onChange={value => setSelectedStudent(prevState => ({ ...prevState, pass_expires_on: value ? value.toISOString() : null }))} // Convert the Date object to a string
                    />

                    <Box>
                        {/* Activate Bus Pass */}
                        <Text size="sm" fw={500} >   Activate Bus Pass</Text>
                        <Switch
                            mt={5}
                            size="lg"
                            onLabel="Active"
                            offLabel="Inactive"
                            defaultChecked={selectedStudent.pass_status === 1}
                            onChange={() => setSelectedStudent(prevState => ({ ...prevState, pass_status: selectedStudent.pass_status === 1 ? 0 : 1 }))}
                        />
                    </Box>
                </Group>
                <Group mt={30} grow>
                    {/* Cancel Button */}
                    <Button variant='outline' color='red' onClick={closeEditModal}>Cancel</Button>
                    {/* Save Button */}
                    <Button color='green' onClick={handleSaveClick}>Save</Button>
                </Group>
            </Modal>

        </div >
    )
}

export default StudentDetails;
