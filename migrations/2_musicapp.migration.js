const MusicAppMigrations = artifacts.require("MusicApp");

module.exports = function (deployer) {
  deployer.deploy(MusicAppMigrations);
};
