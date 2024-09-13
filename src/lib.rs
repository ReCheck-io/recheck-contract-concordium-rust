#![cfg_attr(not(feature = "std"), no_std)]

use types::*;
pub mod types;
use concordium_std::*;
use hex;

#[init(contract = "recheck")]
fn init<S: HasStateApi>(
    ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<RecheckRecords<S>> {
    let owner = Address::Account(ctx.init_origin()); // Get the contract's owner (deployer)

    Ok(RecheckRecords {
        object_records: state_builder.new_map(),
        object_sub_records: state_builder.new_map(),
        trails: state_builder.new_map(),
        e0: state_builder.new_map(),
        e1: state_builder.new_map(),
        owner,
    })
}

// Access control check
fn ensure_owner<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    state: &RecheckRecords<S>,
) -> Result<(), ContractError> {
    if ctx.sender() != state.owner {
        return Err(ContractError::Custom("Unauthorized access attempt".into()));
    }

    Ok(())
}

fn ensure_unique_record<S: HasStateApi>(
    state: &RecheckRecords<S>,
    record_id: &ConcordiumHash,
) -> Result<(), ContractError> {
    if state.object_records.get(record_id).is_some() {
        return Err(ContractError::Custom("Record must be unique.".into()));
    } else {
        Ok(())
    }
}

fn add_record<S: HasStateApi>(
    host: &mut impl HasHost<RecheckRecords<S>>,
    record_id: &ConcordiumHash,
    parent_record_id: &ConcordiumHash,
    trail: &ConcordiumHash,
    trail_signature: &ConcordiumHash,
    creator: Address,
    extra0: &ConcordiumHash,
    extra1: &ConcordiumHash,
    timestamp: Timestamp,
) -> Result<(), ContractError> {
    let record = ObjectRecord {
        record_id: *record_id,
        parent_record_id: *parent_record_id,
        trail: *trail,
        trail_signature: *trail_signature,
        creator,
        timestamp,
        extra0: *extra0,
        extra1: *extra1,
    };

    let _ = host
        .state_mut()
        .object_records
        .insert(*record_id, record.clone());

    if record_id != parent_record_id {
        let mut sub_records = host
            .state_mut()
            .object_sub_records
            .entry(*parent_record_id)
            .or_insert_with(Vec::new);
        sub_records.push(*record_id);
    }

    let _ = host.state_mut().trails.insert(*trail, *record_id);
    let _ = host.state_mut().e0.insert(*extra0, *record_id);
    let _ = host.state_mut().e1.insert(*extra1, *record_id);

    Ok(())
}

#[receive(
    contract = "recheck",
    name = "createSubRecordWithExtras2",
    parameter = "CreateSubRecordWithExtras2Params",
    error = "ContractError",
    mutable
)]
fn create_sub_record_with_extras2<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> Result<(), ContractError> {
    ensure_owner(ctx, host.state())?; // Access control check

    let params: CreateSubRecordWithExtras2Params = ctx.parameter_cursor().get()?;

    let record_id = hex_to_array::<32>(&params.record_id)?;
    let parent_record_id = hex_to_array::<32>(&params.parent_record_id)?;
    let trail = hex_to_array::<32>(&params.trail)?;
    let trail_signature = hex_to_array::<32>(&params.trail_signature)?;
    let extra0 = hex_to_array::<32>(&params.extra0)?;
    let extra1 = hex_to_array::<32>(&params.extra1)?;

    ensure_unique_record(host.state(), &record_id)?;

    add_record(
        host,
        &record_id,
        &parent_record_id,
        &trail,
        &trail_signature,
        ctx.sender(),
        &extra0,
        &extra1,
        ctx.metadata().slot_time(),
    )?;

    Ok(())
}

