import React from 'react'
import { Group, Input, Title, Select, NumberInput } from '@mantine/core';


function DeleteDatabase() {
    return (
        <div>
            <Group px={20} my={10} justify="space-between">

                <Title style={{ fontFamily: 'Uber move' }} order={2}>Delete Database</Title>

            </Group>
        </div>
    )
}

export default DeleteDatabase