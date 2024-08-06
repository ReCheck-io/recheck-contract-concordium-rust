use concordium_std::*;

/// ObjectRecord structure
#[derive(Serialize, SchemaType, Clone, PartialEq, Eq)]
pub struct ObjectRecord {
    pub record_id: ConcordiumHash,
    pub parent_record_id: ConcordiumHash,
    pub trail: ConcordiumHash,
    pub trail_signature: ConcordiumHash,
    pub creator: Address,
    pub timestamp: Timestamp,
    pub extra0: ConcordiumHash,
    pub extra1: ConcordiumHash,
}

/// RecheckRecords contract structure
#[derive(Serial, DeserialWithState)]
#[concordium(state_parameter = "S")]
pub struct RecheckRecords<S> {
    pub object_records: StateMap<ConcordiumHash, ObjectRecord, S>,
    pub object_sub_records: StateMap<ConcordiumHash, Vec<ConcordiumHash>, S>,
    pub trails: StateMap<ConcordiumHash, ConcordiumHash, S>,
    pub e0: StateMap<ConcordiumHash, ConcordiumHash, S>,
    pub e1: StateMap<ConcordiumHash, ConcordiumHash, S>,
}

#[derive(Serialize, SchemaType)]
pub struct CreateSubRecordWithExtras2Params {
    pub record_id: ConcordiumHash,
    pub parent_record_id: ConcordiumHash,
    pub trail: ConcordiumHash,
    pub trail_signature: ConcordiumHash,
    pub extra0: ConcordiumHash,
    pub extra1: ConcordiumHash,
}

#[derive(Serialize, SchemaType)]
pub struct CreateSubRecordParams {
    pub record_id: ConcordiumHash,
    pub parent_record_id: ConcordiumHash,
    pub trail: ConcordiumHash,
    pub trail_signature: ConcordiumHash,
}

#[derive(Serialize, SchemaType)]
pub struct CreateRecordParams {
    pub record_id: ConcordiumHash,
    pub trail: ConcordiumHash,
    pub trail_signature: ConcordiumHash,
}

#[derive(Serialize, SchemaType)]
pub struct SubRecordParams {
    pub sub_record_id: ConcordiumHash,
    pub index: u64,
}

#[derive(Serialize, SchemaType)]
pub struct RecordReturn {
    pub record_id: ConcordiumHash,
    pub parent_record_id: ConcordiumHash,
    pub trail: ConcordiumHash,
    pub trail_signature: ConcordiumHash,
    pub creator: Address,
    pub timestamp: Timestamp,
    pub sub_records_length: u64,
}

#[derive(Debug, PartialEq, Eq, Reject, Serial, SchemaType)]
pub enum ContractError {
    #[from(concordium_std::ParseError)]
    ParseError,
    #[from(concordium_std::fmt::Error)]
    ContractError,
    Custom(String),
}

impl core::fmt::Display for ContractError {
    fn fmt(&self, f: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        match self {
            ContractError::ParseError => write!(f, "Parse Error"),
            ContractError::ContractError => write!(f, "Contract Error"),
            ContractError::Custom(msg) => write!(f, "{}", msg),
        }
    }
}

pub type ConcordiumHash = [u8; 32];