#[receive(
    contract = "recheck",
    name = "createSubRecord",
    parameter = "CreateSubRecordParams",
    error = "ContractError",
    mutable
)]
fn create_sub_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> Result<(), ContractError> {
    ensure_owner(ctx, host.state())?; // Access control check

    let params: CreateSubRecordParams = ctx.parameter_cursor().get()?;

    let record_id = hex_to_array::<32>(&params.record_id)?;
    let parent_record_id = hex_to_array::<32>(&params.parent_record_id)?;
    let trail = hex_to_array::<32>(&params.trail)?;
    let trail_signature = hex_to_array::<32>(&params.trail_signature)?;

    ensure_unique_record(host.state(), &record_id)?;

    add_record(
        host,
        &record_id,
        &parent_record_id,
        &trail,
        &trail_signature,
        ctx.sender(),
        &trail,
        &trail,
        ctx.metadata().slot_time(),
    )?;

    Ok(())
}

#[receive(
    contract = "recheck",
    name = "createRecord",
    parameter = "CreateRecordParams",
    error = "ContractError",
    mutable
)]
fn create_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> Result<(), ContractError> {
    ensure_owner(ctx, host.state())?; // Access control check

    let params: CreateRecordParams = ctx.parameter_cursor().get()?;

    let record_id = hex_to_array::<32>(&params.record_id)?;
    let trail = hex_to_array::<32>(&params.trail)?;
    let trail_signature = hex_to_array::<32>(&params.trail_signature)?;

    ensure_unique_record(host.state(), &record_id)?;

    add_record(
        host,
        &record_id,
        &record_id,
        &trail,
        &trail_signature,
        ctx.sender(),
        &trail,
        &trail,
        ctx.metadata().slot_time(),
    )?;

    Ok(())
}

#[receive(
    contract = "recheck",
    name = "records",
    parameter = "String",
    return_value = "RecordReturn"
)]
fn records<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    // Parse the hex string into a 32-byte array.
    let hex_string: String = ctx.parameter_cursor().get()?;
    
    // Convert the hex string to a [u8; 32] array
    let record_id = hex_to_array::<32>(&hex_string)?;
    
    if let Some(record) = host.state().object_records.get(&record_id) {
        let sub_records_length = host
            .state()
            .object_sub_records
            .get(&record_id)
            .map_or(0, |v| v.len() as u64);
        Ok(RecordReturn {
            record_id: record.record_id,
            parent_record_id: record.parent_record_id,
            trail: record.trail,
            trail_signature: record.trail_signature,
            creator: record.creator,
            timestamp: record.timestamp,
            sub_records_length,
        })
    } else {
        Ok(RecordReturn {
            record_id: [0u8; 32],
            parent_record_id: [0u8; 32],
            trail: [0u8; 32],
            trail_signature: [0u8; 32],
            creator: Address::Account(AccountAddress([0u8; 32])),
            timestamp: Timestamp::from_timestamp_millis(0),
            sub_records_length: 0,
        })
    }
}

#[receive(
    contract = "recheck",
    name = "subRecord",
    parameter = "SubRecordParams",
    return_value = "RecordReturn"
)]
fn sub_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let params: SubRecordParams = ctx.parameter_cursor().get()?;
    let sub_record_id = hex_to_array::<32>(&params.sub_record_id)?;

    if let Some(sub_records) = host.state().object_sub_records.get(&sub_record_id) {
        if let Some(record_id) = sub_records.get(params.index as usize) {
            if let Some(record) = host.state().object_records.get(&record_id) {
                let sub_records_length = host
                    .state()
                    .object_sub_records
                    .get(&record_id)
                    .map_or(0, |v| v.len() as u64);
                return Ok(RecordReturn {
                    record_id: record.record_id,
                    parent_record_id: record.parent_record_id,
                    trail: record.trail,
                    trail_signature: record.trail_signature,
                    creator: record.creator,
                    timestamp: record.timestamp,
                    sub_records_length,
                });
            }
        }
    }
    Ok(RecordReturn {
        record_id: [0u8; 32],
        parent_record_id: [0u8; 32],
        trail: [0u8; 32],
        trail_signature: [0u8; 32],
        creator: Address::Account(AccountAddress([0u8; 32])),
        timestamp: Timestamp::from_timestamp_millis(0),
        sub_records_length: 0,
    })
}

#[receive(
    contract = "recheck",
    name = "verifyTrail",
    parameter = "String",
    return_value = "RecordReturn"
)]
fn verify_trail<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let trail_string: String = ctx.parameter_cursor().get()?;
    let trail = hex_to_array::<32>(&trail_string)?;

    if let Some(record_id) = host.state().trails.get(&trail) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host
                .state()
                .object_sub_records
                .get(&record_id)
                .map_or(0, |v| v.len() as u64);
            return Ok(RecordReturn {
                record_id: record.record_id,
                parent_record_id: record.parent_record_id,
                trail: record.trail,
                trail_signature: record.trail_signature,
                creator: record.creator,
                timestamp: record.timestamp,
                sub_records_length,
            });
        }
    }
    Ok(RecordReturn {
        record_id: [0u8; 32],
        parent_record_id: [0u8; 32],
        trail: [0u8; 32],
        trail_signature: [0u8; 32],
        creator: Address::Account(AccountAddress([0u8; 32])),
        timestamp: Timestamp::from_timestamp_millis(0),
        sub_records_length: 0,
    })
}

#[receive(
    contract = "recheck",
    name = "verifyExtra0",
    parameter = "String",
    return_value = "RecordReturn"
)]
fn verify_extra0<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let extra0_string: String = ctx.parameter_cursor().get()?;
    let extra0 = hex_to_array::<32>(&extra0_string)?;

    if let Some(record_id) = host.state().e0.get(&extra0) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host
                .state()
                .object_sub_records
                .get(&record_id)
                .map_or(0, |v| v.len() as u64);
            return Ok(RecordReturn {
                record_id: record.record_id,
                parent_record_id: record.parent_record_id,
                trail: record.trail,
                trail_signature: record.trail_signature,
                creator: record.creator,
                timestamp: record.timestamp,
                sub_records_length,
            });
        }
    }
    Ok(RecordReturn {
        record_id: [0u8; 32],
        parent_record_id: [0u8; 32],
        trail: [0u8; 32],
        trail_signature: [0u8; 32],
        creator: Address::Account(AccountAddress([0u8; 32])),
        timestamp: Timestamp::from_timestamp_millis(0),
        sub_records_length: 0,
    })
}

#[receive(
    contract = "recheck",
    name = "verifyExtra1",
    parameter = "String",
    return_value = "RecordReturn"
)]
fn verify_extra1<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let extra1_string: String = ctx.parameter_cursor().get()?;
    let extra1 = hex_to_array::<32>(&extra1_string)?;

    if let Some(record_id) = host.state().e1.get(&extra1) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host
                .state()
                .object_sub_records
                .get(&record_id)
                .map_or(0, |v| v.len() as u64);
            return Ok(RecordReturn {
                record_id: record.record_id,
                parent_record_id: record.parent_record_id,
                trail: record.trail,
                trail_signature: record.trail_signature,
                creator: record.creator,
                timestamp: record.timestamp,
                sub_records_length,
            });
        }
    }
    Ok(RecordReturn {
        record_id: [0u8; 32],
        parent_record_id: [0u8; 32],
        trail: [0u8; 32],
        trail_signature: [0u8; 32],
        creator: Address::Account(AccountAddress([0u8; 32])),
        timestamp: Timestamp::from_timestamp_millis(0),
        sub_records_length: 0,
    })
}


// Helper function to convert a hex string to a fixed-size byte array.
fn hex_to_array<const N: usize>(hex: &str) -> Result<[u8; N], ContractError> {
    // Try to decode the hex string, returning a custom error with the invalid string if decoding fails.
    let bytes = hex::decode(hex).map_err(|_| ContractError::Custom(format!("Invalid hex string provided: '{}'", hex)))?;

    // Check if the length of the decoded bytes matches the expected size.
    if bytes.len() != N {
        return Err(ContractError::Custom(format!("Invalid length, expected {} bytes, but got {}", N, bytes.len())));
    }

    // Create an array and copy the bytes into it.
    let mut array = [0u8; N];
    array.copy_from_slice(&bytes);

    Ok(array)
}