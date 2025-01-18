TRUNCATE TABLE "ApiRequests" CASCADE;
TRUNCATE TABLE "HealthChecks" CASCADE;
TRUNCATE TABLE "ForeignWorkers" CASCADE;
TRUNCATE TABLE "Employers" CASCADE;
TRUNCATE TABLE "Users" CASCADE;

-- Reset sequences
ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Employers_id_seq" RESTART WITH 1;


INSERT INTO "Users" (email, password, fullname, role)
VALUES 
('admin@hospital.com', 'password123', 'Admin User', 'STAFF'),
('doctor1@hospital.com', 'password123', 'Dr. Smith', 'DOCTOR'),
('staff1@hospital.com', 'password123', 'Staff One', 'STAFF');


INSERT INTO "Employers" (id,empname, wkaddress, btname)
VALUES 
(1,'Employer A', '123 Main St, City A', 'Construction'),
(2,'Employer B', '456 High St, City B', 'Retail'),
(3,'Employer C', '789 Elm St, City C', 'Manufacturing');


INSERT INTO "ForeignWorkers" (
    employer_id, alcode, altype, alprefix, alprefixen, alname_en, alsname_en, alprefix_th, alname_th, alsname_th,
    albdate, algender, alnation, alposid, blood_group, nickname, religion, phone_number, email, address, subdistrict,
    district, province, postal_code, remark, "isDelete", "createdBy", "createdOn"
)
VALUES 
(1, '2023000000001', 1, 1, 'MR.', 'John', 'Doe', 'นาย', 'จอห์น', 'โด', '1990-01-01', 1, 'M', 1, 'O', 'Johnny', 'Christianity', 
 '0812345678', 'john.doe@example.com', '789 Maple St', 'SubA', 'DistrictA', 'ProvinceA', '12345', 'Hardworking.', FALSE, 1, '2025-01-14'),
(1, '2023000000002', 2, 2, 'MISS', 'Jane', 'Smith', 'นางสาว', 'เจน', 'สมิธ', '1992-05-21', 2, 'L', 2, 'A', 'Janey', 'Buddhism', 
 '0823456789', 'jane.smith@example.com', '456 Oak St', 'SubB', 'DistrictB', 'ProvinceB', '23456', 'Meticulous.', FALSE, 1, '2025-01-14'),
(1, '2023000000003', 1, 3, 'MRS.', 'Emily', 'Clark', 'นาง', 'เอมิลี', 'คลาร์ก', '1988-09-13', 2, 'C', 3, 'B', 'Em', 'Islam', 
 '0834567890', 'emily.clark@example.com', '123 Pine St', 'SubC', 'DistrictC', 'ProvinceC', '34567', 'Team player.', FALSE, 1, '2025-01-14'),
(2, '2023000000004', 2, 1, 'MR.', 'Alex', 'Brown', 'นาย', 'อเล็กซ์', 'บราวน์', '1995-11-05', 1, 'V', 4, 'AB', 'Al', 'Hindu', 
 '0998765432', 'alex.brown@example.com', '987 Birch St', 'SubD', 'DistrictD', 'ProvinceD', '45678', 'Quick learner.', FALSE, 1, '2025-01-14');

INSERT INTO "HealthChecks" (
    alcode, alchkhos, alchkstatus, alchkdate, alchkprovid, licenseno, chkname, chkposition, alchkdesc, alchkdoc, 
    "isDelete", "createdBy", "createdOn"
)
VALUES
('2023000000001', 'Hospital A', 1, '2025-01-10', '01', 'LIC123', 'Dr. Smith', 'General Physician', 'Healthy', 'https://example.com/doc1.pdf', FALSE, 1, '2025-01-14'),
('2023000000002', 'Hospital B', 2, '2025-01-11', '02', 'LIC456', 'Dr. Brown', 'Surgeon', 'Requires follow-up.', 'https://example.com/doc2.pdf', FALSE, 1, '2025-01-14'),
('2023000000003', 'Hospital C', 3, '2025-01-12', '03', 'LIC789', 'Dr. White', 'Cardiologist', 'Failed health check.', 'https://example.com/doc3.pdf', FALSE, 1, '2025-01-14');

INSERT INTO "ApiRequests" (
	reqcode, "isDelete",  "createdBy", "createdOn"
)
VALUES
('TH12345678910', FALSE, 1, '2025-01-14')