pragma solidity ^0.5.2;

import "../token/IC2FC.sol";

/**
 * @title C2FC Interface for Commitments to Future Cashflows (C2FC) Payments
 * @dev Base functions for create, execute, cancel orders for payment C2FC
 */

contract IC2FCPayments is IC2FC {

    // event for Execute Payment
    event ExecutePayment(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    // event for Execute Order
    event ExecuteOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    // event for Create Order
    event CreateOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );


   // event for Cancel Order
    event CancelOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

   // event for Withdraw Payments
    event WithDrawPayment(
        uint256 tokenId,
        uint256 amount,
        address indexed publisher,
        uint256 datePayment
    );

    
     /**
     * @dev Check if payments for Cashflow is active
     * @return true or false operation
     */
    
    function isPaymentsActive (uint tokenId) public view returns (bool);

    /**
     * @dev Create order by tokenId, orderId
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @param tokenAmount uint256 value for payment
     * @return true or false operation
     */

    function createOrder(        
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher)
    )   public
        returns (bool success);

    //cancel order
    
    /**
     * @dev Cancel order by tokenId, orderId
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     *  @param orderId uint256 ID of order for payment
     * @return true or false operation
     */

    function cancelOrder(
        uint256 tokenId,
        uint256 orderId
    ) public
        returns (bool success);

    
    /**
     * @dev Execute order by tokenId, orderId
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     *  @param orderId uint256 ID of order for payment
     * @return true or false operation
     */

    function executeOrder(
        uint256 tokenId, //tokenId
        uint256 orderId //orderId
    ) public
        returns (bool success);


     /**
     * @dev Function get order by id
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @param orderId uint256 ID of order for payment
     * @return 
     * subscriber address, who create and subscribe for payment to cashflow
     * pendingDatePayment pending date for Payment
     * datePayment date of payed order
     * amount amount for payment of order
     * isPayed bool value for payed (or not orders)
     * isDeleted bool value for deleted (or not) orders

     */

    function getByOrderId(
        uint256 tokenId, //TokenId
        uint256 orderId //OrderId
    ) public view
        returns (
            address subscriber,
            uint256 pendingDatePayment, 
            uint256 datePayment, 
            uint256 amount, 
            bool isPayed,
            bool isDeleted
        );


    /**
     * @dev Function get list of orders for token
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @return uint256[] array of IDs
     */

    function getOrdersList(
        uint256 tokenId //tokenId
    ) public view
        returns (
            uint256[] memory tokenIds
        );

    
    /**
     * @dev Execute payment order
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @param tokenAmount uint256 value for payment
     * @return true or false operation
     */

    function executePayment(
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher
    ) public
        returns (bool success);
         
    /**
     * @dev Withdraw payments from Cashflow
     * @param tokenId uint256 ID of the token (base token, for example, ERC721)
     * @param amount uint256 value for withdraw
     * @return true or false operation
     */

    function withdrawPayments(
        uint256 tokenId, 
        uint256 amount
    ) 
    public 
        returns (bool success);
}