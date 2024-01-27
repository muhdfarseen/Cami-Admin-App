import React, { useState } from 'react';
import {
    Group,
    SegmentedControl,
    rem,
    Center,
    Button,
    Input,
    Title,
    Textarea,
    Select,
    NumberInput,
    Badge,
    Card,
    Text,
    Box,
    Grid
} from '@mantine/core';
import { IconSend, IconChecks, IconTrash, IconMessagePlus, IconMessageCheck } from '@tabler/icons-react';

function SendMessages() {

    const notifications = Array.from({ length: 10 }, (_, index) => index + 1);


    const [activeTab, setActiveTab] = useState('Compose');

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title style={{ fontFamily: 'Uber move' }} order={2}>
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
                                <Button radius="md" rightSection={<IconSend size={17} />}>Send</Button>
                            </Group>
                        </Card.Section>

                        <Textarea minRows={1} autosize mt={10} resize="vertical" label="Subject" placeholder='Heading...' />
                        <Textarea minRows={4} autosize mt={10} resize="vertical" label="Description" placeholder='description...' />
                    </Card>
                </Box>
            )}

            {activeTab === 'Delivered' && (
                <Box px={20} >
                    <Card withBorder radius="md">
                        <Card.Section style={{ backgroundColor: '#F6F8FA' }} withBorder inheritPadding py="xs" mb={15}>
                            <Group justify="space-between">
                                <Text fw={500}>Delivered Messages</Text>
                                <Button radius="md" color='red' leftSection={<IconTrash size={17} />}>Delete All</Button>
                            </Group>
                        </Card.Section>

                        <Grid>

                            {notifications.map((notification) => (
                                <Grid.Col key={notification} span={{ base: 12, md: 6, lg: 3 }}>
                                    <Card withBorder radius="md">
                                        <Text mb="xs" fw={500}>
                                            No Bus Tomorrow
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Due to unforeseen circumstances, there will be no bus service tomorrow. We apologize for any inconvenience caused.
                                        </Text>
                                        <Group justify="space-between" mt="md">
                                            <Button color="dark" leftSection={<IconTrash size={17} />} radius="md">
                                                Delete
                                            </Button>
                                            <Badge leftSection={<IconChecks style={{ width: rem(12), height: rem(12) }} />} variant="outline" color="gray">
                                                12 Jan 23
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