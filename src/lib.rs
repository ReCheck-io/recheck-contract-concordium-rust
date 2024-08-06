#![cfg_attr(not(feature = "std"), no_std)]

use types::*;
pub mod types;
use concordium_std::*;

#[init(contract = "recheck")]
fn init<S: HasStateApi>(
    _ctx: &impl HasInitContext,
    state_builder: &mut StateBuilder<S>,
) -> InitResult<RecheckRecords<S>> {
    Ok(RecheckRecords {
        object_records: state_builder.new_map(),
        object_sub_records: state_builder.new_map(),
        trails: state_builder.new_map(),
        e0: state_builder.new_map(),
        e1: state_builder.new_map(),
    })
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

    let _ = host.state_mut().object_records.insert(*record_id, record.clone());

    if record_id != parent_record_id {
        let mut sub_records = host.state_mut()
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

#[receive(contract = "recheck", name = "createSubRecordWithExtras2", parameter = "CreateSubRecordWithExtras2Params", mutable)]
fn create_sub_record_with_extras2<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<()> {
    let params: CreateSubRecordWithExtras2Params = ctx.parameter_cursor().get()?;
    ensure_unique_record(host.state(), &params.record_id)?;

    add_record(
        host,
        &params.record_id,
        &params.parent_record_id,
        &params.trail,
        &params.trail_signature,
        ctx.sender(),
        &params.extra0,
        &params.extra1,
        ctx.metadata().slot_time(),
    )?;
    
    Ok(())
}

#[receive(contract = "recheck", name = "createSubRecord", parameter = "CreateSubRecordParams", mutable)]
fn create_sub_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<()> {
    let params: CreateSubRecordParams = ctx.parameter_cursor().get()?;
    ensure_unique_record(host.state(), &params.record_id)?;

    add_record(
        host,
        &params.record_id,
        &params.parent_record_id,
        &params.trail,
        &params.trail_signature,
        ctx.sender(),
        &params.trail,
        &params.trail,
        ctx.metadata().slot_time(),
    )?;
    
    Ok(())
}

#[receive(contract = "recheck", name = "createRecord", parameter = "CreateRecordParams", mutable)]
fn create_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<()> {
    let params: CreateRecordParams = ctx.parameter_cursor().get()?;
    ensure_unique_record(host.state(), &params.record_id)?;

    add_record(
        host,
        &params.record_id,
        &params.record_id,
        &params.trail,
        &params.trail_signature,
        ctx.sender(),
        &params.trail,
        &params.trail,
        ctx.metadata().slot_time(),
    )?;
    
    Ok(())
}

#[receive(contract = "recheck", name = "records", parameter = "ConcordiumHash", return_value = "RecordReturn")]
fn records<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let record_id: ConcordiumHash = ctx.parameter_cursor().get()?;
    if let Some(record) = host.state().object_records.get(&record_id) {
        let sub_records_length = host.state().object_sub_records.get(&record_id).map_or(0, |v| v.len() as u64);
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

#[receive(contract = "recheck", name = "subRecord", parameter = "SubRecordParams", return_value = "RecordReturn")]
fn sub_record<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let params: SubRecordParams = ctx.parameter_cursor().get()?;
    if let Some(sub_records) = host.state().object_sub_records.get(&params.sub_record_id) {
        if let Some(record_id) = sub_records.get(params.index as usize) {
            if let Some(record) = host.state().object_records.get(&record_id) {
                let sub_records_length = host.state().object_sub_records.get(&record_id).map_or(0, |v| v.len() as u64);
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

#[receive(contract = "recheck", name = "verifyTrail", parameter = "ConcordiumHash", return_value = "RecordReturn")]
fn verify_trail<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let trail: ConcordiumHash = ctx.parameter_cursor().get()?;
    if let Some(record_id) = host.state().trails.get(&trail) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host.state().object_sub_records.get(&record_id).map_or(0, |v| v.len() as u64);
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

#[receive(contract = "recheck", name = "verifyExtra0", parameter = "ConcordiumHash", return_value = "RecordReturn")]
fn verify_extra0<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let extra0: ConcordiumHash = ctx.parameter_cursor().get()?;
    if let Some(record_id) = host.state().e0.get(&extra0) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host.state().object_sub_records.get(&record_id).map_or(0, |v| v.len() as u64);
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

#[receive(contract = "recheck", name = "verifyExtra1", parameter = "ConcordiumHash", return_value = "RecordReturn")]
fn verify_extra1<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &impl HasHost<RecheckRecords<S>>,
) -> ReceiveResult<RecordReturn> {
    let extra1: ConcordiumHash = ctx.parameter_cursor().get()?;
    if let Some(record_id) = host.state().e1.get(&extra1) {
        if let Some(record) = host.state().object_records.get(&record_id) {
            let sub_records_length = host.state().object_sub_records.get(&record_id).map_or(0, |v| v.len() as u64);
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
