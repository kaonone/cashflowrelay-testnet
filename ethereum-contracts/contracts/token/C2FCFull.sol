pragma solidity ^0.5.2;

import "../token/ERC721Full.sol";
import "../token/ERC721Mintable.sol";
import "../token/IC2FCPayments.sol";
import "../ownership/Ownable.sol";
import "../token/ERC20/IERC20.sol";

/**
 * @title C2FCFull
 */

contract C2FCFull is ERC721Full, ERC721Mintable, Ownable, IC2FCPayments {

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

    struct Order {
        address subscriber;
        uint256 pendingDatePayment;
        uint256 datePayment;
        uint256 amount;
        bool status;
    }

    //index => Cashflows store
    mapping (uint256 =>Cashflow) private _cashflowsIds;

    //orderid => Orders store
    mapping (uint256 => mapping(uint256 => Order)) private _ordersIds;

    
    mapping(uint256 => uint256)  private _executedOrdersCount;

    //all orders
    uint256[] _allOrders;

    constructor (string memory name, string memory symbol) public ERC721Full(name, symbol) {
        // solhint-disable-previous-line no-empty-blocks
    }

    //check publisher
    modifier onlyPublisher(uint256 tokenId) {
        require(isPublisher(tokenId), "User is not owner");
        _;
    }

    //check subscriber
    modifier onlySubscriber(uint256 tokenId) {
        require(isSubscriber(tokenId), "User is not subscriber");
        _;
    }

    //check subscriber or owner
    modifier onlySubscriberOrOwner(uint256 tokenId) {
        require(isOwner() || isSubscriber(tokenId), "User is not subscriber or publisher");
        _;
    }

    //is Exist token
    modifier isExistToken(uint256 tokenId) {
        require(tokenId<=totalSupply(), "TokenId doesn't exit");
        _;
    }
    //is Exist Order
    modifier isExistOrder(uint256 orderId) {
        require(orderId<=_totalSupplyOrders(), "TokenId doesn't exit");
        _;
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
        _createCashFlow(name, value, commit, interestRate, duration);
        return true;
    }

    function cashflowFor(uint256 tokenId) public isExistToken(tokenId) view returns
    (
        address publisher,
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

    /*
      Payments Block
    */
    //Create Order
    function createOrder(        
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher)
    )   public onlySubscriberOrOwner(tokenId)
        returns (bool success) {  

        _createOrder(tokenId, tokenAmount);
        return true;
    }

    //Get Order By Id
    function getByOrderId(
        uint256 tokenId,
        uint256 orderId //OrderId
    ) public view isExistToken(tokenId) isExistOrder(orderId)

        returns (
            address subscriber,  
            uint256 pendingDatePayment, 
            uint256 datePayment, 
            uint256 amount, 
            bool status
        ) 
    {
        Order storage _o = _ordersIds[tokenId][orderId];

        return (
            _o.subscriber,
            _o.pendingDatePayment,
            _o.datePayment,
            _o.amount,
            _o.status
        );
    }

    //Withdraw Payments
    function withdrawPayments(
        uint256 tokenId, 
        uint256 amount
    ) public onlyPublisher(tokenId) returns (bool success)  {
        address _owner = ownerOf(tokenId);
        IERC20(tokenAddress).transfer(_owner, amount);
        emit WithDrawPayment(tokenId, amount, _owner, block.timestamp);

        return true;
    }


    //internal functions

    //create order
    function _createCashFlow(
        string memory name, 
        uint256 value, 
        uint256 commit, 
        uint256 interestRate, 
        uint256 duration
        ) 
        internal returns (bool) 
    {
        uint256 _tokenId = totalSupply().add(1);

        require(mint(msg.sender, _tokenId), "Doesnt' mint");

        _cashflowsIds[_tokenId] = Cashflow(msg.sender, name, value, commit, interestRate, duration, 0, block.timestamp, 0);

        emit CashflowCreated(msg.sender, name, value, commit, interestRate, duration, _tokenId, block.timestamp);

        return true;
    }

    //total orders
    function _totalSupplyOrders() internal view returns (uint256) {
        return _allOrders.length;
    }

    //create order
    function _createOrder (        
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher)
    )   internal
        returns (bool success) {
        uint256 _orderId = _totalSupplyOrders().add(1);
        Cashflow storage _c = _cashflowsIds[tokenId];

        uint256 _pendingPaymentDate = 0;

        if (_c.lastPayment>0) {
            uint256 _countExecutedOrders = _executedOrdersCount[tokenId];
            _pendingPaymentDate = _c.lastPayment+(_countExecutedOrders*2629743);
        } else {
            _pendingPaymentDate = _c.created+2629743; //+30 days
        }

        _ordersIds[tokenId][_orderId] = Order(_c.subscriber, _pendingPaymentDate, 0, tokenAmount, false);
        
        return true;
    }

    /**
     * @return true if `msg.sender` is subscriber of token.
     */
    function isSubscriber(uint256 tokenId) public view returns (bool) {
        Cashflow storage _c = _cashflowsIds[tokenId];
        return msg.sender == _c.subscriber;
    }

    /**
     * @return true if `msg.sender` is publisher of token.
     */

    function isPublisher(uint256 tokenId) public view returns(bool) {
        address _o = ownerOf(tokenId);
        return msg.sender == _o;
    }
}