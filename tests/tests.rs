use concordium_smart_contract_testing::*;
use rand::Rng;
use recheck::types::*;

const ALICE: AccountAddress = AccountAddress([0u8; 32]);
const ALICE_ADDR: Address = Address::Account(ALICE);
const ACC_INITIAL_BALANCE: Amount = Amount::from_ccd(10_000);
const SIGNER: Signer = Signer::with_one_key();


fn initialize() -> (concordium_smart_contract_testing::Chain, ContractInitSuccess) {
    let mut chain = concordium_smart_contract_testing::Chain::new();
    chain.create_account(Account::new(ALICE, ACC_INITIAL_BALANCE));

    let module = module_load_v1("./concordium-out/module.wasm.v1").expect("Module exists at path");
    let deployment = chain.module_deploy_v1(SIGNER, ALICE, module).expect("Deploy valid module");
    
    let init = chain.contract_init(
        SIGNER,
        ALICE,
        Energy::from(10000),
        InitContractPayload {
            amount: Amount::zero(),
            mod_ref: deployment.module_reference,
            init_name: OwnedContractName::new_unchecked("init_recheck".to_string()),
            param: OwnedParameter::empty(),
        },
    ).expect("Init should succeed");

    (chain, init)
}

fn create_random_hash() -> ConcordiumHash {
    let mut rng = rand::thread_rng();
    let mut hash = [0u8; 32];
    for byte in &mut hash {
        *byte = rng.gen();
    }
    hash
}

#[test]
fn test_create_and_get_new_record() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();

    let create_record_params = CreateRecordParams {
        record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
    };

    chain.contract_update(
        SIGNER,
        ALICE,
        ALICE_ADDR,
        Energy::from(5000),
        UpdateContractPayload {
            address: init.contract_address,
            amount: Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
            message: OwnedParameter::from_serial(&create_record_params).expect("Serialize create record params."),
        },
    ).expect("Create record should succeed");

    let view_list = chain.contract_invoke(
        ALICE,
        ALICE_ADDR,
        Energy::from(5000),
        UpdateContractPayload {
            amount: Amount::zero(),
            address: init.contract_address,
            receive_name: OwnedReceiveName::new_unchecked("recheck.records".to_string()),
            message: OwnedParameter::from_serial(&random_record_id).expect("Serialize record ID."),
        },
    ).expect("Viewing record");

    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");

    assert_eq!(returned_record.record_id, random_record_id);
    assert_eq!(returned_record.parent_record_id, random_record_id);
    assert_eq!(returned_record.trail, random_trail);
    assert_eq!(returned_record.trail_signature, random_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_and_get_new_sub_record() {
    let (mut chain, init) = initialize();

    let random_parent_record_id = create_random_hash();
    let random_parent_trail = create_random_hash();
    let random_parent_trail_signature = create_random_hash();

    let create_record_params = CreateRecordParams {
        record_id: random_parent_record_id,
        trail: random_parent_trail,
        trail_signature: random_parent_trail_signature,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
                message:      OwnedParameter::from_serial(&create_record_params)
                    .expect("Serialize create record params."),
            },
        )
        .expect("Create record should succeed");

    let random_sub_record_id = create_random_hash();
    let random_sub_trail = create_random_hash();
    let random_sub_trail_signature = create_random_hash();

    let create_sub_record_params = CreateSubRecordParams {
        record_id: random_sub_record_id,
        parent_record_id: random_parent_record_id,
        trail: random_sub_trail,
        trail_signature: random_sub_trail_signature,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecord".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_params)
                    .expect("Serialize create sub record params."),
            },
        )
        .expect("Create sub record should succeed");

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.subRecord".to_string()),
                message:      OwnedParameter::from_serial(&SubRecordParams {
                    sub_record_id: random_parent_record_id,
                    index: 0,
                }).expect("Serialize sub record params."),
            },
        )
        .expect("Viewing sub record");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, random_sub_record_id);
    assert_eq!(returned_record.parent_record_id, random_parent_record_id);
    assert_eq!(returned_record.trail, random_sub_trail);
    assert_eq!(returned_record.trail_signature, random_sub_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    // Add appropriate timestamp comparison
    // assert_eq!(returned_record.timestamp, expected_timestamp);
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_and_get_new_record_with_extras_2() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();
    let random_extra_0 = create_random_hash();
    let random_extra_1 = create_random_hash();

    let create_sub_record_with_extras2_params = CreateSubRecordWithExtras2Params {
        record_id: random_record_id,
        parent_record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
        extra0: random_extra_0,
        extra1: random_extra_1,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecordWithExtras2".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_with_extras2_params)
                    .expect("Serialize create sub record with extras2 params."),
            },
        )
        .expect("Create sub record with extras2 should succeed");

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.records".to_string()),
                message:      OwnedParameter::from_serial(&random_record_id).expect("Serialize record ID."),
            },
        )
        .expect("Viewing record");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, random_record_id);
    assert_eq!(returned_record.parent_record_id, random_record_id);
    assert_eq!(returned_record.trail, random_trail);
    assert_eq!(returned_record.trail_signature, random_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    // Add appropriate timestamp comparison
    // assert_eq!(returned_record.timestamp, expected_timestamp);
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_and_verify_trail() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();

    let create_record_params = CreateRecordParams {
        record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
                message:      OwnedParameter::from_serial(&create_record_params)
                    .expect("Serialize create record params."),
            },
        )
        .expect("Create record should succeed");

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyTrail".to_string()),
                message:      OwnedParameter::from_serial(&random_trail).expect("Serialize trail."),
            },
        )
        .expect("Viewing trail");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, random_record_id);
    assert_eq!(returned_record.parent_record_id, random_record_id);
    assert_eq!(returned_record.trail, random_trail);
    assert_eq!(returned_record.trail_signature, random_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    // Add appropriate timestamp comparison
    // assert_eq!(returned_record.timestamp, expected_timestamp);
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_and_verify_extra_0() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();
    let random_extra_0 = create_random_hash();
    let random_extra_1 = create_random_hash();

    let create_sub_record_with_extras2_params = CreateSubRecordWithExtras2Params {
        record_id: random_record_id,
        parent_record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
        extra0: random_extra_0,
        extra1: random_extra_1,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecordWithExtras2".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_with_extras2_params)
                    .expect("Serialize create sub record with extras2 params."),
            },
        )
        .expect("Create sub record with extras2 should succeed");

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyExtra0".to_string()),
                message:      OwnedParameter::from_serial(&random_extra_0).expect("Serialize extra0."),
            },
        )
        .expect("Viewing extra0");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, random_record_id);
    assert_eq!(returned_record.parent_record_id, random_record_id);
    assert_eq!(returned_record.trail, random_trail);
    assert_eq!(returned_record.trail_signature, random_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    // Add appropriate timestamp comparison
    // assert_eq!(returned_record.timestamp, expected_timestamp);
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_and_verify_extra_1() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();
    let random_extra_0 = create_random_hash();
    let random_extra_1 = create_random_hash();

    let create_sub_record_with_extras2_params = CreateSubRecordWithExtras2Params {
        record_id: random_record_id,
        parent_record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
        extra0: random_extra_0,
        extra1: random_extra_1,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecordWithExtras2".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_with_extras2_params)
                    .expect("Serialize create sub record with extras2 params."),
            },
        )
        .expect("Create sub record with extras2 should succeed");

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyExtra1".to_string()),
                message:      OwnedParameter::from_serial(&random_extra_1).expect("Serialize extra1."),
            },
        )
        .expect("Viewing extra1");
    
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");

    assert_eq!(returned_record.record_id, random_record_id);
    assert_eq!(returned_record.parent_record_id, random_record_id);
    assert_eq!(returned_record.trail, random_trail);
    assert_eq!(returned_record.trail_signature, random_trail_signature);
    assert_eq!(returned_record.creator, Address::Account(ALICE));
    // Add appropriate timestamp comparison
    // assert_eq!(returned_record.timestamp, expected_timestamp);
    assert_eq!(returned_record.sub_records_length, 0);
}

