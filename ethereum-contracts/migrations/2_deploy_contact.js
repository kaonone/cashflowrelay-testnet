var ERC721Full = artifacts.require("./ERC721Full.sol");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(ERC721Full, "C2FC Token", "C2FC");
};
