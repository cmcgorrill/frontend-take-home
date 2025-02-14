import { Avatar, Box, DropdownMenu, Flex, IconButton, Table, Text } from "@radix-ui/themes"
import { Role } from "../constants"
import ErrorState from "./ErrorState"
import LoadingState from "./LoadingState"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

interface RoleTableProps {
  roles: Role[] | undefined
  rolesLoading: boolean
}
const RoleTable = ({ roles, rolesLoading }: RoleTableProps) => {
  return <Box>
    {rolesLoading && <LoadingState message="Fetching users..." />}
    {!roles && <ErrorState message="Unable to fetch users at this time." />}
    {!!roles &&
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {roles.map((role) => <RoleRow role={role} key={role.id} />)}
        </Table.Body>
      </Table.Root>
    }
  </Box>
}

const RoleRow = ({ role }: { role: Role }) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString(undefined, { month: 'short', day: "numeric", year: 'numeric' })
  }

  return <Table.Row>
    <Table.Cell><Text>{role.name}</Text></Table.Cell>
    <Table.Cell>{role.description}</Table.Cell>
    <Table.Cell>{formatDate(role.createdAt)}</Table.Cell>
    <Table.Cell>
      <Flex justify="end" align="center" minHeight='100%'>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton radius="full" size='1' variant="ghost" color='gray' ><DotsHorizontalIcon /></IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Edit role</DropdownMenu.Item>
            <DropdownMenu.Item>Delete role</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Table.Cell>
  </Table.Row>
}

export default RoleTable