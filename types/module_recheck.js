"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReturnValueVerifyExtra1 = exports.dryRunVerifyExtra1 = exports.sendVerifyExtra1 = exports.createVerifyExtra1ParameterWebWallet = exports.createVerifyExtra1Parameter = exports.parseReturnValueVerifyExtra0 = exports.dryRunVerifyExtra0 = exports.sendVerifyExtra0 = exports.createVerifyExtra0ParameterWebWallet = exports.createVerifyExtra0Parameter = exports.parseReturnValueVerifyTrail = exports.dryRunVerifyTrail = exports.sendVerifyTrail = exports.createVerifyTrailParameterWebWallet = exports.createVerifyTrailParameter = exports.parseReturnValueSubRecord = exports.dryRunSubRecord = exports.sendSubRecord = exports.createSubRecordParameterWebWallet = exports.createSubRecordParameter = exports.parseReturnValueRecords = exports.dryRunRecords = exports.sendRecords = exports.createRecordsParameterWebWallet = exports.createRecordsParameter = exports.parseErrorMessageCreateRecord = exports.dryRunCreateRecord = exports.sendCreateRecord = exports.createCreateRecordParameterWebWallet = exports.createCreateRecordParameter = exports.parseErrorMessageCreateSubRecord = exports.dryRunCreateSubRecord = exports.sendCreateSubRecord = exports.createCreateSubRecordParameterWebWallet = exports.createCreateSubRecordParameter = exports.parseErrorMessageCreateSubRecordWithExtras2 = exports.dryRunCreateSubRecordWithExtras2 = exports.sendCreateSubRecordWithExtras2 = exports.createCreateSubRecordWithExtras2ParameterWebWallet = exports.createCreateSubRecordWithExtras2Parameter = exports.checkOnChain = exports.createUnchecked = exports.create = exports.contractName = exports.moduleReference = void 0;
var SDK = require("@concordium/web-sdk");
/** The reference of the smart contract module supported by the provided client. */
exports.moduleReference = SDK.ModuleReference.fromHexString('3e3c617c89c1ea454df444f6c5fcece12c2f100646b9957e304b72f93caf24d5');
/** Name of the smart contract supported by this client. */
exports.contractName = SDK.ContractName.fromStringUnchecked('recheck');
/** Smart contract client for a contract instance on chain. */
var RecheckContract = /** @class */ (function () {
    function RecheckContract(grpcClient, contractAddress, genericContract) {
        /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
        this.__nominal = true;
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
    return RecheckContract;
}());
/**
 * Construct an instance of `RecheckContract` for interacting with a 'recheck' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {RecheckContract}
 */
function create(grpcClient, contractAddress, blockHash) {
    return __awaiter(this, void 0, void 0, function () {
        var genericContract;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
                    return [4 /*yield*/, genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new RecheckContract(grpcClient, contractAddress, genericContract)];
            }
        });
    });
}
exports.create = create;
/**
 * Construct the `RecheckContract` for interacting with a 'recheck' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {RecheckContract}
 */
function createUnchecked(grpcClient, contractAddress) {
    var genericContract = new SDK.Contract(grpcClient, contractAddress, exports.contractName);
    return new RecheckContract(grpcClient, contractAddress, genericContract);
}
exports.createUnchecked = createUnchecked;
/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
function checkOnChain(contractClient, blockHash) {
    return contractClient.genericContract.checkOnChain({ moduleReference: exports.moduleReference, blockHash: blockHash });
}
exports.checkOnChain = checkOnChain;
/** Base64 encoding of the parameter schema type for update transactions to 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract. */
var base64CreateSubRecordWithExtras2ParameterSchema = 'FAAGAAAACQAAAHJlY29yZF9pZBYCEAAAAHBhcmVudF9yZWNvcmRfaWQWAgUAAAB0cmFpbBYCDwAAAHRyYWlsX3NpZ25hdHVyZRYCBgAAAGV4dHJhMBYCBgAAAGV4dHJhMRYC';
/**
 * Construct schema JSON representation used in update transaction for 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordWithExtras2Parameter} parameter The structured parameter to construct from.
 * @returns {CreateSubRecordWithExtras2ParameterSchemaJson} The smart contract parameter JSON.
 */
