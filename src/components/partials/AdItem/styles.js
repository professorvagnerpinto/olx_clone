import styled from 'styled-components';

export const Item = styled.div`
  a{
    display: block;
    border: 1px solid #fff;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    transition: all ease .5s;
    &:hover{
      background-color: #EEE;
      border: 1px solid #CCC;
    }
  }
  .itemImage{
    width: 100%;
    border-radius: 5px;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .itemName{
    font-weight: bold;
  }
  .itemPrice{

  }
`;