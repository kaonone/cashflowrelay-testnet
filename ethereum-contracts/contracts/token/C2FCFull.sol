pragma solidity ^0.5.2;

import "../token/ERC721Full.sol";
import "../token/ERC721Mintable.sol";
import "../token/IC2FC.sol";
import "../ownership/Ownable.sol";

/**
 * @title C2FCFull
 */

contract C2FCFull is ERC721Full, ERC721Mintable, Ownable, IC2FC {

    //Cashflow struct
    struct Cashflow {
        address subscriber;
        string name;
        uint256 value; 
        uint256 commit;
        uint256 interestRate; 
        uint256 duration;
        uint256 balance;
        uint256 created;
        uint256 lastPayment;
    }

    //index => Cashflows store
    mapping (uint256 =>Cashflow) private _cashflowsIds;

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
        uint256 _tokenId = totalSupply().add(1);

        require(mint(msg.sender, _tokenId), "Doesnt' mint");

        _cashflowsIds[_tokenId] = Cashflow(msg.sender, name, value, commit, interestRate, duration, 0, block.timestamp, 0);

        emit CashflowCreated(msg.sender, name, value, commit, interestRate, duration, _tokenId, block.timestamp);

        return true;
    }

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
     ) 
    {
        require(tokenId<=totalSupply(), "TokenId doesn't exit");

        Cashflow memory _c = _cashflowsIds[tokenId];

        return (
            _c.subscriber, 
            _c.name, 
            _c.value,
            _c.commit,
            _c.interestRate,
            _c.duration,
            _c.balance,
            _c.created,
            _c.lastPayment
        );
    }


    function balanceOfCashflowFor(uint256 tokenId) public view returns
    (
        uint256 balance
    ) 
    {
        require(tokenId<=totalSupply(), "TokenId doesn't exit");

        return _cashflowsIds[tokenId].balance;
    }

    function  idsOfCashflowsFor(address _owner) public view returns 
    (
        uint256[] memory tokenIds
    )
    {
        return _ownedTokens[_owner];
    }
}