function createCreateSubRecordWithExtras2ParameterSchemaJson(parameter) {
    var field1 = parameter.record_id;
    var field2 = parameter.parent_record_id;
    var field3 = parameter.trail;
    var field4 = parameter.trail_signature;
    var field5 = parameter.extra0;
    var field6 = parameter.extra1;
    var named0 = {
        record_id: field1,
        parent_record_id: field2,
        trail: field3,
        trail_signature: field4,
        extra0: field5,
        extra1: field6,
    };
    return named0;
}
/**
 * Construct Parameter type used in update transaction for 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordWithExtras2Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createCreateSubRecordWithExtras2Parameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64CreateSubRecordWithExtras2ParameterSchema, createCreateSubRecordWithExtras2ParameterSchemaJson(parameter));
}
exports.createCreateSubRecordWithExtras2Parameter = createCreateSubRecordWithExtras2Parameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordWithExtras2Parameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createCreateSubRecordWithExtras2ParameterWebWallet(parameter) {
    return {
        parameters: createCreateSubRecordWithExtras2ParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64CreateSubRecordWithExtras2ParameterSchema, 'base64')
        },
    };
}
exports.createCreateSubRecordWithExtras2ParameterWebWallet = createCreateSubRecordWithExtras2ParameterWebWallet;
/**
 * Send an update-contract transaction to the 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CreateSubRecordWithExtras2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendCreateSubRecordWithExtras2(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('createSubRecordWithExtras2'), SDK.Parameter.toBuffer, transactionMetadata, createCreateSubRecordWithExtras2Parameter(parameter), signer);
}
exports.sendCreateSubRecordWithExtras2 = sendCreateSubRecordWithExtras2;
/**
 * Dry-run an update-contract transaction to the 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CreateSubRecordWithExtras2Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunCreateSubRecordWithExtras2(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('createSubRecordWithExtras2'), invokeMetadata, SDK.Parameter.toBuffer, createCreateSubRecordWithExtras2Parameter(parameter), blockHash);
}
exports.dryRunCreateSubRecordWithExtras2 = dryRunCreateSubRecordWithExtras2;
/**
 * Get and parse the error message from dry-running update transaction for 'createSubRecordWithExtras2' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCreateSubRecordWithExtras2 | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageCreateSubRecordWithExtras2(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAKAAAAUGFyc2VFcnJvcgIMAAAAVW5hdXRob3JpemVkAg0AAABDb250cmFjdEVycm9yAgYAAABDdXN0b20BAQAAABYC');
    var match7;
    if ('ParseError' in schemaJson) {
        match7 = {
            type: 'ParseError',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match7 = {
            type: 'Unauthorized',
        };
    }
    else if ('ContractError' in schemaJson) {
        match7 = {
            type: 'ContractError',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant11 = schemaJson.Custom;
        match7 = {
            type: 'Custom',
            content: variant11[0],
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match7;
}
exports.parseErrorMessageCreateSubRecordWithExtras2 = parseErrorMessageCreateSubRecordWithExtras2;
/** Base64 encoding of the parameter schema type for update transactions to 'createSubRecord' entrypoint of the 'recheck' contract. */
var base64CreateSubRecordParameterSchema = 'FAAEAAAACQAAAHJlY29yZF9pZBYCEAAAAHBhcmVudF9yZWNvcmRfaWQWAgUAAAB0cmFpbBYCDwAAAHRyYWlsX3NpZ25hdHVyZRYC';
/**
 * Construct schema JSON representation used in update transaction for 'createSubRecord' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordParameter} parameter The structured parameter to construct from.
 * @returns {CreateSubRecordParameterSchemaJson} The smart contract parameter JSON.
 */
