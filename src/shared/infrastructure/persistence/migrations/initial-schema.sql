-- Table: accounts
CREATE TABLE accounts (
    id bigint NOT NULL,
    account_number varchar(20) NOT NULL,
    balance double(10,2) NOT NULL,
    currency varchar(3) NOT NULL,
    users_id bigint NOT NULL,
    CONSTRAINT accounts_pk PRIMARY KEY (id)
);

-- Table: appointments
CREATE TABLE appointments (
    id bigint NOT NULL,
    patient_id bigint NOT NULL,
    psychologist_id bigint NOT NULL,
    schedule_id bigint NOT NULL,
    CONSTRAINT appointments_pk PRIMARY KEY (id)
);

-- Table: departments
CREATE TABLE departments (
    id bigint NOT NULL,
    name varchar(50) NOT NULL,
    CONSTRAINT departments_pk PRIMARY KEY (id)
);

-- Table: districts
CREATE TABLE districts (
    id bigint NOT NULL,
    name varchar(50) NOT NULL,
    province_id bigint NOT NULL,
    CONSTRAINT districts_pk PRIMARY KEY (id)
);

-- Table: mental_illnesses
CREATE TABLE mental_illnesses (
    id bigint NOT NULL,
    name varchar(50) NOT NULL,
    type varchar(30) NOT NULL,
    CONSTRAINT mental_illnesses_pk PRIMARY KEY (id)
);

-- Table: patient_groups
CREATE TABLE patient_groups (
    id bigint NOT NULL,
    name varchar(50) NOT NULL,
    topic varchar(50) NOT NULL,
    CONSTRAINT patient_groups_pk PRIMARY KEY (id)
);

-- Table: patients
CREATE TABLE patients (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    mental_illnesses_id bigint NOT NULL,
    patient_group_id bigint NOT NULL,
    CONSTRAINT patients_pk PRIMARY KEY (id)
);

-- Table: provinces
CREATE TABLE provinces (
    id bigint NOT NULL,
    name varchar(50) NOT NULL,
    department_id bigint NOT NULL,
    CONSTRAINT provinces_pk PRIMARY KEY (id)
);

-- Table: psychologists
CREATE TABLE psychologists (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    certificate varchar(20) NOT NULL,
    specialization varchar(20) NOT NULL,
    CONSTRAINT psychologists_pk PRIMARY KEY (id)
);

-- Table: schedules
CREATE TABLE schedules (
    id bigint NOT NULL,
    date date NOT NULL,
    duration time NOT NULL,
    CONSTRAINT schedules_pk PRIMARY KEY (id)
);

-- Table: transactions
CREATE TABLE transactions (
    id bigint NOT NULL,
    amount double(10,2) NOT NULL,
    currency varchar(3) NOT NULL,
    status varchar(10) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    account_id bigint NOT NULL,
    CONSTRAINT transactions_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id bigint NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    phone_number varchar(9) NOT NULL,
    dni varchar(8) NOT NULL,
    email varchar(30) NOT NULL,
    districts_id bigint NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Reference: accounts_users (table: accounts)
ALTER TABLE accounts ADD CONSTRAINT accounts_users FOREIGN KEY accounts_users (users_id)
    REFERENCES users (id);

-- Reference: appointments_patients (table: appointments)
ALTER TABLE appointments ADD CONSTRAINT appointments_patients FOREIGN KEY appointments_patients (patient_id)
    REFERENCES patients (id);

-- Reference: appointments_psychologists (table: appointments)
ALTER TABLE appointments ADD CONSTRAINT appointments_psychologists FOREIGN KEY appointments_psychologists (psychologist_id)
    REFERENCES psychologists (id);

-- Reference: appointments_schedules (table: appointments)
ALTER TABLE appointments ADD CONSTRAINT appointments_schedules FOREIGN KEY appointments_schedules (schedule_id)
    REFERENCES schedules (id);

-- Reference: districts_provinces (table: districts)
ALTER TABLE districts ADD CONSTRAINT districts_provinces FOREIGN KEY districts_provinces (province_id)
    REFERENCES provinces (id);

-- Reference: patients_mental_illnesses (table: patients)
ALTER TABLE patients ADD CONSTRAINT patients_mental_illnesses FOREIGN KEY patients_mental_illnesses (mental_illnesses_id)
    REFERENCES mental_illnesses (id);

-- Reference: patients_patient_groups (table: patients)
ALTER TABLE patients ADD CONSTRAINT patients_patient_groups FOREIGN KEY patients_patient_groups (patient_group_id)
    REFERENCES patient_groups (id);

-- Reference: patients_users (table: patients)
ALTER TABLE patients ADD CONSTRAINT patients_users FOREIGN KEY patients_users (user_id)
    REFERENCES users (id);

-- Reference: provinces_departments (table: provinces)
ALTER TABLE provinces ADD CONSTRAINT provinces_departments FOREIGN KEY provinces_departments (department_id)
    REFERENCES departments (id);

-- Reference: psychologists_users (table: psychologists)
ALTER TABLE psychologists ADD CONSTRAINT psychologists_users FOREIGN KEY psychologists_users (user_id)
    REFERENCES users (id);

-- Reference: transactions_accounts (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT transactions_accounts FOREIGN KEY transactions_accounts (account_id)
    REFERENCES accounts (id);

-- Reference: users_districts (table: users)
ALTER TABLE users ADD CONSTRAINT users_districts FOREIGN KEY users_districts (districts_id)
    REFERENCES districts (id);
