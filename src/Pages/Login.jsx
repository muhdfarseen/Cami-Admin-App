import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Center, Text, Button, Paper, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Login() {
    const form = useForm({
        initialValues: { AdminId: '', password: '' },
        validate: {
            AdminId: (value) => (!value || value.length === 0 ? 'Enter Admin Id' : null),
            password: (value) => (!value || value.length === 0 ? 'Enter your Password' : null),
        },
    });

    const navigate = useNavigate();
    const handleLogin = () => {
        // Perform your login logic here
        navigate('/CamiADmin');
    };

    return (
        <Center
            style={{
                minHeight: '100dvh',
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

                <form onSubmit={form.onSubmit(handleLogin)}>
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
                    <Button fullWidth radius="md" type="submit" mt="md" color="dark">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Center>
    );
}

export default Login;
