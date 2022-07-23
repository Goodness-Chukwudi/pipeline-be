
class AppConstants {
    
}

export const RISK_LEVELS = Object.freeze({
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    SEVER: 'severe',
    MAX: 'max'
});

export const CHARGE_TYPE = Object.freeze({
    PERCENTAGE: 'percentage',
    FIXED: 'fixed'
});


export const USER_STATUS = {
    PENDING: 'pending',
    ACTIVE: 'active',
    SELF_DEACTIVATED: 'self_deactivated',
    DELETED: 'deleted',
    SUSPENDED: 'suspended',
    DEACTIVATED: 'deactivated',
    HIDDEN: 'hidden'
}

export const ITEM_STATUS = {
    OPEN: 'open',
    CREATED: 'created',
    PENDING: 'pending',
    IN_REVIEW: 'in review',
    ACTIVE: 'active',
    DEACTIVATED: 'deactivated',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
    SUSPENDED: 'suspended',
    HIDDEN: 'hidden',
    CLOSED: 'closed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    USED: 'used',
    SkIPPED: 'skipped',
}

export const INVOICE_STATUS = Object.freeze({
    OPEN: "open",
    PENDING: "pending",
    PARTIAL_SETTLEMENT: "partial-settlement",
    VALIDATED: "validated",
    PROCESSED: "processed",
    APPROVED: "approved",
    DELETED: "deleted",
    IN_PAYING: "in-payment",
    IN_REVIEW: "in-review",
    ROLLED_BACK: "rolled-back",
    PROCESSED_OFFLINE:"processed-offline",
    PROCESSED_PARTIAL: "processed-partial",
    DUPLICATE:'duplicate',
    PAID:'paid'
});

export const MARITAL_STATUS = Object.freeze({
    SINGLE: "single",
    MARRIED: "married",
    DIVORCED: "divorced",
    SEPARATED: "separated",
    OTHER: "other",
    NOT_SAY: "I will rather not say"
});

export const GENDER = Object.freeze({
    MALE: "male",
    FEMALE: "female",
    NOT_SAY: "I will rather not say"
});

export const BIT = Object.freeze({
    ON: 1,
    OFF: 0
});

export const USER_PRIVILEGES = Object.freeze({
    USER: 0,
    EDITOR: 1,
    ADMIN: 2,
    SUPER_ADMIN: 3,
    MASTER: 4
});

export const DOCUMENT_STATUS = Object.freeze({
    CREATED: "created",
    VALIDATED: "validated",
    REJECTED: "rejected",
    APPROVED: "approved",
    DELETED: "deleted",
    ARCHIVED: "archived",
    IN_REVIEW: "in review"
});
export const COMPLIANCE_LEVEL = Object.freeze({
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4
});

export const NOTE_SCOPE = {
    TRANSACTION: 'transaction',
    ONBOARDING: 'onboarding',
    AML: 'aml',
    ACCOUNT_LIMIT: 'account_limit',
    USER_DOCUMENT: 'user_document'
}

export const NAIRA = "₦";
export const USER_LABEL = "user";
export const LOGIN_SESSION_LABEL = "login_session";

export default new AppConstants();
