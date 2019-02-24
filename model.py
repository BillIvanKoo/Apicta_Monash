import psycopg2
from config import config


def create_table():
    """ create tables in the PostgreSQL database"""
    command = """
        CREATE TABLE packets (
            id SERIAL PRIMARY KEY,
            total_tcp integer NOT NULL,
            total_http integer NOT NULL,
            total_udp integer NOT NULL,
            size_tcp integer NOT NULL,
            size_http integer NOT NULL,
            size_udp integer NOT NULL,
            segment_id integer NOT NULL,
            ports integer[] NOT NULL,
            sources text[] NOT NULL,
            destinations text[] NOT NULL,
            timestamp timestamptz NOT NULL
        )
        """
    conn = None
    try:
        # read the connection parameters
        params = config()
        # connect to the PostgreSQL server
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(command)
        # close communication with the PostgreSQL database server
        cur.close()
        # commit the changes
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == '__main__':
    create_table()