import styled from 'styled-components';
import mixin from './cores/styles/mixin';

function App() {
  return (
    <div>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint culpa, perspiciatis cum sequi
        quae dolores distinctio hic eius iusto commodi neque odit voluptatem. Quibusdam in, voluptas
        aliquam adipisci incidunt quidem.
      </P>
      <PPAP />
    </div>
  );
}

const P = styled.p`
  width: 200px;
  color: ${({ theme }) => theme.colors.primary};
  ${mixin.textEllipsis(2)}
`;

const PPAP = styled.p`
  width: 200px;
  height: 300px;
  ${mixin.backgroundImage(
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567008394/noticon/ohybolu4ensol1gzqas1.png',
    { contain: true, repeat: true },
  )}
`;

export default App;
