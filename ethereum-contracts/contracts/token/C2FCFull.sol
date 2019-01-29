pragma solidity ^0.5.2;

import "../token/ERC721Full.sol";
import "../token/ERC721Mintable.sol";
import "../token/IC2FCPayments.sol";
import "../ownership/Ownable.sol";

/**
 * @title C2FCFull
 */

contract C2FCFull is ERC721Full, ERC721Mintable, Ownable {

    //Cashflow struct
    struct Cashflow {
        string name;
        uint256 value; 
        uint256 commit;
        uint256 interestRate; 
        uint256 duration;
        uint256 balance;
    }

    //index => Cashflows store
    mapping (uint256 =>Cashflow) private _cashflowsIndex;

    constructor (string memory name, string memory symbol) public ERC721Full(name, symbol) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function createCashFlow(
        string memory name, 
        uint256 value, 
        uint256 commit, 
        uint256 interestRate, 
        uint256 duration
        ) 
        public returns (bool) 
    {
        _cashflowsIndex[totalSupply().add(1)] = Cashflow(name, value, commit, interestRate, duration, 0);

        return true;
    }

    function cashflowFor(uint256 tokenId) public view returns
    (
     address subscriber,
     uint256 balance, 
     string memory name, 
     uint256 value,
     uint256 commit, 
     uint256 interestRate,
     uint256 duration, 
     uint256 firstPayment,
     uint256 lastPayment
     ) 
    {

    }

    function  idsOfCashflowsFor(address _owner) public view returns 
    (
        uint256[] memory tokenIds
    )
    {
        
    }
}