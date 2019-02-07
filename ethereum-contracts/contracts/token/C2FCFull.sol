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
        bool isPayed;
        bool isDeleted;
    }

    //index => Cashflows store
    mapping (uint256 =>Cashflow) private _cashflowsIds;

    //orderid => Orders store
    mapping (uint256 => mapping(uint256 => Order)) private _ordersIds;

    //Token => orders array
    mapping (uint256 => uint256[]) private _tokenOrdersIds;

    //Count of Executed Orders
    mapping(uint256 => uint256)  private _executedOrdersCount;


    // Mapping from owner to list of owned token IDs
    mapping(address => uint256[]) public _subscribedTokens;

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
    modifier onlyExistToken(uint256 tokenId) {
        require(tokenId<=totalSupply(), "TokenId doesn't exit");
        _;
    }
    //is Exist Order
    modifier onlyExistOrder(uint256 orderId) {
        require(orderId<=_totalSupplyOrders(), "TokenId doesn't exit");
        _;
    }

    //Order is Payed
    modifier onlyOrderPayed(uint256 tokenId, uint256 orderId) {
        Order storage _o = _ordersIds[tokenId][orderId];
        require(_o.isPayed == true, "Order is not payed");
        _;
    }

    //Order is not Payed
    modifier onlyOrderNotPayed(uint256 tokenId, uint256 orderId) {
        Order storage _o = _ordersIds[tokenId][orderId];
        require(_o.isPayed == false, "Order is payed");
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

    function cashflowFor(uint256 tokenId) public onlyExistToken(tokenId) view returns
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


    function  idsOfSubscribedCashflowsFor(address _subscriber) public view returns 
    (
        uint256[] memory tokenIds
    )
    {
        return _subscribedTokens[_subscriber];
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
        
        uint256 _pendingPaymentDate = 0;
        Cashflow storage _c = _cashflowsIds[tokenId];

        if (_c.lastPayment>0) {
            uint256 _countExecutedOrders = _executedOrdersCount[tokenId];
            _pendingPaymentDate = _c.created+(_countExecutedOrders*2629743);
        } else {
            _pendingPaymentDate = _c.created+2629743; //+30 days
        }

        _createOrder(tokenId, tokenAmount, _pendingPaymentDate, true);

        return true;
    }

    //Cancel Order
    function cancelOrder(
        uint256 tokenId,
        uint256 orderId
    )
        public onlySubscriberOrOwner(tokenId) onlyOrderNotPayed(tokenId, orderId)
        returns (bool success) {
        address _owner = ownerOf(tokenId);
        Order storage _o = _ordersIds[tokenId][orderId];
        _o.isDeleted = true;
        emit CancelOrder(tokenId, _o.subscriber, _owner, tokenAddress, _o.amount, _o.datePayment);
        return true;
    }

    //Get Order By Id
    function getByOrderId(
        uint256 tokenId,
        uint256 orderId //OrderId
    ) public view onlyExistToken(tokenId) onlyExistOrder(orderId)

        returns (
            address subscriber,
            uint256 pendingDatePayment, 
            uint256 datePayment, 
            uint256 amount, 
            bool isPayed,
            bool isDeleted
        ) 
    {
        Order storage _o = _ordersIds[tokenId][orderId];

        return (
            _o.subscriber,
            _o.pendingDatePayment,
            _o.datePayment,
            _o.amount,
            _o.isPayed,
            _o.isDeleted
        );
    }

    //Execute Order
    function executeOrder(
        uint256 tokenId, //tokenId
        uint256 orderId //orderId
    ) public onlySubscriberOrOwner(tokenId)
        returns (bool success)
    {
        bool isPayed = _executeOrder(tokenId, orderId);
        if (isPayed == true) {
            _executedOrdersCount[tokenId].add(1);
        }
        return isPayed;
    }

    //get orders list
    function getOrdersList(
        uint256 tokenId //tokenId
    ) public view returns (
            uint256[] memory tokenIds
        ) 
    {
        return  _tokenOrdersIds[tokenId];
    }

    //function Execute Payment
    function executePayment(
        uint256 tokenId,
        uint256 tokenAmount //the token amount paid to the publisher
    ) public onlySubscriberOrOwner(tokenId)
        returns (bool success) {
        uint256 _pendingPaymentDate = block.timestamp;
        uint256 _orderId = _createOrder(tokenId, tokenAmount, _pendingPaymentDate, false);
        _executeOrder(tokenId, _orderId);
        return true;
    }

    //function IsPaymentActive
    function isPaymentsActive (uint tokenId) public view returns (bool) {
        
        uint256 _pendingPaymentDate = 0;
        Cashflow storage _c = _cashflowsIds[tokenId];
        uint256 _countExecutedOrders = _executedOrdersCount[tokenId];
        _pendingPaymentDate = _c.created+(_countExecutedOrders*2629743);
        
        return (_pendingPaymentDate <= (_c.created+_c.duration));
    }

    //Withdraw Payments
    function withdrawPayments(
        uint256 tokenId, 
        uint256 amount
    ) public onlyPublisher(tokenId) returns (bool success)  {

        Cashflow storage _c = _cashflowsIds[tokenId];
        require(_cashflowsIds[tokenId].balance>=amount, "Balance is less than amount");

        address _owner = ownerOf(tokenId);
        IERC20(tokenAddress).transfer(_owner, amount);
        _c.balance = _c.balance.sub(amount);
        emit WithDrawPayment(tokenId, amount, _owner, block.timestamp);

        return true;
    }



    /**
      * internal functions
    */

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

        _subscribedTokens[msg.sender].push(_tokenId);

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
        uint256 tokenAmount, //the token amount paid to the publisher)
        uint256 pendingPaymentDate,
        bool isRegular
    )   internal
        returns (uint256 orderId) {
        uint256 _orderId = _totalSupplyOrders().add(1);
        address _owner = ownerOf(tokenId);
        Cashflow storage _c = _cashflowsIds[tokenId];

        if (isRegular == true) {
            if (pendingPaymentDate <= (_c.created+_c.duration)) { 
                _ordersIds[tokenId][_orderId] = Order(_c.subscriber, pendingPaymentDate, 0, tokenAmount, false, false);
                _allOrders.push(_orderId);
                _tokenOrdersIds[tokenId].push(_orderId);

                emit CreateOrder(tokenId, _c.subscriber, _owner, tokenAddress, tokenAmount, pendingPaymentDate);
                return _orderId;
            } else {
                return 0;
            }
        } else {
            _ordersIds[tokenId][_orderId] = Order(_c.subscriber, pendingPaymentDate, 0, tokenAmount, false, false);
            _allOrders.push(_orderId);
            _tokenOrdersIds[tokenId].push(_orderId);
            emit CreateOrder(tokenId, _c.subscriber, _owner, tokenAddress, tokenAmount, pendingPaymentDate);
            return _orderId;
        }  
    }

    
    function _executeOrder(
        uint256 tokenId, //tokenId
        uint256 orderId //orderId
    ) internal 
        returns (bool success)
    {
        Order storage _o = _ordersIds[tokenId][orderId];
        Cashflow storage _c = _cashflowsIds[tokenId];
        address _owner = ownerOf(tokenId);
        uint256 _a = IERC20(tokenAddress).allowance(_o.subscriber, address(this));

        if (_o.amount <= _a) {
            IERC20(tokenAddress).transferFrom(_o.subscriber, address(this), _o.amount); 
            _c.balance = _c.balance.add(_o.amount);
            _o.isPayed = true;
            emit ExecuteOrder(tokenId, _o.subscriber, _owner, tokenAddress, _o.amount, block.timestamp);
            return true;
        } else {
            return false;
        }
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