#[test]
fn test_create_non_unique_record() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();

    let create_record_params = CreateRecordParams {
        record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
    };

    // First attempt to create a record should succeed
    let result = chain.contract_update(
        SIGNER,
        ALICE,
        ALICE_ADDR,
        Energy::from(5000),
        UpdateContractPayload {
            address:      init.contract_address,
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
            message:      OwnedParameter::from_serial(&create_record_params)
                .expect("Serialize create record params."),
        },
    );

    assert!(result.is_ok(), "First record creation should succeed");

    let random_trail_2 = create_random_hash();
    let random_trail_signature_2 = create_random_hash();

    let create_record_params_2 = CreateRecordParams {
        record_id: random_record_id,
        trail: random_trail_2,
        trail_signature: random_trail_signature_2,
    };

    // Second attempt to create a record with the same ID should fail
    let result_2 = chain.contract_update(
        SIGNER,
        ALICE,
        ALICE_ADDR,
        Energy::from(5000),
        UpdateContractPayload {
            address:      init.contract_address,
            amount:       Amount::zero(),
            receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
            message:      OwnedParameter::from_serial(&create_record_params_2)
                .expect("Serialize create record params."),
        },
    );

     // Check that the second creation failed with the correct error message
     if let Err(error) = result_2 {
        // println!("Error message: {:?}", error);

        // Extract and decode the return_value from the error
        if let Some(return_value) = error.return_value() {
            let error_message = String::from_utf8_lossy(&return_value);
            // println!("Decoded error message: {}", error_message);
            assert!(error_message.contains("Record must be unique."));
        } else {
            panic!("Expected an encoded error in the return_value.");
        }
    } else {
        panic!("Second record creation should fail");
    }
}

#[test]
fn test_get_non_existing_record() {
    let (chain, init) = initialize();

    let random_record_id = create_random_hash();

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.records".to_string()),
                message:      OwnedParameter::from_serial(&random_record_id).expect("Serialize record ID."),
            },
        )
        .expect("Viewing non-existing record");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, [0u8; 32]);
}

#[test]
fn test_verify_wrong_trail() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();

    let create_record_params = CreateRecordParams {
        record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createRecord".to_string()),
                message:      OwnedParameter::from_serial(&create_record_params)
                    .expect("Serialize create record params."),
            },
        )
        .expect("Create record should succeed");

    let random_wrong_trail = create_random_hash();

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyTrail".to_string()),
                message:      OwnedParameter::from_serial(&random_wrong_trail).expect("Serialize wrong trail."),
            },
        )
        .expect("Viewing wrong trail");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, [0u8; 32]);
}

#[test]
fn test_verify_wrong_extra_0() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();
    let random_extra_0 = create_random_hash();
    let random_extra_1 = create_random_hash();

    let create_sub_record_with_extras2_params = CreateSubRecordWithExtras2Params {
        record_id: random_record_id,
        parent_record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
        extra0: random_extra_0,
        extra1: random_extra_1,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecordWithExtras2".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_with_extras2_params)
                    .expect("Serialize create sub record with extras2 params."),
            },
        )
        .expect("Create sub record with extras2 should succeed");

    let random_wrong_extra_0 = create_random_hash();

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyExtra0".to_string()),
                message:      OwnedParameter::from_serial(&random_wrong_extra_0).expect("Serialize wrong extra0."),
            },
        )
        .expect("Viewing wrong extra0");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, [0u8; 32]);
}

#[test]
fn test_verify_wrong_extra_1() {
    let (mut chain, init) = initialize();

    let random_record_id = create_random_hash();
    let random_trail = create_random_hash();
    let random_trail_signature = create_random_hash();
    let random_extra_0 = create_random_hash();
    let random_extra_1 = create_random_hash();

    let create_sub_record_with_extras2_params = CreateSubRecordWithExtras2Params {
        record_id: random_record_id,
        parent_record_id: random_record_id,
        trail: random_trail,
        trail_signature: random_trail_signature,
        extra0: random_extra_0,
        extra1: random_extra_1,
    };

    chain
        .contract_update(
            SIGNER,
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                address:      init.contract_address,
                amount:       Amount::zero(),
                receive_name: OwnedReceiveName::new_unchecked("recheck.createSubRecordWithExtras2".to_string()),
                message:      OwnedParameter::from_serial(&create_sub_record_with_extras2_params)
                    .expect("Serialize create sub record with extras2 params."),
            },
        )
        .expect("Create sub record with extras2 should succeed");

    let random_wrong_extra_1 = create_random_hash();

    let view_list = chain
        .contract_invoke(
            ALICE,
            ALICE_ADDR,
            Energy::from(5000),
            UpdateContractPayload {
                amount:       Amount::zero(),
                address:      init.contract_address,
                receive_name: OwnedReceiveName::new_unchecked("recheck.verifyExtra1".to_string()),
                message:      OwnedParameter::from_serial(&random_wrong_extra_1).expect("Serialize wrong extra1."),
            },
        )
        .expect("Viewing wrong extra1");
    let returned_record: RecordReturn = view_list.parse_return_value().expect("Decoding return value");
    assert_eq!(returned_record.record_id, [0u8; 32]);
}