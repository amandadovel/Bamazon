DROP DATABASE IF EXISTS top_songsDB;
CREATE database top_songsDB;

USE top_songsDB;

CREATE TABLE top5000 (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

INSERT INTO top5000 (artist, song, year, raw_total, raw_usa, raw_uk, raw_eur, raw_row)
VALUES ("Bing Crosby", "White Christmas", 1942, 39.903, 23.929, 5.7, 2.185, 0.54);

INSERT INTO top5000 (artist, song, year, raw_total, raw_usa, raw_uk, raw_eur, raw_row)
VALUES ("Bill Haley & his Comets", "Rock Around the Clock", 1955, 36.503, 19.961, 7.458, 5.663, 0.76);

INSERT INTO top5000 (artist, song, year, raw_total, raw_usa, raw_uk, raw_eur, raw_row)
VALUES ("Celine Dion", "My Heart Will Go On", 1998, 35.405, 12.636, 8.944, 23.701, 3.61);

SELECT * FROM top5000;
