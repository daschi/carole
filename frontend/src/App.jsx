import styled from "styled-components";
import Card from "./Card";
import "./App.css";

const AppContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

function App() {
  return (
    <AppContainer>
      <Card />
      <Card />
      <Card />
    </AppContainer>
  );
}

export default App;
