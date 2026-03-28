ALTER TABLE people ADD COLUMN organization_id BIGINT UNSIGNED NULL;
ALTER TABLE people ADD INDEX idx_people_organization_id (organization_id);
ALTER TABLE people ADD CONSTRAINT fk_people_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL;