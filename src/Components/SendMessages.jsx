import React, { useState, useEffect } from 'react';
import {
    Group,
    SegmentedControl,
    rem,
    Center,
    Button,
    Input,
    Flex,
    Title,
    Textarea,
    Select,
    NumberInput,
    MultiSelect,
    Badge,
    Card,
    Text,
    Box,
    Grid
} from '@mantine/core';
import { IconSend, IconChecks, IconTrash, IconMessagePlus, IconMessageCheck } from '@tabler/icons-react';

function SendMessages() {

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [activeTab, setActiveTab] = useState('Compose');
    const [messages, setMessages] = useState([]);

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDept, setSelectedDept] = useState(['All']);
    const [selectedYear, setSelectedYear] = useState(['All']);

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const formatSentTime = (sentTime) => {
        const date = new Date(sentTime);
        return date.toLocaleString();
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDeptChange = (values) => {
        setSelectedDept(values);
    };

    const handleYearChange = (values) => {
        setSelectedYear(values);
    };

    const composeMessage = () => {
        // Make a POST request to your server's API endpoint
        fetch(`${baseUrl}/compose-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
                description,
                'rec-dept': selectedDept,
                'rec-year': selectedYear
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to compose message');
                }
                // Optionally handle success (e.g., display a success message)
                alert('Message composed successfully');
                // Clear the input fields after composing the message
                setSubject('');
                setDescription('');
            })
            .catch(error => console.error('Error composing message:', error));
    };


    useEffect(() => {
        if (activeTab === 'Delivered') {
            fetch(`${baseUrl}/delivered-messages`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch delivered messages');
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setMessages(data);
                    } else {
                        throw new Error('Invalid data format for delivered messages');
                    }
                })
                .catch(error => console.error('Error fetching delivered messages:', error));
        }
    }, [activeTab]);

    const fetchDeliveredMessages = () => {
        fetch(`${baseUrl}/delivered-messages`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch delivered messages');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    throw new Error('Invalid data format for delivered messages');
                }
            })
            .catch(error => console.error('Error fetching delivered messages:', error));
    };


    const deleteMessage = (msg_id) => {
        fetch(`${baseUrl}/message/${msg_id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete message');
                }
                else {
                    alert("message deleted")
                }

                return fetchDeliveredMessages();
            })
            .catch(error => console.error('Error deleting message:', error));
    };

    const deleteAllMessages = () => {
        fetch(`${baseUrl}/delete-all-messages`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete all messages');
                }
                else {
                    alert("All messages deleted")
                }
                return fetchDeliveredMessages();
            })
            .catch(error => console.error('Error deleting all messages:', error));
    };



    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title order={2}>
                    Messages
                </Title>
                <SegmentedControl
                    fullWidth
                    value={activeTab}
                    onChange={handleTabChange}
                    data={[
                        {
                            value: 'Compose',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconMessagePlus style={{ width: rem(16), height: rem(16) }} />
                                    <span>Compose</span>
                                </Center>
                            ),
                        },
                        {
                            value: 'Delivered',
                            label: (
                                <Center style={{ gap: 10 }}>
                                    <IconMessageCheck style={{ width: rem(16), height: rem(16) }} />
                                    <span>Delivered</span>
                                </Center>
                            ),
                        },
                    ]}
                />
            </Group>

            {activeTab === 'Compose' && (
                <Box px={20} >
                    <Card withBorder radius="md">
                        <Card.Section style={{ backgroundColor: '#F6F8FA' }} withBorder inheritPadding py="xs">
                            <Group justify="space-between">
                                <Text fw={500}>New Message</Text>
                                <Flex gap={10} align="center" justify="space-between" wrap="wrap">
                                    <MultiSelect
                                        placeholder="Department"
                                        data={['All', 'IT', 'CS', 'EC', 'EEE']}
                                        value={selectedDept}
                                        onChange={handleDeptChange}
                                        clearable
                                    />
                                    <MultiSelect
                                        placeholder="Adm Year"
                                        data={['All', '2020', '2021', '2022', '2023', '2024']}
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                        clearable
                                    />
                                    <Button radius="md" rightSection={<IconSend size={17} />} onClick={composeMessage}>Send</Button>
                                </Flex>
                            </Group>
                        </Card.Section>
                        <Textarea
                            minRows={1}
                            autosize
                            mt={10}
                            resize="vertical"
                            label="Subject"
                            placeholder="heading..."
                            value={subject}
                            onChange={handleSubjectChange}
                        />
                        <Textarea
                            minRows={4}
                            autosize
                            mt={10}
                            resize="vertical"
                            label="Description"
                            placeholder="description..."
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Card>
                </Box>
            )}

            {activeTab === 'Delivered' && (
                <Box px={20} >
                    <Card withBorder radius="md">
                        <Card.Section style={{ backgroundColor: '#F6F8FA' }} withBorder inheritPadding py="xs" mb={15}>
                            <Group justify="space-between">
                                <Text fw={500}>Delivered Messages</Text>
                                <Button radius="md" color='red' leftSection={<IconTrash size={17} />} onClick={deleteAllMessages}>Delete All</Button>
                            </Group>
                        </Card.Section>
                        <Grid>
                            {messages.map(message => (
                                <Grid.Col key={message.msg_id} span={{ base: 12, md: 6, lg: 3 }}>
                                    <Card withBorder radius="md">
                                        <Text fw={500}>
                                            {message.subject}
                                        </Text>
                                        <Flex gap={10}>
                                            <Badge my={10} size='sm' radius={0} variant="light" color="blue">
                                                {JSON.parse(message['rec-dept']).join(', ')}
                                            </Badge>
                                            <Badge my={10} size='sm' radius={0} variant="light" color="green">
                                                {JSON.parse(message['rec-year']).join(', ')}
                                            </Badge>
                                        </Flex>
                                        <Text size="sm" c="dimmed">
                                            {message.description}
                                        </Text>
                                        <Group justify="space-between" align='center' mt="md">
                                            <Button color="dark" leftSection={<IconTrash size={17} />} radius="md" onClick={() => deleteMessage(message.msg_id)}>
                                                Delete
                                            </Button>
                                            <Badge leftSection={<IconChecks style={{ width: rem(12), height: rem(12) }} />} variant="outline" color="green">
                                                {formatSentTime(message.sent_time)}
                                            </Badge>
                                        </Group>
                                    </Card>
                                </Grid.Col>
                            ))}

                        </Grid>
                    </Card>
                </Box>
            )}
        </div>
    );
}

export default SendMessages;
