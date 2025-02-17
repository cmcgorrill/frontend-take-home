import { useState } from "react"
import useUsers from "../hooks/useUsers"
import { Avatar, Box, Button, Dialog, DropdownMenu, Flex, IconButton, Section, Skeleton, Strong, Table, Text, TextField } from "@radix-ui/themes"
import { formatDate, Role, User } from "../constants"
import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import LoadingState from "./LoadingState"
import ErrorState from "./ErrorState"

interface UserTableProps {
  rolesData: Role[] | undefined
}

const UserTable = ({ rolesData }: UserTableProps) => {
  const [search, setSearch] = useState<string>('')
  const { userData, usersIsLoading, deleteUser, onNext, onPrev } = useUsers(search)


  return <Box>
    <Section size='1' style={{ marginTop: '-12px' }}>
      <Flex gap='2' width="100%">
        <TextField.Root placeholder="Search by name…" style={{ width: "100%" }} onChange={(e) => setSearch(e.target.value)}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button><PlusIcon />Add User</Button>
      </Flex>
    </Section>
    {usersIsLoading && <LoadingState message="Fetching users..." />}
    {!userData && <ErrorState message="Unable to fetch users at this time." />}
    {!!userData?.data &&
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userData.data.map((user) => <UserRow user={user} roles={rolesData} deleteUser={deleteUser} key={user.id} />)}
          <Table.Row>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell />
            <Table.Cell>
              <Flex gap="2" width="100%" justify="end">
                <Button color="gray" variant="outline" size="1" highContrast disabled={!userData.prev} onClick={onPrev}>
                  <Text weight='bold'>Previous</Text>
                </Button>
                <Button color="gray" variant="outline" size="1" highContrast disabled={!userData.next} onClick={onNext}>
                  <Text weight='bold'>Next</Text>
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    }
  </Box>
}

const UserRow = ({ user, roles, deleteUser }: { user: User, roles: Role[] | undefined, deleteUser: (userId: string) => void }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  let roleName = "Unknown Role"
  const role = roles?.find(role => role.id === user.roleId)
  roleName = role?.name ?? roleName

  return <Dialog.Root>
    <Table.Row>
      <Table.Cell>
        <Flex align='center' gap='2'>
          <Avatar src={user.photo} fallback={user.first[0] + user.last[0]} radius="full" size="1" />
          <Text><Skeleton loading={isDeleting}>{`${user.first} ${user.last}`}</Skeleton></Text>
        </Flex>
      </Table.Cell>
      <Table.Cell><Skeleton loading={isDeleting || !roles}>{roleName}</Skeleton></Table.Cell>
      <Table.Cell><Skeleton loading={isDeleting}>{formatDate(user.createdAt)}</Skeleton></Table.Cell>
      <Table.Cell>
        <Flex justify="end" align="center" minHeight='100%'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton radius="full" size='1' variant="ghost" color='gray' ><DotsHorizontalIcon /></IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Edit user</DropdownMenu.Item>
              <Dialog.Trigger>
                <DropdownMenu.Item>Delete user</DropdownMenu.Item>
              </Dialog.Trigger>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Table.Cell>
    </Table.Row>
    <Dialog.Content size="2">
      <Dialog.Title>Delete user</Dialog.Title>
      <Flex direction="column" gap="3" width="100%">
        <Text>Are you sure? The user <Strong>{`${user.first} ${user.last}`}</Strong> will be permanently deleted.</Text>
        <Flex gap="3" justify="end">
          <Dialog.Close><Button color="gray" variant="surface">Cancel</Button></Dialog.Close>
          <Dialog.Close><Button color="red" variant="surface" onClick={() => {
            setIsDeleting(true)
            deleteUser(user.id)
          }}>Delete</Button></Dialog.Close>
        </Flex>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
}

export default UserTable