pragma solidity ^0.5.2;

contract IC2FCPayments {
    event ExecuteSubscription(
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment //the period in seconds between payments
    );

    event CancelSubscription(
        address indexed from, //the subscriber
        address indexed to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount, //the token amount paid to the publisher
        uint256 datePayment
    );
    
    function isSubscriptionActive (uint tokenId) public view returns (bool);

    function cancelSubscription(
        address to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount
    ) external
        returns (bool success);


    function executeSubscription(
        address to, //the publisher
        address tokenAddress, //the token address paid to the publisher
        uint256 tokenAmount //the token amount paid to the publisher
    ) public
        returns (bool success);
         
        
    function withdrawCashflow(uint256 amount) public returns (bool);
}