pragma solidity ^0.5.2;


import "../math/SafeMath.sol";
import "../introspection/IERC165.sol";


contract IC2FC is IERC165 {
    event Cashflow(address indexed from, address indexed to, uint256 indexed tokenId);
   
    function cashflowFor(uint256 tokenId) public view returns
    (
     uint256 balance, 
     string memory name, 
     uint256 interestRate,
     uint256 commit, 
     uint256 duration, 
     uint256 lastPayment
    );

}



