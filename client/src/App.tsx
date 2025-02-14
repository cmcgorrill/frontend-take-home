import { Box, Container, Tabs, Text } from '@radix-ui/themes';
import './App.css';
import UserTable from './components/UserTable';
import useRoles from './hooks/useRoles';
import RoleTable from './components/RoleTable';

function App() {
  const rolesQueryData = useRoles()

  return (
    <Box className="App" style={{ padding: '8px 40px' }}>
      <Container>
        <Tabs.Root defaultValue="users">
          <Tabs.List>
            <Tabs.Trigger value="users">Users</Tabs.Trigger>
            <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="users">
              <UserTable rolesData={rolesQueryData.data} />
            </Tabs.Content>

            <Tabs.Content value="roles">
              <Text size="2"><RoleTable rolesQueryData={rolesQueryData} /></Text>
            </Tabs.Content>

          </Box>
        </Tabs.Root>
      </Container>
    </Box>
  );
}

export default App;
