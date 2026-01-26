from typing import List, Optional
from pydantic import BaseModel, Field

from MASDA.constants import DataSensitivity, ExposureLevel


class ComplianceRequirement(BaseModel):
    """Compliance framework requirement."""

    name: str = Field(..., description="Framework name (e.g., GDPR, HIPAA, PCI-DSS)")
    mandatory: bool = Field(True, description="Whether compliance is mandatory")


class EncryptionRequirements(BaseModel):
    """Encryption requirements for data protection."""

    encryption_at_rest: bool = Field(True, description="Require encryption at rest")
    encryption_in_transit: bool = Field(
        True, description="Require encryption in transit"
    )
    customer_managed_keys_required: bool = Field(
        False, description="Require customer-managed encryption keys"
    )


class IdentityRequirements(BaseModel):
    """Identity and access management requirements."""

    least_privilege: bool = Field(True, description="Enforce least privilege access")
    workload_identity_required: bool = Field(
        True, description="Require workload identity for service accounts"
    )
    human_access_restricted: bool = Field(
        True, description="Restrict human access to production"
    )


class NetworkSecurityRequirements(BaseModel):
    """Network security requirements."""

    exposure: ExposureLevel = Field(
        ExposureLevel.private, description="Network exposure level"
    )
    private_networking_required: bool = Field(
        True, description="Require private networking (VPC/VNet)"
    )
    zero_trust_model: bool = Field(True, description="Apply zero trust principles")


class SecuritySchema(BaseModel):
    """Security requirements schema for infrastructure planning."""

    schema_version: str = "v1"

    data_sensitivity: DataSensitivity = Field(
        ..., description="Sensitivity classification of data"
    )
    compliance_requirements: List[ComplianceRequirement] = Field(
        default_factory=list, description="Required compliance frameworks"
    )

    encryption: EncryptionRequirements = Field(default_factory=EncryptionRequirements)
    identity: IdentityRequirements = Field(default_factory=IdentityRequirements)
    network: NetworkSecurityRequirements = Field(
        default_factory=NetworkSecurityRequirements
    )

    audit_logging_required: bool = Field(
        True, description="Require comprehensive audit logging"
    )
    security_explainability_required: bool = Field(
        True, description="Require security decision explanations"
    )
