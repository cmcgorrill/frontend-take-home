import { useEffect, useState } from "react"
import useUsers from "../hooks/useUsers"
import { Avatar, Box, Button, DropdownMenu, Flex, IconButton, Section, Skeleton, Table, Text, TextField } from "@radix-ui/themes"
import { Role, User } from "../constants"
import { DotsHorizontalIcon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons"
import LoadingState from "./LoadingState"
import ErrorState from "./ErrorState"

interface UserTableProps {
  rolesData: Role[] | undefined
}

const UserTable = ({ rolesData }: UserTableProps) => {
  const [search, setSearch] = useState<string>('')
  const { userData, usersIsLoading, userError } = useUsers(search)
  useEffect(() => {
    console.log(userData)
  }, [userData])

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
    {!!userError && <ErrorState message="Unable to fetch users at this time." />}
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
          {userData.data.map((user) => <UserRow user={user} roles={rolesData} key={user.id} />)}
        </Table.Body>
      </Table.Root>
    }

  </Box>
}

const UserRow = ({ user, roles }: { user: User, roles: Role[] | undefined }) => {

  const getRoleName = (roleId: string) => {
    let roleName = "Unknown Role"
    const role = roles?.find(role => role.id === roleId)
    roleName = role?.name ?? roleName
    return <Skeleton loading={!roles}>{roleName}</Skeleton>
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString(undefined, { month: 'short', day: "numeric", year: 'numeric' })
  }

  return <Table.Row>
    <Table.Cell>
      <Flex align='center' gap='2'>
        <Avatar src={user.photo} fallback={user.first[0] + user.last[0]} radius="full" size="1" />
        <Text>{`${user.first} ${user.last}`}</Text>
      </Flex>
    </Table.Cell>
    <Table.Cell>{getRoleName(user.roleId)}</Table.Cell>
    <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
    <Table.Cell>
      <Flex justify="end" align="center" minHeight='100%'>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton radius="full" size='1' variant="ghost" color='gray' ><DotsHorizontalIcon /></IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Edit user</DropdownMenu.Item>
            <DropdownMenu.Item>Delete user</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Table.Cell>
  </Table.Row>
}





export default UserTable