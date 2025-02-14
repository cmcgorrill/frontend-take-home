import { Box, Button, Dialog, DropdownMenu, Flex, IconButton, Table, Text, TextField } from "@radix-ui/themes"
import { Role, RolesQueryData } from "../constants"
import ErrorState from "./ErrorState"
import LoadingState from "./LoadingState"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useState } from "react"

interface RoleTableProps {
  rolesQueryData: RolesQueryData
}
const RoleTable = ({ rolesQueryData }: RoleTableProps) => {
  const { data, isLoading, onUpdate } = rolesQueryData
  return <Box>
    {isLoading && <LoadingState message="Fetching users..." />}
    {!data && !isLoading && <ErrorState message="Unable to fetch users at this time." />}
    {!!data &&
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
          {data.map((role) => <RoleRow role={role} key={role.id} updateRole={onUpdate} />)}
        </Table.Body>
      </Table.Root>
    }
  </Box>
}

interface RoleRowProps {
  role: Role
  updateRole: (roleId: string, name: string) => void
}

const RoleRow = ({ role, updateRole }: RoleRowProps) => {
  const [name, setName] = useState<string>(role.name)
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString(undefined, { month: 'short', day: "numeric", year: 'numeric' })
  }

  return <Dialog.Root>
    <Table.Row>
      <Table.Cell>
        <Text>{name}</Text>
      </Table.Cell>
      <Table.Cell>{role.description}</Table.Cell>
      <Table.Cell>{formatDate(role.createdAt)}</Table.Cell>
      <Table.Cell>
        <Flex justify="end" align="center" minHeight='100%'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton radius="full" size='1' variant="ghost" color='gray' ><DotsHorizontalIcon /></IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Dialog.Trigger><DropdownMenu.Item>Edit role</DropdownMenu.Item></Dialog.Trigger>
              <DropdownMenu.Item>Delete role</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Table.Cell>
    </Table.Row>
    <Dialog.Content>
      <Dialog.Title>Edit role name</Dialog.Title>
      <Flex direction="column" gap="3">
        <TextField.Root value={name} onChange={(e) => { setName(e.target.value) }}><TextField.Slot /></TextField.Root>
        <Flex gap="3" justify="end">
          <Dialog.Close><Button color="gray" variant="surface">Cancel</Button></Dialog.Close>
          <Dialog.Close><Button color="red" variant="surface" onClick={() => {
            updateRole(role.id, name)
          }}>Save</Button></Dialog.Close>
        </Flex>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
}

export default RoleTable