function createCreateSubRecordParameterSchemaJson(parameter) {
    var field13 = parameter.record_id;
    var field14 = parameter.parent_record_id;
    var field15 = parameter.trail;
    var field16 = parameter.trail_signature;
    var named12 = {
        record_id: field13,
        parent_record_id: field14,
        trail: field15,
        trail_signature: field16,
    };
    return named12;
}
/**
 * Construct Parameter type used in update transaction for 'createSubRecord' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createCreateSubRecordParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64CreateSubRecordParameterSchema, createCreateSubRecordParameterSchemaJson(parameter));
}
exports.createCreateSubRecordParameter = createCreateSubRecordParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'createSubRecord' entrypoint of the 'recheck' contract.
 * @param {CreateSubRecordParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createCreateSubRecordParameterWebWallet(parameter) {
    return {
        parameters: createCreateSubRecordParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64CreateSubRecordParameterSchema, 'base64')
        },
    };
}
exports.createCreateSubRecordParameterWebWallet = createCreateSubRecordParameterWebWallet;
/**
 * Send an update-contract transaction to the 'createSubRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CreateSubRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendCreateSubRecord(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('createSubRecord'), SDK.Parameter.toBuffer, transactionMetadata, createCreateSubRecordParameter(parameter), signer);
}
exports.sendCreateSubRecord = sendCreateSubRecord;
/**
 * Dry-run an update-contract transaction to the 'createSubRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CreateSubRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunCreateSubRecord(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('createSubRecord'), invokeMetadata, SDK.Parameter.toBuffer, createCreateSubRecordParameter(parameter), blockHash);
}
exports.dryRunCreateSubRecord = dryRunCreateSubRecord;
/**
 * Get and parse the error message from dry-running update transaction for 'createSubRecord' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCreateSubRecord | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageCreateSubRecord(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAKAAAAUGFyc2VFcnJvcgIMAAAAVW5hdXRob3JpemVkAg0AAABDb250cmFjdEVycm9yAgYAAABDdXN0b20BAQAAABYC');
    var match17;
    if ('ParseError' in schemaJson) {
        match17 = {
            type: 'ParseError',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match17 = {
            type: 'Unauthorized',
        };
    }
    else if ('ContractError' in schemaJson) {
        match17 = {
            type: 'ContractError',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant21 = schemaJson.Custom;
        match17 = {
            type: 'Custom',
            content: variant21[0],
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match17;
}
exports.parseErrorMessageCreateSubRecord = parseErrorMessageCreateSubRecord;
/** Base64 encoding of the parameter schema type for update transactions to 'createRecord' entrypoint of the 'recheck' contract. */
var base64CreateRecordParameterSchema = 'FAADAAAACQAAAHJlY29yZF9pZBYCBQAAAHRyYWlsFgIPAAAAdHJhaWxfc2lnbmF0dXJlFgI=';
/**
 * Construct schema JSON representation used in update transaction for 'createRecord' entrypoint of the 'recheck' contract.
 * @param {CreateRecordParameter} parameter The structured parameter to construct from.
 * @returns {CreateRecordParameterSchemaJson} The smart contract parameter JSON.
 */
function createCreateRecordParameterSchemaJson(parameter) {
    var field23 = parameter.record_id;
    var field24 = parameter.trail;
    var field25 = parameter.trail_signature;
    var named22 = {
        record_id: field23,
        trail: field24,
        trail_signature: field25,
    };
    return named22;
}
/**
 * Construct Parameter type used in update transaction for 'createRecord' entrypoint of the 'recheck' contract.
 * @param {CreateRecordParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createCreateRecordParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64CreateRecordParameterSchema, createCreateRecordParameterSchemaJson(parameter));
}
exports.createCreateRecordParameter = createCreateRecordParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'createRecord' entrypoint of the 'recheck' contract.
 * @param {CreateRecordParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createCreateRecordParameterWebWallet(parameter) {
    return {
        parameters: createCreateRecordParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64CreateRecordParameterSchema, 'base64')
        },
    };
}
exports.createCreateRecordParameterWebWallet = createCreateRecordParameterWebWallet;
/**
 * Send an update-contract transaction to the 'createRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CreateRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendCreateRecord(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('createRecord'), SDK.Parameter.toBuffer, transactionMetadata, createCreateRecordParameter(parameter), signer);
}
exports.sendCreateRecord = sendCreateRecord;
/**
 * Dry-run an update-contract transaction to the 'createRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CreateRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunCreateRecord(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('createRecord'), invokeMetadata, SDK.Parameter.toBuffer, createCreateRecordParameter(parameter), blockHash);
}
exports.dryRunCreateRecord = dryRunCreateRecord;
/**
 * Get and parse the error message from dry-running update transaction for 'createRecord' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCreateRecord | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
function parseErrorMessageCreateRecord(invokeResult) {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQQAAAAKAAAAUGFyc2VFcnJvcgIMAAAAVW5hdXRob3JpemVkAg0AAABDb250cmFjdEVycm9yAgYAAABDdXN0b20BAQAAABYC');
    var match26;
    if ('ParseError' in schemaJson) {
        match26 = {
            type: 'ParseError',
        };
    }
    else if ('Unauthorized' in schemaJson) {
        match26 = {
            type: 'Unauthorized',
        };
    }
    else if ('ContractError' in schemaJson) {
        match26 = {
            type: 'ContractError',
        };
    }
    else if ('Custom' in schemaJson) {
        var variant30 = schemaJson.Custom;
        match26 = {
            type: 'Custom',
            content: variant30[0],
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    return match26;
}
exports.parseErrorMessageCreateRecord = parseErrorMessageCreateRecord;
/** Base64 encoding of the parameter schema type for update transactions to 'records' entrypoint of the 'recheck' contract. */
var base64RecordsParameterSchema = 'FgI=';
/**
 * Construct schema JSON representation used in update transaction for 'records' entrypoint of the 'recheck' contract.
 * @param {RecordsParameter} parameter The structured parameter to construct from.
 * @returns {RecordsParameterSchemaJson} The smart contract parameter JSON.
 */
function createRecordsParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'records' entrypoint of the 'recheck' contract.
 * @param {RecordsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createRecordsParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64RecordsParameterSchema, createRecordsParameterSchemaJson(parameter));
}
exports.createRecordsParameter = createRecordsParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'records' entrypoint of the 'recheck' contract.
 * @param {RecordsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createRecordsParameterWebWallet(parameter) {
    return {
        parameters: createRecordsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64RecordsParameterSchema, 'base64')
        },
    };
}
exports.createRecordsParameterWebWallet = createRecordsParameterWebWallet;
/**
 * Send an update-contract transaction to the 'records' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {RecordsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendRecords(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('records'), SDK.Parameter.toBuffer, transactionMetadata, createRecordsParameter(parameter), signer);
}
exports.sendRecords = sendRecords;
/**
 * Dry-run an update-contract transaction to the 'records' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {RecordsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunRecords(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('records'), invokeMetadata, SDK.Parameter.toBuffer, createRecordsParameter(parameter), blockHash);
}
exports.dryRunRecords = dryRunRecords;
/**
 * Get and parse the return value from dry-running update transaction for 'records' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueRecords | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueRecords(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAACQAAAHJlY29yZF9pZBMgAAAAAhAAAABwYXJlbnRfcmVjb3JkX2lkEyAAAAACBQAAAHRyYWlsEyAAAAACDwAAAHRyYWlsX3NpZ25hdHVyZRMgAAAAAgcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAAB0aW1lc3RhbXANEgAAAHN1Yl9yZWNvcmRzX2xlbmd0aAU=');
    var field31 = schemaJson.record_id;
    var field34 = schemaJson.parent_record_id;
    var field37 = schemaJson.trail;
    var field40 = schemaJson.trail_signature;
    var field43 = schemaJson.creator;
    var match44;
    if ('Account' in field43) {
        var variant45 = field43.Account;
        var accountAddress46 = SDK.AccountAddress.fromSchemaValue(variant45[0]);
        match44 = {
            type: 'Account',
            content: accountAddress46,
        };
    }
    else if ('Contract' in field43) {
        var variant47 = field43.Contract;
        var contractAddress48 = SDK.ContractAddress.fromSchemaValue(variant47[0]);
        match44 = {
            type: 'Contract',
            content: contractAddress48,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field49 = schemaJson.timestamp;
    var timestamp50 = SDK.Timestamp.fromSchemaValue(field49);
    var field51 = schemaJson.sub_records_length;
    var named52 = {
        record_id: field31,
        parent_record_id: field34,
        trail: field37,
        trail_signature: field40,
        creator: match44,
        timestamp: timestamp50,
        sub_records_length: field51,
    };
    return named52;
}
exports.parseReturnValueRecords = parseReturnValueRecords;
/** Base64 encoding of the parameter schema type for update transactions to 'subRecord' entrypoint of the 'recheck' contract. */
var base64SubRecordParameterSchema = 'FAACAAAADQAAAHN1Yl9yZWNvcmRfaWQWAgUAAABpbmRleAU=';
/**
 * Construct schema JSON representation used in update transaction for 'subRecord' entrypoint of the 'recheck' contract.
 * @param {SubRecordParameter} parameter The structured parameter to construct from.
 * @returns {SubRecordParameterSchemaJson} The smart contract parameter JSON.
 */
