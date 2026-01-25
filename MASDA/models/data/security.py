class ComplianceRequirement(BaseModel):
    name: str  # e.g. GDPR, HIPAA, PCI-DSS
    mandatory: bool = True


class EncryptionRequirements(BaseModel):
    encryption_at_rest: bool = True
    encryption_in_transit: bool = True
    customer_managed_keys_required: bool = False


class IdentityRequirements(BaseModel):
    least_privilege: bool = True
    workload_identity_required: bool = True
    human_access_restricted: bool = True


class NetworkSecurityRequirements(BaseModel):
    exposure: ExposureLevel = ExposureLevel.private
    private_networking_required: bool = True
    zero_trust_model: bool = True


class SecuritySchema(BaseModel):
    schema_version: str = "v1"

    data_sensitivity: DataSensitivity
    compliance_requirements: List[ComplianceRequirement]

    encryption: EncryptionRequirements
    identity: IdentityRequirements
    network: NetworkSecurityRequirements

    audit_logging_required: bool = True
    security_explainability_required: bool = True
