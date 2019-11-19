const hello = artifacts.require("./Message.sol");

module.exports = function(deployer) {
  deployer.deploy(hello, 'hi', 1);
};