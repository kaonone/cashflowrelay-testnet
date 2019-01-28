pragma solidity ^0.5.2;

import "../token/ERC721Full.sol";
import "../token/ERC721Mintable.sol";
import "../token/ERC721MetadataMintable.sol";
import "../token/ERC721Burnable.sol";
import "../token/IC2FCPayments.sol";
import "../ownership/Ownable.sol";

/**
 * @title C2FCFull
 */
contract C2FCFull is ERC721Full, ERC721Mintable, ERC721MetadataMintable,  IC2FCPayments, Ownable {

}