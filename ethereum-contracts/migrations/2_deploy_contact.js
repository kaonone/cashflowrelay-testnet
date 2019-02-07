var C2FCFull = artifacts.require("./C2FCFull.sol");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(C2FCFull, "C2FC Token", "C2FC");
};
