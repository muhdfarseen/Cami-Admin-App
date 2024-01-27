import React from 'react'
import { Group, PinInput, Card, Text, Button, Flex, Title} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';


function DeleteDatabase() {
    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title order={2}>Delete Database</Title>
            </Group>
            <Flex px={20} >
                <Card style={{ backgroundColor: '#F6F8FA' }} withBorder radius="md">
                    <Text mb="xs" fw={500}>
                        Delete all Record of Admission Year
                    </Text>
                    <PinInput placeholder="Y" type="number" />
                    <Group justify="space-between" mt="md">
                        <Button color="red" leftSection={<IconTrash size={17} />} radius="md">
                            Delete
                        </Button>
                    </Group>
                </Card>
            </Flex>
        </div>
    )
}

export default DeleteDatabase