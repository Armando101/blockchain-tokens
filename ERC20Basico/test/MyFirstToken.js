const { expect } = require("chai");
const { ethers } = require("hardhat");

const initialSupply = 1000000;
const tokenName = "MyFirstToken";
const tokenSymbol = "MFT";

describe("MyFirst token tests", function () {
  before(async function () {
    const availableSigners = await ethers.getSigners();
    this.deployer = availableSigners[0];

    const MyFirstToken = await ethers.getContractFactory("MyFirstToken");
    this.myFirstToken = await MyFirstToken.deploy(
      tokenName,
      tokenSymbol,
      initialSupply
    );
    await this.myFirstToken.deployed();
  });

  it("Should be named MyFirstToken", async function () {
    const fetchedTokenName = await this.myFirstToken.name();
    expect(fetchedTokenName).to.be.equal(tokenName);
  });

  it('Should have symbol "MFT"', async function () {
    const fetchedTokenSymbol = await this.myFirstToken.symbol();
    expect(fetchedTokenSymbol).to.be.equal(tokenSymbol);
  });

  it("Should have totalSupply passed in during deploying", async function () {
    const [fetchedTotalSupply, decimals] = await Promise.all([
      this.myFirstToken.totalSupply(),
      this.myFirstToken.decimals(),
    ]);
    const expectedTotalSupply = ethers.BigNumber.from(initialSupply).mul(
      ethers.BigNumber.from(10).pow(decimals)
    );
    expect(fetchedTotalSupply.eq(expectedTotalSupply)).to.be.true;
  });
});
