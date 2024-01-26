import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Title, Flex, Text, Group, Burger, NavLink } from '@mantine/core';
import { IconId, IconMessage, IconTrash, IconPrinter } from '@tabler/icons-react';
import '../assets/favCami.svg';
import StudentDetails from '../Components/StudentDetails';
import SendMessages from '../Components/SendMessages';
import DeleteDatabase from '../Components/DeleteDatabase';
import PrintData from '../Components/PrintData';

function Dashboard() {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [active, setActive] = React.useState('Student Details');

  const handleNavLinkClick = (value) => {
    setActive(value);
    close();
  };

  return (
    <div>
       <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <Flex
        mih={50}
        bg="black"
        gap="md"
        px={20}
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"

      >

        <Group>
          <Burger size="sm" color="white" onClick={toggle} aria-label="Toggle navigation" />
          <Title color="white" style={{ fontFamily: 'Uber move', color: "white", margin: "0px" }} order={3}>Cami</Title>
        </Group>

        <Button size="xs" variant="filled" color="red"> Log Out </Button>

      </Flex>
      </div>

      <Drawer.Root opened={opened} onClose={close} size="xs">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <img width={40} src="favCami.svg" alt="Menu" />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <NavLink
              href="#Student Details"
              label="Student Details"
              active={active === 'Student Details'}
              leftSection={<IconId size="1rem" stroke={1.5} />}
              onClick={() => handleNavLinkClick('Student Details')}
            />
            <NavLink
              href="#Send Messages"
              label="Send Messages"
              active={active === 'Send Messages'}
              leftSection={<IconMessage size="1rem" stroke={1.5} />}
              onClick={() => handleNavLinkClick('Send Messages')}
            />
            <NavLink
              href="#Print Data"
              label="Print Data"
              active={active === 'Print Data'}
              leftSection={<IconPrinter size="1rem" stroke={1.5} />}
              onClick={() => handleNavLinkClick('Print Data')}
            />
            <NavLink style={{color:"red"}}
              href="#Delete Database"
              label="Delete Database"
              active={active === 'Delete Database'}
              leftSection={<IconTrash color='red' size="1rem" stroke={1.5} />}
              onClick={() => handleNavLinkClick('Delete Database')}
              color='red'
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>



      {active === 'Student Details' && <StudentDetails />}
      {active === 'Send Messages' && <SendMessages />}
      {active === 'Print Data' && <PrintData/>}
      {active === 'Delete Database' && <DeleteDatabase />}

    </div>
  );
}

export default Dashboard;
