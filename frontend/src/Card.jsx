import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid black;
  height: 30em;
  width: 16em;
  flex-flow: column nowrap;
  padding: 1em;
  margin: 1em;
`;

const SelectCardText = styled.h3`
  font-family: "Poppins", sans-serif;
  text-align: center;
  align-self: top;
`;

const SelectArcanaButton = styled.button`
  height: 3em;
  width: 100%;
`;

function MinorArcanaSelect() {
  return (
    <>
      <SelectArcanaButton>Minor Arcana</SelectArcanaButton>
    </>
  );
}

function MajorArcanaSelect() {
  return (
    <>
      <SelectArcanaButton>Major Arcana</SelectArcanaButton>
    </>
  );
}

function Card() {
  return (
    <CardContainer>
      <SelectCardText>Select a card:</SelectCardText>
      <MinorArcanaSelect />
      <MajorArcanaSelect />
    </CardContainer>
  );
}

export default Card;
