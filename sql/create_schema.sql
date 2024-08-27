

--table Books

create table public."Books" (
    id SERIAL Primary KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    foundation_date DATE
);