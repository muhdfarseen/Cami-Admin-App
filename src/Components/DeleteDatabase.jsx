import React, { useState } from 'react';
import axios from 'axios';
import { Group, PinInput, Card, Text, Button, Flex, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

function DeleteDatabase() {

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [year, setYear] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/delete-student/${year}`);
            alert("data deleted")
        } catch (error) {
            console.error('Error deleting students:', error);
        }
    };

    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title order={2}>Delete Database</Title>
            </Group>
            <Flex px={20}>
                <Card style={{ backgroundColor: '#F6F8FA' }} withBorder radius="md">
                    <Text mb="xs" fw={500}>
                        Delete all Record of Admission Year
                    </Text>
                    <PinInput
                        placeholder="Y"
                        type="number"
                        value={year}
                        onChange={(value) => setYear(value)}
                    />

                    <Group justify="space-between" mt="md">
                        <Button
                            color="red"
                            leftSection={<IconTrash size={17} />}
                            radius="md"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Group>
                </Card>
            </Flex>
        </div>
    );
}

export default DeleteDatabase;