function createSubRecordParameterSchemaJson(parameter) {
    var field54 = parameter.sub_record_id;
    var field55 = parameter.index;
    var number56 = BigInt(field55);
    var named53 = {
        sub_record_id: field54,
        index: number56,
    };
    return named53;
}
/**
 * Construct Parameter type used in update transaction for 'subRecord' entrypoint of the 'recheck' contract.
 * @param {SubRecordParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createSubRecordParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64SubRecordParameterSchema, createSubRecordParameterSchemaJson(parameter));
}
exports.createSubRecordParameter = createSubRecordParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'subRecord' entrypoint of the 'recheck' contract.
 * @param {SubRecordParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createSubRecordParameterWebWallet(parameter) {
    return {
        parameters: createSubRecordParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64SubRecordParameterSchema, 'base64')
        },
    };
}
exports.createSubRecordParameterWebWallet = createSubRecordParameterWebWallet;
/**
 * Send an update-contract transaction to the 'subRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SubRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendSubRecord(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('subRecord'), SDK.Parameter.toBuffer, transactionMetadata, createSubRecordParameter(parameter), signer);
}
exports.sendSubRecord = sendSubRecord;
/**
 * Dry-run an update-contract transaction to the 'subRecord' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SubRecordParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunSubRecord(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('subRecord'), invokeMetadata, SDK.Parameter.toBuffer, createSubRecordParameter(parameter), blockHash);
}
exports.dryRunSubRecord = dryRunSubRecord;
/**
 * Get and parse the return value from dry-running update transaction for 'subRecord' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSubRecord | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueSubRecord(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAACQAAAHJlY29yZF9pZBMgAAAAAhAAAABwYXJlbnRfcmVjb3JkX2lkEyAAAAACBQAAAHRyYWlsEyAAAAACDwAAAHRyYWlsX3NpZ25hdHVyZRMgAAAAAgcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAAB0aW1lc3RhbXANEgAAAHN1Yl9yZWNvcmRzX2xlbmd0aAU=');
    var field57 = schemaJson.record_id;
    var field60 = schemaJson.parent_record_id;
    var field63 = schemaJson.trail;
    var field66 = schemaJson.trail_signature;
    var field69 = schemaJson.creator;
    var match70;
    if ('Account' in field69) {
        var variant71 = field69.Account;
        var accountAddress72 = SDK.AccountAddress.fromSchemaValue(variant71[0]);
        match70 = {
            type: 'Account',
            content: accountAddress72,
        };
    }
    else if ('Contract' in field69) {
        var variant73 = field69.Contract;
        var contractAddress74 = SDK.ContractAddress.fromSchemaValue(variant73[0]);
        match70 = {
            type: 'Contract',
            content: contractAddress74,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field75 = schemaJson.timestamp;
    var timestamp76 = SDK.Timestamp.fromSchemaValue(field75);
    var field77 = schemaJson.sub_records_length;
    var named78 = {
        record_id: field57,
        parent_record_id: field60,
        trail: field63,
        trail_signature: field66,
        creator: match70,
        timestamp: timestamp76,
        sub_records_length: field77,
    };
    return named78;
}
exports.parseReturnValueSubRecord = parseReturnValueSubRecord;
/** Base64 encoding of the parameter schema type for update transactions to 'verifyTrail' entrypoint of the 'recheck' contract. */
var base64VerifyTrailParameterSchema = 'FgI=';
/**
 * Construct schema JSON representation used in update transaction for 'verifyTrail' entrypoint of the 'recheck' contract.
 * @param {VerifyTrailParameter} parameter The structured parameter to construct from.
 * @returns {VerifyTrailParameterSchemaJson} The smart contract parameter JSON.
 */
function createVerifyTrailParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'verifyTrail' entrypoint of the 'recheck' contract.
 * @param {VerifyTrailParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createVerifyTrailParameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64VerifyTrailParameterSchema, createVerifyTrailParameterSchemaJson(parameter));
}
exports.createVerifyTrailParameter = createVerifyTrailParameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'verifyTrail' entrypoint of the 'recheck' contract.
 * @param {VerifyTrailParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createVerifyTrailParameterWebWallet(parameter) {
    return {
        parameters: createVerifyTrailParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64VerifyTrailParameterSchema, 'base64')
        },
    };
}
exports.createVerifyTrailParameterWebWallet = createVerifyTrailParameterWebWallet;
/**
 * Send an update-contract transaction to the 'verifyTrail' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {VerifyTrailParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendVerifyTrail(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('verifyTrail'), SDK.Parameter.toBuffer, transactionMetadata, createVerifyTrailParameter(parameter), signer);
}
exports.sendVerifyTrail = sendVerifyTrail;
/**
 * Dry-run an update-contract transaction to the 'verifyTrail' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {VerifyTrailParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunVerifyTrail(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('verifyTrail'), invokeMetadata, SDK.Parameter.toBuffer, createVerifyTrailParameter(parameter), blockHash);
}
exports.dryRunVerifyTrail = dryRunVerifyTrail;
/**
 * Get and parse the return value from dry-running update transaction for 'verifyTrail' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueVerifyTrail | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueVerifyTrail(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAACQAAAHJlY29yZF9pZBMgAAAAAhAAAABwYXJlbnRfcmVjb3JkX2lkEyAAAAACBQAAAHRyYWlsEyAAAAACDwAAAHRyYWlsX3NpZ25hdHVyZRMgAAAAAgcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAAB0aW1lc3RhbXANEgAAAHN1Yl9yZWNvcmRzX2xlbmd0aAU=');
    var field79 = schemaJson.record_id;
    var field82 = schemaJson.parent_record_id;
    var field85 = schemaJson.trail;
    var field88 = schemaJson.trail_signature;
    var field91 = schemaJson.creator;
    var match92;
    if ('Account' in field91) {
        var variant93 = field91.Account;
        var accountAddress94 = SDK.AccountAddress.fromSchemaValue(variant93[0]);
        match92 = {
            type: 'Account',
            content: accountAddress94,
        };
    }
    else if ('Contract' in field91) {
        var variant95 = field91.Contract;
        var contractAddress96 = SDK.ContractAddress.fromSchemaValue(variant95[0]);
        match92 = {
            type: 'Contract',
            content: contractAddress96,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field97 = schemaJson.timestamp;
    var timestamp98 = SDK.Timestamp.fromSchemaValue(field97);
    var field99 = schemaJson.sub_records_length;
    var named100 = {
        record_id: field79,
        parent_record_id: field82,
        trail: field85,
        trail_signature: field88,
        creator: match92,
        timestamp: timestamp98,
        sub_records_length: field99,
    };
    return named100;
}
exports.parseReturnValueVerifyTrail = parseReturnValueVerifyTrail;
/** Base64 encoding of the parameter schema type for update transactions to 'verifyExtra0' entrypoint of the 'recheck' contract. */
var base64VerifyExtra0ParameterSchema = 'FgI=';
/**
 * Construct schema JSON representation used in update transaction for 'verifyExtra0' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra0Parameter} parameter The structured parameter to construct from.
 * @returns {VerifyExtra0ParameterSchemaJson} The smart contract parameter JSON.
 */
