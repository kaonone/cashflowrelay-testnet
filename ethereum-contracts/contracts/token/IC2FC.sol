pragma solidity ^0.5.2;


import "../math/SafeMath.sol";
import "../introspection/IERC165.sol";


contract IC2FC is IERC165 {
    event Cashflow(address indexed from, address indexed to, uint256 indexed tokenId);
   
    function cashflowFor(uint256 tokenId) public view returns
    (
     uint256 balance, 
     string memory name, 
     uint256 value,
     uint256 commit, 
     uint256 interestRate,
     uint256 duration, 
     uint256 lastPayment
     );

    function createCashFlow(
        string memory name, 
        uint256 value, 
        uint256 commit, 
        uint256 interestRate, 
        uint256 duration
        ) 
        public returns (bool);
        
}



