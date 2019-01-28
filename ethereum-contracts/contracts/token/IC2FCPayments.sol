pragma solidity ^0.5.2;

import "../token/IC2FC.sol";

contract IC2FCPayments is IC2FC {
    event ExecutePayment(
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
        uint256 datePayment
    );
    
    function isPaymentsActive (uint tokenId) public view returns (bool);

    function cancelPayment(
        uint256 tokenId,
        address to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount
    ) external
        returns (bool success);


    function executePayment(
        uint256 tokenId,
        address to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount //the token amount paid to the publisher
    ) public
        returns (bool success);
         
        
    function withdrawPayments(uint256 tokenId, uint256 amount) public returns (bool);
}