function createVerifyExtra0ParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'verifyExtra0' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra0Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createVerifyExtra0Parameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64VerifyExtra0ParameterSchema, createVerifyExtra0ParameterSchemaJson(parameter));
}
exports.createVerifyExtra0Parameter = createVerifyExtra0Parameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'verifyExtra0' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra0Parameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createVerifyExtra0ParameterWebWallet(parameter) {
    return {
        parameters: createVerifyExtra0ParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64VerifyExtra0ParameterSchema, 'base64')
        },
    };
}
exports.createVerifyExtra0ParameterWebWallet = createVerifyExtra0ParameterWebWallet;
/**
 * Send an update-contract transaction to the 'verifyExtra0' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {VerifyExtra0Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendVerifyExtra0(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('verifyExtra0'), SDK.Parameter.toBuffer, transactionMetadata, createVerifyExtra0Parameter(parameter), signer);
}
exports.sendVerifyExtra0 = sendVerifyExtra0;
/**
 * Dry-run an update-contract transaction to the 'verifyExtra0' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {VerifyExtra0Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunVerifyExtra0(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('verifyExtra0'), invokeMetadata, SDK.Parameter.toBuffer, createVerifyExtra0Parameter(parameter), blockHash);
}
exports.dryRunVerifyExtra0 = dryRunVerifyExtra0;
/**
 * Get and parse the return value from dry-running update transaction for 'verifyExtra0' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueVerifyExtra0 | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueVerifyExtra0(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAACQAAAHJlY29yZF9pZBMgAAAAAhAAAABwYXJlbnRfcmVjb3JkX2lkEyAAAAACBQAAAHRyYWlsEyAAAAACDwAAAHRyYWlsX3NpZ25hdHVyZRMgAAAAAgcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAAB0aW1lc3RhbXANEgAAAHN1Yl9yZWNvcmRzX2xlbmd0aAU=');
    var field101 = schemaJson.record_id;
    var field104 = schemaJson.parent_record_id;
    var field107 = schemaJson.trail;
    var field110 = schemaJson.trail_signature;
    var field113 = schemaJson.creator;
    var match114;
    if ('Account' in field113) {
        var variant115 = field113.Account;
        var accountAddress116 = SDK.AccountAddress.fromSchemaValue(variant115[0]);
        match114 = {
            type: 'Account',
            content: accountAddress116,
        };
    }
    else if ('Contract' in field113) {
        var variant117 = field113.Contract;
        var contractAddress118 = SDK.ContractAddress.fromSchemaValue(variant117[0]);
        match114 = {
            type: 'Contract',
            content: contractAddress118,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field119 = schemaJson.timestamp;
    var timestamp120 = SDK.Timestamp.fromSchemaValue(field119);
    var field121 = schemaJson.sub_records_length;
    var named122 = {
        record_id: field101,
        parent_record_id: field104,
        trail: field107,
        trail_signature: field110,
        creator: match114,
        timestamp: timestamp120,
        sub_records_length: field121,
    };
    return named122;
}
exports.parseReturnValueVerifyExtra0 = parseReturnValueVerifyExtra0;
/** Base64 encoding of the parameter schema type for update transactions to 'verifyExtra1' entrypoint of the 'recheck' contract. */
var base64VerifyExtra1ParameterSchema = 'FgI=';
/**
 * Construct schema JSON representation used in update transaction for 'verifyExtra1' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra1Parameter} parameter The structured parameter to construct from.
 * @returns {VerifyExtra1ParameterSchemaJson} The smart contract parameter JSON.
 */
