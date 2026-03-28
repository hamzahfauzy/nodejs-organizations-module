CREATE TABLE organizations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    parent_id BIGINT UNSIGNED NULL,
    
    code VARCHAR(50) NULL,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NULL,
    
    level INT NULL,
    path VARCHAR(255) NULL,
    
    status ENUM('active','inactive','archived') DEFAULT 'active',
    
    start_date DATE NULL,
    end_date DATE NULL,
    
    metadata JSON NULL,
    
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    CONSTRAINT fk_org_parent 
        FOREIGN KEY (parent_id) REFERENCES organizations(id)
        ON DELETE SET NULL,
        
    INDEX idx_org_parent (parent_id),
    INDEX idx_org_type (type),
    INDEX idx_org_status (status),
    UNIQUE KEY uniq_org_code_parent (code, parent_id, deleted_at)
) ENGINE=InnoDB;

CREATE TABLE organization_positions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    parent_id BIGINT UNSIGNED NOT NULL,
    organization_id BIGINT UNSIGNED NOT NULL,
    
    name VARCHAR(100) NOT NULL,
    
    status ENUM('active','inactive') DEFAULT 'active',
    
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    CONSTRAINT fk_op_parent 
        FOREIGN KEY (parent_id) REFERENCES organization_positions(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_op_org 
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE,
        
    INDEX idx_op_parent (parent_id),
    INDEX idx_po_org (organization_id),
    INDEX idx_po_status (status)
) ENGINE=InnoDB;

CREATE TABLE organization_people (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    people_id BIGINT UNSIGNED NULL,
    position_id BIGINT UNSIGNED NOT NULL,
    organization_id BIGINT UNSIGNED NOT NULL,
    
    role VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    
    start_date DATE NULL,
    end_date DATE NULL,
    
    status ENUM('active','inactive') DEFAULT 'active',
    
    notes TEXT NULL,
    
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_po_people 
        FOREIGN KEY (people_id) REFERENCES people(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_po_position 
        FOREIGN KEY (position_id) REFERENCES organization_positions(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_po_org 
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE,
        
    INDEX idx_po_people (people_id),
    INDEX idx_po_org (organization_id),
    INDEX idx_po_position (position_id),
    INDEX idx_po_status (status),
    INDEX idx_po_period (start_date, end_date)
) ENGINE=InnoDB;