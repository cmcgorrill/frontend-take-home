import { Container, Flex, Spinner, Text } from "@radix-ui/themes"

interface LoadingStateProps { message: string }

const LoadingState = ({ message }: LoadingStateProps) => {
  return <Container>
    <Flex direction='column' gap='2' minWidth='100%' minHeight='80vh' align='center' justify='center'>
      <Spinner size='3' />
      <Text>{message}</Text>
    </Flex>
  </Container>
}

export default LoadingState