pragma solidity ^0.5.2;


import "../math/SafeMath.sol";
import "../introspection/IERC165.sol";

/**
 * @title C2FC Interface for Commitments to Future Cashflows (C2FC)
 * @dev Base functions for get, create and balance for cashflows
 */

contract IC2FC is IERC165 {

    //Adress for Token as Currency of Cashflows. Default: DAI
    address tokenAddress = 0xC4375B7De8af5a38a93548eb8453a498222C4fF2;

    /**
     * @dev Event for Created Cashflows
     * @param subscriber address, who create and subscribe for payment to cashflow
     * @param name string name of Cashflow
     * @param value uint256 maximum value for Cashflow
     * @param commit uin256 unit for payment in period (default, month)
     * @param interestRate uin256 size of interest above value
     * @param duration uint256 period of Cashflow
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @param created timestamp date created 
     */
     
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
   
    
     /**
     * @dev Function for get Cashflow
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @return 
     * subscriber address, who create and subscribe for payment to cashflow
     * name string name of Cashflow
     * value uint256 maximum value for Cashflow
     * commit uin256 unit for payment in period (default, month)
     * interestRate uin256 size of interest above value
     * duration uint256 period of Cashflow
     * balance uint256 ID of the token (base token, for example, ERC721)
     * created timestamp date created 
     */

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

    /**
     * @dev Function for get balance of Cashflow
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @return uint256 value
     */
    function balanceOfCashflowFor(uint256 tokenId) public view returns
    (
        uint256 balance
        );

     /**
     * @dev Function get list of token for user address
     * @param _owner address of user
     * @return uint256[] array of IDs
     */

    function  idsOfCashflowsFor(address _owner) public view returns 
    (
        uint256[] memory tokenIds
        );


    /**
     * @dev Function get list of token for subscribe address (who payment)
     * @param _subscriber address of user
     * @return uint256[] array of IDs
     */

    function  idsOfSubscribedCashflowsFor(address _subscriber) public view returns 
    (
        uint256[] memory tokenIds
        );

    /**
     * @dev @dev Function for create Cashflow
     * @param name string name of Cashflow
     * @param value uint256 maximum value for Cashflow
     * @param commit uin256 unit for payment in period (default, month)
     * @param interestRate uin256 size of interest above value
     * @param duration uint256 period of Cashflow
     */

    function createCashFlow(
        string memory name, 
        uint256 value, 
        uint256 commit, 
        uint256 interestRate, 
        uint256 duration
        ) 
        public returns (bool);
}



