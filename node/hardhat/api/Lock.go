// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package api

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// LockMetaData contains all meta data concerning the Lock contract.
var LockMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_unlockTime\",\"type\":\"uint256\"}],\"stateMutability\":\"payable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"when\",\"type\":\"uint256\"}],\"name\":\"Withdrawal\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"addresspayable\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"unlockTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
	Bin: "0x60806040526040516102a53803806102a58339810160408190526100229161009b565b8042106100815760405162461bcd60e51b815260206004820152602360248201527f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460448201526275726560e81b606482015260840160405180910390fd5b600055600180546001600160a01b031916331790556100b4565b6000602082840312156100ad57600080fd5b5051919050565b6101e2806100c36000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063251c1aa3146100465780633ccfd60b146100625780638da5cb5b1461006c575b600080fd5b61004f60005481565b6040519081526020015b60405180910390f35b61006a610097565b005b60015461007f906001600160a01b031681565b6040516001600160a01b039091168152602001610059565b6000544210156100e75760405162461bcd60e51b8152602060048201526016602482015275165bdd4818d85b89dd081dda5d1a191c985dc81e595d60521b60448201526064015b60405180910390fd5b6001546001600160a01b031633146101385760405162461bcd60e51b81526020600482015260146024820152732cb7ba9030b932b713ba103a34329037bbb732b960611b60448201526064016100de565b604080514781524260208201527fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93910160405180910390a16001546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156101a9573d6000803e3d6000fd5b5056fea2646970667358221220eff3f7816a7ddaac13b1a42b64c5775cc86acbc58f7029c04a5d7fdfb9bd419d64736f6c63430008130033",
}

// LockABI is the input ABI used to generate the binding from.
// Deprecated: Use LockMetaData.ABI instead.
var LockABI = LockMetaData.ABI

// LockBin is the compiled bytecode used for deploying new contracts.
// Deprecated: Use LockMetaData.Bin instead.
var LockBin = LockMetaData.Bin

// DeployLock deploys a new Ethereum contract, binding an instance of Lock to it.
func DeployLock(auth *bind.TransactOpts, backend bind.ContractBackend, _unlockTime *big.Int) (common.Address, *types.Transaction, *Lock, error) {
	parsed, err := LockMetaData.GetAbi()
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	if parsed == nil {
		return common.Address{}, nil, nil, errors.New("GetABI returned nil")
	}

	address, tx, contract, err := bind.DeployContract(auth, *parsed, common.FromHex(LockBin), backend, _unlockTime)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Lock{LockCaller: LockCaller{contract: contract}, LockTransactor: LockTransactor{contract: contract}, LockFilterer: LockFilterer{contract: contract}}, nil
}

// Lock is an auto generated Go binding around an Ethereum contract.
type Lock struct {
	LockCaller     // Read-only binding to the contract
	LockTransactor // Write-only binding to the contract
	LockFilterer   // Log filterer for contract events
}

// LockCaller is an auto generated read-only Go binding around an Ethereum contract.
type LockCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LockTransactor is an auto generated write-only Go binding around an Ethereum contract.
type LockTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LockFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type LockFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// LockSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type LockSession struct {
	Contract     *Lock             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LockCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type LockCallerSession struct {
	Contract *LockCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// LockTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type LockTransactorSession struct {
	Contract     *LockTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// LockRaw is an auto generated low-level Go binding around an Ethereum contract.
type LockRaw struct {
	Contract *Lock // Generic contract binding to access the raw methods on
}

// LockCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type LockCallerRaw struct {
	Contract *LockCaller // Generic read-only contract binding to access the raw methods on
}

// LockTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type LockTransactorRaw struct {
	Contract *LockTransactor // Generic write-only contract binding to access the raw methods on
}

