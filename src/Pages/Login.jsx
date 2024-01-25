import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Center, Title, Divider, Text, Button, Paper, PasswordInput } from '@mantine/core';

function Login() {
    const form = useForm({
        initialValues: { AdminId: '', password: '' },
        validate: {
            AdminId: (value) => (!value || value.length === 0 ? 'Enter Admin Id' : null),
            password: (value) => (!value || value.length === 0 ? 'Enter your Password' : null),
        },
    });

    return (
        <Center
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper shadow="xl" withBorder p="md" radius="lg" w={330} mx="auto">

                <Text ta="center" > <h1 style={{margin:'0px'}}>Cami</h1></Text>
                <Text ta="center" color="grey" size="md">
                    Sign in to Admin Portal
                </Text>                          

                <form onSubmit={form.onSubmit(console.log)}>
                    <TextInput
                        mt="sm"
                        radius="md"
                        label="Admin ID"
                        placeholder="ID"
                        {...form.getInputProps('AdminId')}
                    />
                    <PasswordInput
                        radius="md"
                        mt="sm"
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <Button fullWidth radius="md" type="submit" mt="md" color="black">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Center>
    );
}

export default Login;
