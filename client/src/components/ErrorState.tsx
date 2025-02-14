import { CrossCircledIcon } from "@radix-ui/react-icons"
import { Container, Flex, Text } from "@radix-ui/themes"

interface ErrorStateProps { message: string }

const ErrorState = ({ message }: ErrorStateProps) => {
  return <Container>
    <Flex direction='column' gap='2' minWidth='100%' minHeight='80vh' align='center' justify='center'>
      <CrossCircledIcon height='120' width='120' />
      <Text>{message}</Text>
    </Flex>
  </Container>
}

export default ErrorState