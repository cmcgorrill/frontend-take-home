import { Box, Container, Tabs, Text } from '@radix-ui/themes';
import './App.css';

function App() {
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
              <Text size="2">Got users?</Text>
            </Tabs.Content>

            <Tabs.Content value="roles">
              <Text size="2">Role-ing up soon.</Text>
            </Tabs.Content>

          </Box>
        </Tabs.Root>
      </Container>
    </Box>
  );
}

export default App;
