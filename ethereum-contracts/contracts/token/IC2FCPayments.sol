pragma solidity ^0.5.2;

import "../token/IC2FC.sol";

contract IC2FCPayments is IC2FC {
    event ExecutePayment(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event ExecuteOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event CreateOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event CancelOrder(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event CancelPayment(
        uint256 tokenId,
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event WithDrawPayment(
        uint256 tokenId,
        uint256 amount,
        address indexed publisher,
        uint256 datePayment
    );

    function isPaymentsActive (uint tokenId) public view returns (bool);


    //cancel order
    function cancelOrderById(
        uint256 orderId
    ) external
        returns (bool success);

    function createOrder(        
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher)
    )   public
        returns (bool success);

    //cancel order

    function cancelOrder(
        uint256 tokenId,
        uint256 orderId
    ) public
        returns (bool success);

    
    function executeOrder(
        uint256 orderId //orderId
    ) public
        returns (bool success);

    function getByOrderId(
        uint256 orderId //OrderId
    ) public
        returns (
            address subscriber,
            uint256 pendingDatePayment, 
            uint256 datePayment, 
            uint256 amount, 
            bool isPayed,
            bool isDeleted
        );

    function getOrdersList(
        uint256 tokenId //tokenId
    ) public
        returns (
            uint256[] memory tokenIds
        );

    
    function executePayment(
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher
    ) public
        returns (bool success);
         
    
    function withdrawPayments(
        uint256 tokenId, 
        uint256 amount
    ) 
    public 
        returns (bool success);
}