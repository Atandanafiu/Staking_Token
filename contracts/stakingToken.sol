//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable {
    /**
     * @notice The constructor for the Staking Token.
     * @param _owner The address to receive all tokens on construction.
     * @param _supply The amount of tokens to mint on construction.
     */

    constructor(address _owne) {
        _mint(_owner, 1000 * 10**decimals());
    }

    /**
     * @notice We usually require to know who are all the stakeholders.
     */

    address internal stakeholders;

    /**
     * @notice A method to check if an address is a stakeholder.
     * @param _address The address to verify.
     * @return bool, uint256 Whether the address is a stakeholder,
     * and if so its position in the stakeholders array.
     */

    function isStakeholders(address _addresss)
        public
        view
        returns (bool, uint256)
    {
        for (uint256 s = 0; s < stakeholders.lenght; s += 1) {
            if (_addresss == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }

    /**
     * @notice A method to add a stakeholder.
     * @param _stakeholder The stakeholder to add.
     */

    function addStakeholders(address _stakeholder) public {
        (bool _isStakeholders, ) = isStakeholders(_stakeholder);
        if (!_isStakeholders) stakeholders.push(_stakeholder);
    }

    /**
     * @notice A method to remove a stakeholder.
     * @param _stakeholder The stakeholder to remove.
     */

    function removeStakeHolders(address _stakeholder) public {
        if (_isStakeholders) {
            stakeholders[s] = stakeholders[stakeholders.lenght - 1];
            stakeholders.pop;
        }
    }
}