// NewLock creates a new instance of Lock, bound to a specific deployed contract.
func NewLock(address common.Address, backend bind.ContractBackend) (*Lock, error) {
	contract, err := bindLock(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Lock{LockCaller: LockCaller{contract: contract}, LockTransactor: LockTransactor{contract: contract}, LockFilterer: LockFilterer{contract: contract}}, nil
}

// NewLockCaller creates a new read-only instance of Lock, bound to a specific deployed contract.
func NewLockCaller(address common.Address, caller bind.ContractCaller) (*LockCaller, error) {
	contract, err := bindLock(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &LockCaller{contract: contract}, nil
}

// NewLockTransactor creates a new write-only instance of Lock, bound to a specific deployed contract.
func NewLockTransactor(address common.Address, transactor bind.ContractTransactor) (*LockTransactor, error) {
	contract, err := bindLock(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &LockTransactor{contract: contract}, nil
}

// NewLockFilterer creates a new log filterer instance of Lock, bound to a specific deployed contract.
func NewLockFilterer(address common.Address, filterer bind.ContractFilterer) (*LockFilterer, error) {
	contract, err := bindLock(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &LockFilterer{contract: contract}, nil
}

// bindLock binds a generic wrapper to an already deployed contract.
func bindLock(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := LockMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Lock *LockRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Lock.Contract.LockCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Lock *LockRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Lock.Contract.LockTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Lock *LockRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Lock.Contract.LockTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Lock *LockCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Lock.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Lock *LockTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Lock.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Lock *LockTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Lock.Contract.contract.Transact(opts, method, params...)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Lock *LockCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Lock.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Lock *LockSession) Owner() (common.Address, error) {
	return _Lock.Contract.Owner(&_Lock.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Lock *LockCallerSession) Owner() (common.Address, error) {
	return _Lock.Contract.Owner(&_Lock.CallOpts)
}

// UnlockTime is a free data retrieval call binding the contract method 0x251c1aa3.
//
// Solidity: function unlockTime() view returns(uint256)
func (_Lock *LockCaller) UnlockTime(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Lock.contract.Call(opts, &out, "unlockTime")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// UnlockTime is a free data retrieval call binding the contract method 0x251c1aa3.
//
// Solidity: function unlockTime() view returns(uint256)
func (_Lock *LockSession) UnlockTime() (*big.Int, error) {
	return _Lock.Contract.UnlockTime(&_Lock.CallOpts)
}

// UnlockTime is a free data retrieval call binding the contract method 0x251c1aa3.
//
// Solidity: function unlockTime() view returns(uint256)
func (_Lock *LockCallerSession) UnlockTime() (*big.Int, error) {
	return _Lock.Contract.UnlockTime(&_Lock.CallOpts)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Lock *LockTransactor) Withdraw(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Lock.contract.Transact(opts, "withdraw")
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Lock *LockSession) Withdraw() (*types.Transaction, error) {
	return _Lock.Contract.Withdraw(&_Lock.TransactOpts)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Lock *LockTransactorSession) Withdraw() (*types.Transaction, error) {
	return _Lock.Contract.Withdraw(&_Lock.TransactOpts)
}

// LockWithdrawalIterator is returned from FilterWithdrawal and is used to iterate over the raw logs and unpacked data for Withdrawal events raised by the Lock contract.
type LockWithdrawalIterator struct {
	Event *LockWithdrawal // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *LockWithdrawalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(LockWithdrawal)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(LockWithdrawal)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *LockWithdrawalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *LockWithdrawalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// LockWithdrawal represents a Withdrawal event raised by the Lock contract.
type LockWithdrawal struct {
	Amount *big.Int
	When   *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterWithdrawal is a free log retrieval operation binding the contract event 0xbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93.
//
// Solidity: event Withdrawal(uint256 amount, uint256 when)
func (_Lock *LockFilterer) FilterWithdrawal(opts *bind.FilterOpts) (*LockWithdrawalIterator, error) {

	logs, sub, err := _Lock.contract.FilterLogs(opts, "Withdrawal")
	if err != nil {
		return nil, err
	}
	return &LockWithdrawalIterator{contract: _Lock.contract, event: "Withdrawal", logs: logs, sub: sub}, nil
}

// WatchWithdrawal is a free log subscription operation binding the contract event 0xbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93.
//
// Solidity: event Withdrawal(uint256 amount, uint256 when)
func (_Lock *LockFilterer) WatchWithdrawal(opts *bind.WatchOpts, sink chan<- *LockWithdrawal) (event.Subscription, error) {

	logs, sub, err := _Lock.contract.WatchLogs(opts, "Withdrawal")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(LockWithdrawal)
				if err := _Lock.contract.UnpackLog(event, "Withdrawal", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseWithdrawal is a log parse operation binding the contract event 0xbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b93.
//
// Solidity: event Withdrawal(uint256 amount, uint256 when)
func (_Lock *LockFilterer) ParseWithdrawal(log types.Log) (*LockWithdrawal, error) {
	event := new(LockWithdrawal)
	if err := _Lock.contract.UnpackLog(event, "Withdrawal", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
