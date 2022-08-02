import styled from 'styled-components';

function App() {
  const a = [1, 23, 4, 5];
  return (
    <div>
      {a.map((elem) => (
        <li key={elem}>{elem}</li>
      ))}

      <P>테스트</P>
      <P>테스트</P>
      <P>테스트</P>
      <P>테스트</P>
    </div>
  );
}

const P = styled.p`
  color: ${({ theme }) => theme.colors.primary};
`;

export default App;
