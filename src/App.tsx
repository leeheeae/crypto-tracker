import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`;

const App = () => {
  return (
    <Container>
      <H1>히히히</H1>
    </Container>
  );
};

export default App;