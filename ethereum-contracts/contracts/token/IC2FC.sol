pragma solidity ^0.5.2;


import "../math/SafeMath.sol";
import "../introspection/IERC165.sol";


contract IC2FC is IERC165 {

    event CashflowCreated(
        address subscriber, 
        string name, 
        uint256 value, 
        uint256 commit, 
        uint256 interestRate, 
        uint256 duration, 
        uint256 indexed tokenId,
        uint256 created
    );
   
    
    function cashflowFor(uint256 tokenId) public view returns
    (
        address subscriber,
        string memory name,
        uint256 value, 
        uint256 commit,
        uint256 interestRate, 
        uint256 duration,
        uint256 balance,
        uint256 created,
        uint256 lastPayment
     );


    function balanceOfCashflowFor(uint256 tokenId) public view returns
    (
        uint256 balance
    );

    function  idsOfCashflowsFor(address _owner) public view returns 
    (
        uint256[] memory tokenIds
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