function createVerifyExtra1ParameterSchemaJson(parameter) {
    return parameter;
}
/**
 * Construct Parameter type used in update transaction for 'verifyExtra1' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra1Parameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
function createVerifyExtra1Parameter(parameter) {
    return SDK.Parameter.fromBase64SchemaType(base64VerifyExtra1ParameterSchema, createVerifyExtra1ParameterSchemaJson(parameter));
}
exports.createVerifyExtra1Parameter = createVerifyExtra1Parameter;
/**
 * Construct WebWallet parameter type used in update transaction for 'verifyExtra1' entrypoint of the 'recheck' contract.
 * @param {VerifyExtra1Parameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
function createVerifyExtra1ParameterWebWallet(parameter) {
    return {
        parameters: createVerifyExtra1ParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema',
            value: SDK.toBuffer(base64VerifyExtra1ParameterSchema, 'base64')
        },
    };
}
exports.createVerifyExtra1ParameterWebWallet = createVerifyExtra1ParameterWebWallet;
/**
 * Send an update-contract transaction to the 'verifyExtra1' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {VerifyExtra1Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
function sendVerifyExtra1(contractClient, transactionMetadata, parameter, signer) {
    return contractClient.genericContract.createAndSendUpdateTransaction(SDK.EntrypointName.fromStringUnchecked('verifyExtra1'), SDK.Parameter.toBuffer, transactionMetadata, createVerifyExtra1Parameter(parameter), signer);
}
exports.sendVerifyExtra1 = sendVerifyExtra1;
/**
 * Dry-run an update-contract transaction to the 'verifyExtra1' entrypoint of the 'recheck' contract.
 * @param {RecheckContract} contractClient The client for a 'recheck' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {VerifyExtra1Parameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
function dryRunVerifyExtra1(contractClient, parameter, invokeMetadata, blockHash) {
    if (invokeMetadata === void 0) { invokeMetadata = {}; }
    return contractClient.genericContract.dryRun.invokeMethod(SDK.EntrypointName.fromStringUnchecked('verifyExtra1'), invokeMetadata, SDK.Parameter.toBuffer, createVerifyExtra1Parameter(parameter), blockHash);
}
exports.dryRunVerifyExtra1 = dryRunVerifyExtra1;
/**
 * Get and parse the return value from dry-running update transaction for 'verifyExtra1' entrypoint of the 'recheck' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueVerifyExtra1 | undefined} The structured return value or undefined if result was not a success.
 */
function parseReturnValueVerifyExtra1(invokeResult) {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }
    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }
    var schemaJson = SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FAAHAAAACQAAAHJlY29yZF9pZBMgAAAAAhAAAABwYXJlbnRfcmVjb3JkX2lkEyAAAAACBQAAAHRyYWlsEyAAAAACDwAAAHRyYWlsX3NpZ25hdHVyZRMgAAAAAgcAAABjcmVhdG9yFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADAkAAAB0aW1lc3RhbXANEgAAAHN1Yl9yZWNvcmRzX2xlbmd0aAU=');
    var field123 = schemaJson.record_id;
    var field126 = schemaJson.parent_record_id;
    var field129 = schemaJson.trail;
    var field132 = schemaJson.trail_signature;
    var field135 = schemaJson.creator;
    var match136;
    if ('Account' in field135) {
        var variant137 = field135.Account;
        var accountAddress138 = SDK.AccountAddress.fromSchemaValue(variant137[0]);
        match136 = {
            type: 'Account',
            content: accountAddress138,
        };
    }
    else if ('Contract' in field135) {
        var variant139 = field135.Contract;
        var contractAddress140 = SDK.ContractAddress.fromSchemaValue(variant139[0]);
        match136 = {
            type: 'Contract',
            content: contractAddress140,
        };
    }
    else {
        throw new Error("Unexpected enum variant");
    }
    var field141 = schemaJson.timestamp;
    var timestamp142 = SDK.Timestamp.fromSchemaValue(field141);
    var field143 = schemaJson.sub_records_length;
    var named144 = {
        record_id: field123,
        parent_record_id: field126,
        trail: field129,
        trail_signature: field132,
        creator: match136,
        timestamp: timestamp142,
        sub_records_length: field143,
    };
    return named144;
}
exports.parseReturnValueVerifyExtra1 = parseReturnValueVerifyExtra1;
